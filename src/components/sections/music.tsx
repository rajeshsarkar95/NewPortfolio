"use client";
import { useState } from "react";

type Track ={
  id: string;
  title: string;
  genre: string;
  language: "Hindi" | "Bengali";
  videoId: string;
};

type PlayerCardProps = Track & {
  isActive: boolean;
  onPlay: () => void;
  onStop: () => void;
};

const TRACKS: Track[] = [
  { id: "1", title: "YouTube Radio Mix", genre: "Radio", language: "Hindi",videoId:"QQEu7GTa6zk"},
  { id: "2", title: "Lo-Fi Chill", genre: "Lo-Fi", language: "Hindi",videoId:"3oOXPPRRbt0"},
  { id: "4", title: "Jazz Vibes", genre: "Jazz", language: "Hindi",videoId:"pvAsrsjtqi4"},
  { id: "5", title: "Galat Fehmi", genre: "Pop", language: "Hindi",videoId:"OzA5H9I95ng"},
  { id: "6", title: "Dard", genre: "Sad", language: "Hindi",videoId: "AyLTRvvCjAo"},
  { id: "7", title: "Your Title Here", genre: "Radio", language:"Hindi", videoId:"Pm5JZvGFpeQ"},
  { id: "8", title: "Your Title Here", genre: "Radio", language:"Bengali", videoId:"7NORZaLoc3Y"},
];

const LANGUAGE_CONFIG = {
  Hindi: {
    emoji: "🇮🇳",
    accent: "from-orange-500 to-rose-500",
    pill: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    glow: "shadow-orange-500/30",
    bar: "bg-orange-400",
  },
  Bengali:{
    emoji: "",
    accent: "from-emerald-400 to-teal-500",
    pill: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    glow: "shadow-emerald-500/30",
    bar: "bg-emerald-400",
  },
} as const;

const ALL_LANGUAGES = ["All",...Object.keys(LANGUAGE_CONFIG)] as const;

type TabValue = (typeof ALL_LANGUAGES)[number];

function SoundBars(){
  return (
    <div className="flex items-end gap-[3px] h-6">
      {[60,100,75,45].map((h, i)=>(
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
function PlayerCard({title,genre,language,videoId,isActive,onPlay,onStop}:PlayerCardProps){
  const cfg = LANGUAGE_CONFIG[language];
  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 overflow-hidden
        ${isActive
          ? `bg-slate-800 border-white/20 shadow-2xl ${cfg.glow} scale-[1.01]`
          : "bg-slate-900 border-white/5 active:scale-[0.98]"
        }`}
    >
      {isActive && (
        <iframe
          className="absolute opacity-0 pointer-events-none w-0 h-0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0`}
          title={title}
          allow="autoplay; encrypted-media"
        />
      )}
      <div className={`h-1 w-full bg-gradient-to-r ${cfg.accent}`} />
      <div className="p-4 flex items-center gap-4">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-gradient-to-br ${cfg.accent} flex items-center justify-center shadow-lg`}>
          {isActive ? <SoundBars /> : <span className="text-xl sm:text-2xl">🎵</span>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className={`text-[10px] font-semibold uppercase tracking-widest border rounded-full px-2 py-0.5 ${cfg.pill}`}>
              {cfg.emoji} {language}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-600">{genre}</span>
          </div>
          <h3 className="text-white font-semibold text-sm leading-tight truncate">{title}</h3>
        </div>
        <div className="shrink-0">
          {isActive ? (
            <button
              onClick={onStop}
              className="text-xs text-red-400 bg-red-500/10 active:bg-red-500/20 px-3 py-2 rounded-full transition touch-manipulation"
            >
              ⏹ Stop
            </button>
          ) : (
            <button
              onClick={onPlay}
              className={`text-xs text-white bg-gradient-to-r ${cfg.accent} px-3 py-2 rounded-full active:opacity-80 transition shadow touch-manipulation`}
            >
              ▶ Play
            </button>
          )}
        </div>
      </div>
      {isActive && (
        <div className={`absolute inset-0 bg-gradient-to-br ${cfg.accent} opacity-5 pointer-events-none`} />
      )}
    </div>
  );
}

export default function MusicGrid(){
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabValue>("All");
  const filtered = activeTab === "All" ? TRACKS : TRACKS.filter((t) => t.language === activeTab);
  const counts = ALL_LANGUAGES.reduce<Record<string, number>>((acc, lang) => {
    acc[lang] = lang === "All" ? TRACKS.length : TRACKS.filter((t) => t.language === lang).length;
    return acc;
  }, {});
  
  const activeTrack = TRACKS.find((t) => t.id === activeId);

  return (
    <main className="min-h-screen w-full bg-slate-950 flex flex-col overflow-hidden">
      <header className="px-4 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-3">
          <span className="text-xs">🎧</span>
          <span className="text-[11px] text-slate-400 tracking-wider uppercase">Audio Only</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1">🎵 Favourite Music</h1>
        <p className="text-slate-500 text-xs sm:text-sm min-h-[18px]">
          {activeId
            ? `▶ ${activeTrack?.title} · ${activeTrack ? LANGUAGE_CONFIG[activeTrack.language].emoji : ""} ${activeTrack?.language}`
            : "Tap a track to start listening"}
        </p>
      </header>
      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory">
          {ALL_LANGUAGES.map((lang)=>{
            const isSelected = activeTab === lang;
            const cfg = lang !== "All" ? LANGUAGE_CONFIG[lang as Track["language"]] : null;
            return (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                className={`shrink-0 snap-start flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 touch-manipulation
                  ${isSelected
                    ? cfg
                      ? `bg-gradient-to-r ${cfg.accent} text-white border-transparent shadow-lg`
                      : "bg-white text-slate-900 border-transparent shadow"
                    : "bg-slate-900 text-slate-400 border-white/10"
                  }`}
               >
                {cfg ? `${cfg.emoji} ${lang}` : `🎶 ${lang}`}
                <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold ${isSelected ? "bg-white/20 text-white" : "bg-slate-800 text-slate-500"}`}>
                  {counts[lang]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {activeTab !== "All" && (
        <div className="mx-4 mb-3 flex items-center gap-3">
          <div className={`h-px flex-1 bg-gradient-to-r ${LANGUAGE_CONFIG[activeTab as Track["language"]].accent} opacity-30`} />
          <span className="text-xs font-semibold text-slate-400">
            {LANGUAGE_CONFIG[activeTab as Track["language"]].emoji} {activeTab} Songs
          </span>
          <div className={`h-px flex-1 bg-gradient-to-l ${LANGUAGE_CONFIG[activeTab as Track["language"]].accent} opacity-30`} />
        </div>
      )}
      <div className="flex-1 px-4 pb-6">
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="flex flex-col items-center justify-center py-20 text-slate-600 text-sm gap-2">
            <span className="text-3xl">🎵</span>
            No tracks in this category yet.
          </div>
        )}
      </div>
      <p className="text-center text-slate-700 text-[11px] pb-6">
        Audio streams via YouTube · One track at a time
      </p>
    </main>
  );
}