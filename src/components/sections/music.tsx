"use client";
import { useState, useEffect, useRef } from "react";

type Track = {
  id: string;
  title: string;
  genre: string;
  language: "Hindi" | "Punjabi" | "Bengali";
  videoId: string;
};

const TRACKS: Track[] = [
  { id: "1", title: "Dhokha", genre: "Sad Pop", language: "Hindi", videoId: "2JBYnvUlAEc" },
  { id: "2", title: "Dil Tod Ke (Lo-Fi)", genre: "Lo-Fi", language: "Hindi", videoId: "qA5DewVExi4" },
  { id: "3", title: "Tum Hi Aana", genre: "Romantic", language: "Hindi", videoId: "JYodEWUdIso" },
  { id: "4", title: "Ye Haal e Dil (Pehchaan OST)", genre: "OST", language: "Hindi", videoId: "XvYX_sS8GkQ" },
  { id: "5", title: "Rihaee", genre: "Melody", language: "Hindi", videoId: "Fts6wEXO5vI" },
  { id: "6", title: "Mera Yaar Miladay", genre: "Sufi", language: "Hindi", videoId: "Y1A3WLfmGP4" },
  { id: "7", title: "Channa Ve (Sufna)", genre: "Romantic", language: "Punjabi", videoId: "pQCGfuvxvSE" },
  { id: "8", title: "Jab Tu Saath Nahi Hota", genre: "Romantic", language: "Hindi", videoId: "ock6lBxL65I" },
  { id: "9", title: "Best Of Yasser Desai", genre: "Hits Mix", language: "Hindi", videoId: "rhbYgQJI8Yw" },
  { id: "10", title: "atif", genre: "Romantic", language: "Hindi", videoId: "B-J_PuEhyOM" },
  { id: "11", title: "Sunn Mere Dil", genre: "Romantic", language: "Punjabi", videoId: "AyLTRvvCjAo" },
  { id: "12", title: "Jaate Hue Lamhon", genre: "Romantic", language: "Hindi", videoId: "rFwmYM73pOI" },
  { id: "13", title: "Rabba Janda", genre: "Romantic", language: "Punjabi", videoId: "KfFbnOXWt4A" },

];

const LANGUAGE_CONFIG = {
  Hindi: { emoji: "🇮🇳", accent: "from-orange-500 to-rose-500", pill: "bg-orange-500/15 text-orange-300 border-orange-500/30", glow: "shadow-orange-500/20" },
  Punjabi: { emoji: "🌾", accent: "from-amber-400 to-orange-500", pill: "bg-amber-500/15 text-amber-300 border-amber-500/30", glow: "shadow-amber-500/20" },
  Bengali: { emoji: "🇧🇩", accent: "from-emerald-400 to-teal-500", pill: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", glow: "shadow-emerald-500/20" },
} as const;

const ALL_LANGUAGES = ["All", ...Object.keys(LANGUAGE_CONFIG)] as const;
type TabValue = (typeof ALL_LANGUAGES)[number];

function formatTime(seconds: number) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function SoundBars() {
  return (
    <div className="flex items-end gap-[3px] h-5">
      {[60, 100, 75, 45].map((h, i) => (
        <div
          key={i}
          className="w-[3px] bg-white rounded-full animate-pulse"
          style={{
            height: `${h}%`,
            animationDuration: `${0.6 + i * 0.15}s`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

function PlayerCard({
  id,
  title,
  genre,
  language,
  videoId,
  isActive,
  onPlay,
  onStop,
}: Track & { isActive: boolean; onPlay: () => void; onStop: () => void }) {
  const cfg = LANGUAGE_CONFIG[language];
  const playerRef = useRef<any>(null);
  const containerId = `yt-player-${id}`;

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Initialize YouTube Player API when active
  useEffect(() => {
    if (!isActive) {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      setCurrentTime(0);
      setDuration(0);
      return;
    }

    let interval: NodeJS.Timeout;

    const createPlayer = () => {
      // @ts-ignore
      playerRef.current = new window.YT.Player(containerId, {
        height: "0",
        width: "0",
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
            setDuration(event.target.getDuration());
          },
          onStateChange: (event: any) => {
            // State 1 = PLAYING
            if (event.data === 1) {
              interval = setInterval(() => {
                if (playerRef.current && playerRef.current.getCurrentTime) {
                  setCurrentTime(playerRef.current.getCurrentTime());
                  setDuration(playerRef.current.getDuration());
                }
              }, 500);
            } else {
              clearInterval(interval);
            }
          },
        },
      });
    };

    // Load API Script if not present
    // @ts-ignore
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      // @ts-ignore
      window.onYouTubeIframeAPIReady = () => createPlayer();
    } else {
      createPlayer();
    }

    return () => {
      clearInterval(interval);
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [isActive, videoId, containerId]);

  // Handle Seek click on progress bar
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = clickX / rect.width;
    const seekTime = newPercent * duration;

    playerRef.current.seekTo(seekTime, true);
    setCurrentTime(seekTime);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
        isActive
          ? `bg-slate-800/90 border-white/20 shadow-xl ${cfg.glow} scale-[1.01]`
          : "bg-slate-900/60 border-white/5 hover:border-white/10"
      }`}
    >
      {/* Target div for YouTube IFrame API */}
      <div id={containerId} className="hidden" />

      {/* Accent Strip */}
      <div className={`h-1 w-full bg-gradient-to-r ${cfg.accent}`} />

      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-gradient-to-br ${cfg.accent} flex items-center justify-center shadow-md`}
          >
            {isActive ? <SoundBars /> : <span className="text-xl sm:text-2xl">🎵</span>}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span className={`text-[10px] font-semibold uppercase tracking-wider border rounded-full px-2 py-0.5 ${cfg.pill}`}>
                {cfg.emoji} {language}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">{genre}</span>
            </div>
            <h3 className="text-white font-semibold text-sm leading-tight truncate">{title}</h3>
          </div>

          <div className="shrink-0">
            {isActive ? (
              <button
                onClick={onStop}
                className="text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 active:scale-95 px-3.5 py-2 rounded-full transition-all"
              >
                ⏹ Stop
              </button>
            ) : (
              <button
                onClick={onPlay}
                className={`text-xs font-semibold text-white bg-gradient-to-r ${cfg.accent} hover:opacity-90 active:scale-95 px-3.5 py-2 rounded-full transition-all shadow-md`}
              >
                ▶ Play
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar (Visible when Active) */}
        {isActive && (
          <div className="pt-1 flex flex-col gap-1">
            <div
              onClick={handleSeek}
              className="w-full h-2 bg-slate-700/60 rounded-full cursor-pointer relative overflow-hidden group"
            >
              <div
                className={`h-full bg-gradient-to-r ${cfg.accent} rounded-full transition-all duration-150`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MusicGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabValue>("All");

  const filtered = activeTab === "All" ? TRACKS : TRACKS.filter((t) => t.language === activeTab);
  const activeTrack = TRACKS.find((t) => t.id === activeId);

  const counts = ALL_LANGUAGES.reduce<Record<string, number>>((acc, lang) => {
    acc[lang] = lang === "All" ? TRACKS.length : TRACKS.filter((t) => t.language === lang).length;
    return acc;
  }, {});

  return (
    <main className="min-h-screen w-full bg-slate-950 flex flex-col justify-between text-slate-100">
      <div>
        <header className="px-4 pt-10 pb-6 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4 backdrop-blur-sm">
            <span className="text-xs">🎧</span>
            <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">Audio Player</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">Music Player</h1>
          <p className="text-slate-400 text-xs sm:text-sm min-h-[20px] transition-all">
            {activeId ? (
              <span className="text-slate-200 font-medium">
                Now Playing: {activeTrack?.title} · {activeTrack ? LANGUAGE_CONFIG[activeTrack.language].emoji : ""}{" "}
                {activeTrack?.language}
              </span>
            ) : (
              "Select a track to start listening"
            )}
          </p>
        </header>

        <div className="px-4 pb-4 max-w-4xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
            {ALL_LANGUAGES.map((lang) => {
              const isSelected = activeTab === lang;
              const cfg = lang !== "All" ? LANGUAGE_CONFIG[lang as Track["language"]] : null;
              return (
                <button
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  className={`shrink-0 snap-start flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    isSelected
                      ? cfg
                        ? `bg-gradient-to-r ${cfg.accent} text-white border-transparent shadow-md`
                        : "bg-white text-slate-900 border-transparent shadow-md"
                      : "bg-slate-900/80 text-slate-400 border-white/10 hover:border-white/20"
                  }`}
                >
                  {cfg ? `${cfg.emoji} ${lang}` : `🎶 ${lang}`}
                  <span
                    className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {counts[lang]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-4 pb-8 max-w-4xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
              {filtered.map((track) => (
                <PlayerCard
                  key={track.id}
                  {...track}
                  isActive={activeId === track.id}
                  onPlay={() => setActiveId(track.id)}
                  onStop={() => setActiveId(null)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500 text-sm gap-2">
              <span className="text-3xl">🎵</span>
              No tracks found in this category.
            </div>
          )}
        </div>
      </div>

      <footer className="text-center text-slate-600 text-[11px] py-6 border-t border-white/5">
        Streamed via YouTube IFrame API · Interactive Progress Bar Included
      </footer>
    </main>
  );
}