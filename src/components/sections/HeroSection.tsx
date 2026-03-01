function scrollTo(id: string) {
  document
    .querySelector(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const stats = [
  { number: "2+", label: "Years Exp." },
  { number: "15+", label: "Projects" },
  { number: "10+", label: "Technologies" },
];

const floatingTags = [
  {
    label: "⚛️ React.js",
    style: { top: "12%", right: "-12%", animationDelay: "-2s" },
  },
  {
    label: "🟢 Node.js",
    style: { bottom: "15%", left: "-12%", animationDelay: "-1s" },
  },
  {
    label: "🍃 MongoDB",
    style: { top: "60%", right: "-16%", animationDelay: "-3s" },
  },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center pt-[72px] overflow-hidden z-10"
    >
      <div className="c-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border2)] bg-[var(--surface)] text-[var(--text2)] text-sm mb-6 backdrop-blur-sm"
              style={{ animation: "fadeUp 0.7s ease both 0.1s" }}
            >
              <span
                className="w-2 h-2 rounded-full bg-[var(--green)]"
                style={{
                  boxShadow: "0 0 10px var(--green)",
                  animation: "pulseDot 2s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
              Available for opportunities
            </div>

            <h1
              id="hero-heading"
              className="font-syne font-black leading-[1.05] tracking-[-2px] mb-3"
              style={{
                fontSize: "clamp(42px, 5.5vw, 72px)",
                animation: "fadeUp 0.7s ease both 0.2s",
              }}
            >
              Hi, I&apos;m
              <br />
              <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--accent3)] to-[var(--accent2)] bg-clip-text text-transparent">
                Rajesh Sarkar
              </span>
            </h1>
            <p
              className="font-mono text-[var(--accent2)] text-sm mb-5 tracking-wide"
              style={{ animation: "fadeUp 0.7s ease both 0.35s" }}
            >
              <span className="text-[var(--text3)]">&gt;&nbsp;</span>
              Full Stack Developer — MERN Stack
            </p>
            <p
              className="text-[var(--text2)] text-lg leading-relaxed max-w-xl mb-9"
              style={{ animation: "fadeUp 0.7s ease both 0.45s" }}
            >
              I craft scalable, high-performance web applications from Uttar
              Pradesh, India. 2+ years of turning complex problems into elegant
              digital solutions.
            </p>
            <div
              className="flex flex-wrap gap-4"
              style={{ animation: "fadeUp 0.7s ease both 0.55s" }}
            >
              <button
                onClick={() => scrollTo("#projects")}
                className="c-btn-primary"
              >
                View My Work
                <svg
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="c-btn-secondary"
              >
                Get in Touch
                <svg
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
            <div
              className="flex gap-9 mt-11 pt-9 border-t border-[var(--border)]"
              role="list"
              aria-label="Key statistics"
              style={{ animation: "fadeUp 0.7s ease both 0.65s" }}
            >
              {stats.map((item) => (
                <div
                  key={item.label}
                  role="listitem"
                  className="flex flex-col gap-1"
                >
                  <span className="font-syne text-3xl font-black bg-gradient-to-r from-[var(--accent)] to-[var(--accent3)] bg-clip-text text-transparent">
                    {item.number}
                  </span>
                  <span className="text-xs text-[var(--text3)] tracking-wide">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="relative flex items-center justify-center"
            aria-hidden="true"
            style={{ animation: "fadeIn 1s ease both 0.4s" }}
          >
            <div className="relative w-full max-w-[420px] aspect-square rounded-[28px] bg-[var(--surface)] border border-[var(--border2)] backdrop-blur-xl overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-[-1px] rounded-[28px] -z-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(108,99,255,0.27), transparent 50%, rgba(56,189,248,0.2))",
                }}
              />
              <div className="p-7 w-full font-mono text-[13px] leading-[1.85]">
                <div className="text-[var(--text3)] italic">
                  {"// Rajesh Sarkar"}
                </div>
                <div className="text-[var(--text3)]">
                  <span className="text-[#a78bfa]">const</span>{" "}
                  <span className="text-[#38bdf8]">developer</span> = {"{"}
                </div>
                <div className="text-[var(--text3)]">
                  &nbsp;&nbsp;name:{" "}
                  <span className="text-[#34d399]">
                    &quot;Rajesh Sarkar&quot;
                  </span>
                  ,
                </div>
                <div className="text-[var(--text3)]">
                  &nbsp;&nbsp;role:{" "}
                  <span className="text-[#34d399]">
                    &quot;Full Stack Dev&quot;
                  </span>
                  ,
                </div>
                <div className="text-[var(--text3)]">
                  &nbsp;&nbsp;exp:{" "}
                  <span className="text-[var(--orange)]">2</span>,{" "}
                  <span className="text-[#4a4a65] italic">{"// years"}</span>
                </div>
                <div className="text-[var(--text3)]">
                  &nbsp;&nbsp;stack: [
                </div>
                <div className="text-[var(--text3)]">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-[#34d399]">&quot;React&quot;</span>,{" "}
                  <span className="text-[#34d399]">
                    &quot;Next.js&quot;
                  </span>
                  ,
                </div>
                <div className="text-[var(--text3)]">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-[#34d399]">&quot;Node.js&quot;</span>,{" "}
                  <span className="text-[#34d399]">
                    &quot;MongoDB&quot;
                  </span>
                </div>
                <div className="text-[var(--text3)]">&nbsp;&nbsp;],</div>
                <div className="text-[var(--text3)]">
                  &nbsp;&nbsp;available:{" "}
                  <span className="text-[#a78bfa]">true</span>
                </div>
                <div className="text-[var(--text3)]">{"};"}</div>
                <br />
                <div className="text-[var(--text3)]">
                  <span className="text-[#38bdf8]">console</span>.
                  <span className="text-[#38bdf8]">log</span>(
                  <span className="text-[#34d399]">
                    &quot;Let&apos;s build!&quot;
                  </span>
                  );
                </div>
              </div>
            </div>

            {floatingTags.map((tag) => (
              <span
                key={tag.label}
                className="absolute hidden lg:block px-4 py-2 rounded-[10px] bg-[var(--bg2)] border border-[var(--border2)] font-mono text-xs text-[var(--text2)] backdrop-blur-xl"
                style={{
                  ...tag.style,
                  boxShadow: "var(--shadow)",
                  animation: `floatTag 4s ease-in-out infinite ${tag.style.animationDelay}`,
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