"use client";
import { useState } from "react";
import { Play, Square, Volume2, Disc } from "lucide-react";

type Track = {
    id: string;
    title: string;
    genre: string;
    videoId: string;
};

type PlayerCardProps = Track;

const TRACKS: Track[] = [
    {
        id: "1",
        title: "YouTube Radio Mix",
        genre: "Radio",
        videoId: "QQEu7GTa6zk",
    },
    {
        id: "2",
        title: "Lo-Fi Chill",
        genre: "Lo-Fi",
        videoId: "3oOXPPRRbt0",
    },
    {
        id: "3",
        title: "Relaxing Music",
        genre: "Ambient",
        videoId: "VG7dWSrA3Pg",
    },
    {
        id: "4",
        title: "Jazz Vibes",
        genre: "Jazz",
        videoId: "pvAsrsjtqi4",
    },
];

function PlayerCard({
    title,
    genre,
    videoId,
}: PlayerCardProps) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    return (
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                        <Disc size={18} />
                    </div>

                    <div>
                        <h3 className="text-xs text-blue-400 uppercase tracking-widest">
                            {genre}
                        </h3>
                        <p className="text-white font-semibold truncate w-32">
                            {title}
                        </p>
                    </div>
                </div>
                <Volume2 size={16} className="text-slate-600" />
            </div>
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
                {isPlaying ? (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=1`}
                        title={title}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-800 to-slate-900">
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-transform hover:scale-110"
                        >
                            <Play size={22} />
                        </button>
                    </div>
                )}
            </div>
            {isPlaying && (
                <button
                    onClick={() => setIsPlaying(false)}
                    className="mt-4 w-full flex items-center justify-center gap-2 text-red-400 hover:bg-red-500/10 py-2 rounded-lg transition"
                >
                    <Square size={14} /> Stop
                </button>
            )}
        </div>
    );
}
export default function MusicGrid() {
    return (
        <main className="min-h-screen bg-slate-950 p-8 flex flex-col items-center">
            <div className="max-w-6xl w-full">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        🎵 currently favorite music
                    </h1>
                    <p className="text-slate-400">
                        Select a song to start listening
                    </p>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TRACKS.map((track: Track) => (
                        <PlayerCard key={track.id} {...track} />
                    ))}
                </div>

            </div>
        </main>
    );
}