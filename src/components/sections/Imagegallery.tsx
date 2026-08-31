"use client";

import { useState, useMemo, useEffect, KeyboardEvent } from "react";
import Image from "next/image";

type Tag = "Travel" | "Life" | "Work" | "Music";
type FilterTag = "All" | Tag;

interface GalleryImage {
    id: number;
    src: string;
    tag: Tag;
    label: string;
    location: string;
    year: string;
}

interface TagStyle {
    text: string;
    bg: string;
    border: string;
    dot: string;
}

const IMAGES: GalleryImage[] = [
    { id: 1, src: "/myimages/cutety.jpeg", tag: "Life", label: "Mountain Escape", location: "Himalayas", year: "2024" },
    { id: 2, src: "/myimages/Khatima.jpeg", tag: "Life", label: "City Vibes", location: "Mumbai", year: "2024" },
    { id: 3, src: "/myimages/park.jpeg", tag: "Travel", label: "Deep Focus", location: "Home Studio", year: "2023" },
    { id: 4, src: "/myimages/pathologylab.jpeg", tag: "Travel", label: "Puranpur", location: "puranpur", year: "2024" },
    { id: 5, src: "/myimages/photokhatima.webp", tag: "Music", label: "restaurants", location: "Khatima", year: "2023" },
    { id: 6, src: "/myimages/zymwithanuj.jpeg", tag: "Life", label: "zym", location: "Favorite Cafe", year: "2024" },
    { id: 7, src: "/myimages/zym.jpeg", tag: "Work", label: "Zym", location: "Neoria", year: "2023" },
    {id:8,src:"/myimages/chandighar.jpeg",tag:"Work",label:"GitHub",location:"chandigarh",year:"2026"},
    {id:8,src:"/myimages/chandighard.jpeg",tag:"Work",label:"GitHub",location:"chandigarh",year:"2026"},
    

];

const TAGS: FilterTag[] = ["All", "Travel", "Life", "Work", "Music"];

const TAG_STYLE: Record<Tag, TagStyle> = {
    Travel: {
        text: "text-indigo-400", bg: "bg-indigo-500/20", border: "border-indigo-500/40", dot: "bg-indigo-400",
    },
    Life: {
        text: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/40", dot: "bg-blue-400",
    },
    Work: {
        text: "text-violet-400", bg: "bg-violet-500/20", border: "border-violet-500/40", dot: "bg-violet-400",
    },
    Music: {
        text: "text-cyan-400", bg: "bg-cyan-500/20", border: "border-cyan-500/40", dot: "bg-cyan-400",
    },
};

function PinIcon(): JSX.Element {
    return (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

function ZoomIcon(): JSX.Element {
    return (
        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
    );
}

interface FilterPillsProps {
    activeTag: FilterTag;
    onTagChange: (tag: FilterTag) => void;
    total: number;
    filtered: number;
}

function FilterPills({activeTag,onTagChange,total,filtered}:FilterPillsProps):JSX.Element {
    return (
        <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
                {TAGS.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => onTagChange(tag)}
                        className={`
              px-5 py-2 rounded-full text-sm font-semibold tracking-wide border
              transition-all duration-300 cursor-pointer
              ${activeTag === tag
                                ? "bg-gradient-to-r from-indigo-600 to-blue-600 border-transparent text-white shadow-[0_0_24px_rgba(99,102,241,.4)]"
                                : "bg-white/[.03] border-white/10 text-slate-400 hover:border-indigo-500/40 hover:text-indigo-300 hover:bg-indigo-500/[.08]"
                            }
            `}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <p className="font-mono text-xs text-slate-500 tracking-wider">
                Showing <span className="text-indigo-400 font-bold">{filtered}</span> / {total} photos
            </p>
        </div>
    );
}

interface GalleryCardProps {
    image: GalleryImage;
    index: number;
    onClick: (img: GalleryImage) => void;
}

function GalleryCard({image, index,onClick}:GalleryCardProps):JSX.Element {
    const c = TAG_STYLE[image.tag];

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void =>{
        if (e.key === "Enter" || e.key === " ") onClick(image);
    };
    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`Open ${image.label}`}
            onClick={() => onClick(image)}
            onKeyDown={handleKeyDown}
            className="group relative break-inside-avoid mb-4 rounded-2xl overflow-hidden cursor-pointer
        border border-white/[.06] transition-all duration-500
        hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,.7),0_0_0_1px_rgba(99,102,241,.3)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
        anim-up"
            style={{ animationDelay: `${180 + index * 55}ms` }}
        >
            <Image
                src={image.src}
                alt={image.label}
                width={600}
                height={800}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080b14]/95 via-[#080b14]/30 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className={`inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full
          text-[10px] font-mono font-bold tracking-widest uppercase border mb-2
          ${c.text} ${c.bg} ${c.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}/>
                    {image.tag}
                </span>
                <p className="text-white font-bold text-base leading-tight mb-1">{image.label}</p>
                <div className="flex items-center gap-3 text-slate-400 text-xs font-mono">
                    <span className="flex items-center gap-1"><PinIcon />{image.location}</span>
                    <span>{image.year}</span>
                </div>
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md
        flex items-center justify-center opacity-0 group-hover:opacity-100
        scale-75 group-hover:scale-100 transition-all duration-300">
                <ZoomIcon/>
            </div>
        </div>
    );
}
interface LightboxProps {
    image: GalleryImage;
    index: number;
    total: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

function Lightbox({ image, index, total, onClose, onPrev, onNext }: LightboxProps): JSX.Element {
    const c = TAG_STYLE[image.tag];

    useEffect(() => {
        const onKey = (e: globalThis.KeyboardEvent): void => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose, onNext, onPrev]);

    const navBtn = "w-11 h-11 rounded-full bg-white/8 border border-white/12 text-white text-2xl flex items-center justify-center hover:bg-indigo-500/30 hover:scale-110 transition-all duration-200 max-sm:hidden";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#04060c]/95 backdrop-blur-2xl anim-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo: ${image.label}`}
        >
            <div
                className="relative flex flex-col items-center max-w-[90vw] anim-scale"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close lightbox"
                    className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/15
            backdrop-blur-md text-white text-lg flex items-center justify-center
            hover:bg-red-500/30 transition-colors duration-200"
                >✕</button>
                <button onClick={onPrev} aria-label="Previous photo" className={`absolute left-[-68px] top-1/2 -translate-y-1/2 ${navBtn}`}>{"‹"}</button>

                <div className="rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,.9)]">
                    <Image
                        src={image.src}
                        alt={image.label}
                        width={900}
                        height={700}
                        className="max-w-[85vw] max-h-[75vh] w-auto h-auto object-contain"
                        unoptimized
                    />
                </div>

                <button onClick={onNext} aria-label="Next photo" className={`absolute right-[-68px] top-1/2 -translate-y-1/2 ${navBtn}`}>{"›"}</button>
                <div className="mt-5 flex flex-col items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full
            text-[10px] font-mono font-bold tracking-widest uppercase border
            ${c.text} ${c.bg} ${c.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                        {image.tag}
                    </span>
                    <h3 className="text-white font-bold text-xl">{image.label}</h3>
                    <div className="flex items-center gap-4 text-slate-500 text-xs font-mono">
                        <span className="flex items-center gap-1"><PinIcon />{image.location}</span>
                        <span>{image.year}</span>
                        <span>{index + 1} / {total}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ImageGallery(): JSX.Element {
    const [activeTag, setActiveTag] = useState<FilterTag>("All");
    const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    const filtered = useMemo<GalleryImage[]>(
        () => activeTag === "All" ? IMAGES : IMAGES.filter((i) => i.tag === activeTag),
        [activeTag]
    );

    const lbIdx = lightbox ? filtered.findIndex((i) => i.id === lightbox.id) : -1;

    const handlePrev = (): void =>
        setLightbox(filtered[(lbIdx - 1 + filtered.length) % filtered.length]);

    const handleNext = (): void =>
        setLightbox(filtered[(lbIdx + 1) % filtered.length]);

    return (
        <>
            <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn { from{opacity:0;transform:scale(.93)} to{opacity:1;transform:none} }
        .anim-up    { animation: fadeUp  .55s ease both }
        .anim-in    { animation: fadeIn  .2s  ease both }
        .anim-scale { animation: scaleIn .25s ease both }
      `}</style>

            <section className="relative min-h-screen bg-[#080b14] px-6 md:px-10 lg:px-16 py-16 overflow-hidden">
                <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="absolute -top-52 -left-52 w-[640px] h-[640px] rounded-full bg-indigo-600/10 blur-[130px]" />
                    <div className="absolute -bottom-52 -right-32 w-[520px] h-[520px] rounded-full bg-blue-600/8 blur-[110px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <header className={`mb-12 ${mounted ? "anim-up" : "opacity-0"}`}>
                        <p className="font-mono text-[11px] tracking-[.3em] uppercase text-indigo-400 mb-3">
               personal archive
                        </p>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
                            Moments &amp;{" "}
                            <em className="not-italic bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                memories
                            </em>
                        </h2>
                        <div className="w-20 h-px bg-gradient-to-r from-indigo-500 to-transparent my-6" />
                        <p className="text-slate-500 text-base max-w-md leading-relaxed">
                            A visual diary — travel, work, music and everything in between.
                        </p>
                    </header>
                    <div className={mounted ? "anim-up [animation-delay:120ms]" : "opacity-0"}>
                        <FilterPills
                            activeTag={activeTag}
                            onTagChange={setActiveTag}
                            total={IMAGES.length}
                            filtered={filtered.length}
                        />
                    </div>
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                        {filtered.map((img, i) => (
                            <GalleryCard
                                key={img.id}
                                image={img}
                                index={i}
                                onClick={setLightbox}
                            />
                        ))}
                        <div className="break-inside-avoid mb-4 rounded-2xl border border-dashed border-indigo-500/30
              bg-indigo-500/[.03] min-h-[200px] flex flex-col items-center justify-center gap-3
              cursor-pointer group transition-all duration-300
              hover:border-indigo-500/60 hover:bg-indigo-500/[.07] p-8 text-center">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/15 flex items-center justify-center
                group-hover:bg-indigo-500/25 transition-colors duration-300">
                                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-indigo-300 font-semibold text-sm">Add your photos</p>
                                <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                                    Update the <code className="text-slate-500">IMAGES</code> array<br />at the top of this file
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {lightbox !== null && (
                    <Lightbox
                        image={lightbox}
                        index={lbIdx}
                        total={filtered.length}
                        onClose={() => setLightbox(null)}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                )}
            </section>
        </>
    );
}