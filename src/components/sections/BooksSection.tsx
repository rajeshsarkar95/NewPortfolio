"use client";
import { useState } from "react";
import Image from "next/image";

type ReadingStatus = "completed" | "reading" | "queue";

interface Book {
    id: number;
    title: string;
    author: string;
    coverUrl: string;
    status: ReadingStatus;
}

const books: Book[] = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
        status: "completed",
    },
    {
        id: 2,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
        status: "reading",
    },
    {
        id: 3,
        title: "The Almanack Of Naval Ravikant",
        author: "Eric Jorgenson",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781544514215-L.jpg",
        status: "queue",
    },
    {
        id: 4,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki and Sharon Lechter",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
        status: "queue",
    },
    {
        id: 5,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
        status: "completed",
    },
    {
        id: 6,
        title: "Deep Work",
        author: "Cal Newport",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
        status: "queue",
    },
    {
        id: 7,
        title: "The Lean Startup",
        author: "Eric Ries",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780307887894-L.jpg",
        status: "queue",
    },
    {
        id: 8,
        title: "Zero to One",
        author: "Peter Thiel",
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780804139021-L.jpg",
        status: "queue",
    },
];

const statusConfig: Record<ReadingStatus, { label: string; bg: string; text: string }> = {
    completed: { label: "Completed", bg: "#22c55e", text: "#fff" },
    reading: { label: "Currently Reading", bg: "#7c3aed", text: "#fff" },
    queue: { label: "Up Next", bg: "#f59e0b", text: "#fff" },
};

function StatusBadge({ status }: { status: ReadingStatus }) {
    const cfg = statusConfig[status];
    return (
        <span
            className="absolute top-3 right-3 text-[11px] font-bold px-3 py-1 rounded-full z-10 shadow-lg"
            style={{ background: cfg.bg, color: cfg.text, fontFamily: "'Sora', sans-serif" }}
        >
            {cfg.label}
        </span>
    );
}

function BookCard({ book }: { book: Book }) {
    const [hovered, setHovered] = useState(false);
    const [imgError, setImgError] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex flex-col items-center gap-3 cursor-default group"
        >
            <div
                className="relative w-full rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                    aspectRatio: "2/3",
                    transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                    boxShadow: hovered
                        ? "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12)"
                        : "0 6px 24px rgba(0,0,0,0.4)",
                }}
            >
                {!imgError ? (
                    <Image
                        src={book.coverUrl}
                        alt={book.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center p-6 text-center"
                        style={{
                            background: "linear-gradient(160deg, #1e1e2e, #2a2a3e)",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        <span
                            className="text-white/70 text-[15px] font-bold leading-snug"
                            style={{ fontFamily: "'Sora', sans-serif" }}
                        >
                            {book.title}
                        </span>
                    </div>
                )}
                <StatusBadge status={book.status} />
                <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)",
                        opacity: hovered ? 1 : 0,
                    }}
                />
            </div>

            <div className="text-center w-full px-1">
                <p
                    className="text-white text-[14px] font-bold leading-snug mb-0.5"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                >
                    {book.title}
                </p>
                <p className="text-white/45 text-[12px] font-mono">{book.author}</p>
            </div>
        </div>
    );
}

export default function BooksComponent() {
    const [activeTab, setActiveTab] = useState<"all" | ReadingStatus>("all");

    const filtered = activeTab === "all" ? books : books.filter((b) => b.status === activeTab);

    const tabs: { key: "all" | ReadingStatus; label: string; emoji: string }[] = [
        { key: "all", label: "All Books", emoji: "" },
        { key: "reading", label: "Reading List", emoji: "" },
        { key: "completed", label: "Completed", emoji: "" },
        { key: "queue", label: "Up Next", emoji: "" },
    ];

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
      `}</style>

            <div
                className="min-h-screen relative overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #0d0d1a 0%, #13102a 50%, #0d0d1a 100%)",
                    fontFamily: "'Sora', sans-serif",
                }}
            >
                <div
                    className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-25 blur-[100px]"
                    style={{ background: "radial-gradient(ellipse, #7c3aed55, transparent 70%)" }}
                />

                <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-16">

                    <div className="text-center mb-10">
                        <p className="text-white/30 text-[11px] font-mono tracking-[4px] uppercase mb-3">
                            Library
                        </p>
                        <h1 className="text-white text-4xl font-bold mb-2">Books I ve Read</h1>
                        <p className="text-white/40 text-[15px]">
                            A collection of books that shaped my thinking.
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
                        {tabs.map((tab) => {
                            const active = activeTab === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200"
                                    style={{
                                        background: active
                                            ? "linear-gradient(135deg, #7c3aed, #6d28d9)"
                                            : "rgba(255,255,255,0.06)",
                                        color: active ? "#fff" : "rgba(255,255,255,0.5)",
                                        border: active ? "none" : "1px solid rgba(255,255,255,0.1)",
                                        boxShadow: active ? "0 4px 20px rgba(124,58,237,0.4)" : "none",
                                    }}
                                >
                                    <span>{tab.emoji}</span>
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
                        {filtered.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}