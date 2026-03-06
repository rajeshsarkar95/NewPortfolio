import React from 'react';

interface Stat {
  number: string;
  label: string;
}
interface FloatingTag {
  label: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: string;
}

const STATS: Stat[] = [
  { number: "2+", label: "Years Exp." },
  { number: "15+", label: "Projects" },
  { number: "15+", label: "Technologies" },
];

const FLOATING_TAGS: FloatingTag[] = [
  { label: " React.js", top: "12%", right: "-12%", delay: "-2s" },
  { label: " Node.js", bottom: "15%", left: "-12%", delay: "-1s" },
  { label: " MongoDB", top: "60%", right: "-16%", delay: "-3s" },
];

const CodeWindow = () => (
  <div className="relative w-full max-w-[420px] aspect-square rounded-[28px] bg-[var(--surface)] border border-[var(--border2)] backdrop-blur-xl overflow-hidden flex items-center justify-center shadow-2xl">
    <div className="absolute inset-[-1px] rounded-[28px] -z-10 bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-[var(--accent2)]/10" />
    <div className="p-7 w-full font-mono text-[13px] leading-[1.85] select-none">
      <div className="text-[var(--text3)] italic mb-2">{"// Rajesh Sarkar"}</div>
      <div className="text-[var(--text3)]">
        <span className="text-[#a78bfa]">const</span> <span className="text-[#38bdf8]">developer</span> = {"{"}
      </div>
      <div className="pl-4">
        <div className="text-[var(--text3)]">name: <span className="text-[#34d399]">Rajesh Sarkar</span>,</div>
        <div className="text-[var(--text3)]">role: <span className="text-[#34d399]">Full Stack Dev</span>,</div>
        <div className="text-[var(--text3)]">exp: <span className="text-[var(--orange)]">2</span><span className="text-[#4a4a65] italic">{"// years"}</span></div>
        <div className="text-[var(--text3)]">stack: [<span className="text-[#34d399]">&quot;React&quot;, &quot;Next.js&quot;, &quot;Node.js&quot;</span>],</div>
        <div className="text-[var(--text3)]">available: <span className="text-[#a78bfa]">true</span></div>
      </div>
      <div className="text-[var(--text3)]">{"};"}</div>
      <div className="text-[var(--text3)] mt-4">
        <span className="text-[#38bdf8]">console</span>.<span className="text-[#38bdf8]">log</span>(<span className="text-[#34d399]">&quot;Let&apos;s build!&quot;</span>);
      </div>
    </div>
  </div>
);

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-[72px] overflow-hidden z-10 bg-[var(--bg)]">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent)]/10 blur-[140px] rounded-full -z-10 animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="c-container w-full mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="z-20">
            <div className="reveal-item" style={{ "--delay": "0.1s" } as any}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border2)] bg-[var(--surface)]/50 text-[var(--text2)] text-sm mb-8 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--green)]"></span>
                </span>
                <span className="font-medium">Available for opportunities</span>
              </div>
            </div>
            <h1 className="reveal-item font-syne font-black leading-[1.05] tracking-tight mb-4 text-[clamp(42px,5.5vw,72px)]" style={{ "--delay": "0.2s" } as any}>
              Hi, I&apos;m <br />
              <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--accent3)] to-[var(--accent2)] bg-clip-text text-transparent italic">
                !!Rajesh
              </span>
            </h1>
            <p className="reveal-item font-mono text-[var(--accent2)] text-sm mb-6 tracking-widest flex items-center gap-2" style={{ "--delay": "0.3s" } as any}>
              <span className="text-[var(--text3)] opacity-50">&gt;</span> Full Stack Software Engineer — MERN Stack
            </p>
            <p className="reveal-item text-[var(--text2)] text-lg leading-relaxed max-w-xl mb-10 opacity-90" style={{ "--delay": "0.4s" } as any}>
              I craft scalable, high-performance web applications from Uttar Pradesh, India.
              <span className="text-[var(--text)] font-medium"> 2+ years </span> of turning complex problems into elegant solutions.
            </p>
            <div className="reveal-item flex flex-wrap gap-5" style={{ "--delay": "0.5s" } as any}>
              <button onClick={() => scrollTo("#projects")} className="c-btn-primary group overflow-hidden relative">
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>

              </button>

              <button
                onClick={() => window.open("/cv/RajeshSarkar.pdf")}
                className="c-btn-primary hover:bg-[var(--primary-dark)] transition-colors duration-300"
              >
                Download CV
              </button>

            </div>
            <div className="reveal-item flex gap-12 mt-16 pt-10 border-t border-[var(--border)]/50" style={{ "--delay": "0.6s" } as any}>
              {STATS.map((item, i) => (
                <div key={item.label} className="flex flex-col gap-1 group cursor-default">
                  <span className="font-syne text-3xl font-black bg-gradient-to-r from-[var(--text)] to-[var(--text3)] bg-clip-text text-transparent group-hover:from-[var(--accent)] transition-all duration-500">
                    {item.number}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[var(--text3)] tracking-widest opacity-70">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex items-center justify-center perspective-1000">
            <div className="animate-float-slow transition-transform duration-700 hover:rotate-x-2 hover:rotate-y-2">
              <CodeWindow />
            </div>
            {FLOATING_TAGS.map((tag) => (
              <span
                key={tag.label}
                className="absolute hidden lg:block px-4 py-2 rounded-xl bg-[var(--bg2)]/80 border border-[var(--border2)] font-mono text-xs text-[var(--text2)] backdrop-blur-xl shadow-2xl hover:scale-110 hover:text-[var(--accent)] transition-all duration-300 cursor-default"
                style={{
                  top: tag.top, bottom: tag.bottom, left: tag.left, right: tag.right,
                  animation: `floatTag 6s cubic-bezier(0.45, 0, 0.55, 1) infinite ${tag.delay}`,
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}