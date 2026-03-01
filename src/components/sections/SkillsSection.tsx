import { skills, chips } from '@/data/portfolio'

export default function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="c-section">
      <div className="c-container">
        <div className="text-center mb-16 reveal">
          <span className="c-section-tag">02 — Skills</span>
          <h2 id="skills-heading" className="c-section-title">
            Technical <span className="c-gradient-text">Expertise</span>
          </h2>
          <p className="c-section-desc">
            Core technologies I use to build production-ready applications.
          </p>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          role="list"
          aria-label="Core technical skills"
        >
          {skills.map((s, i) => (
            <div
              key={s.name}
              role="listitem"
              aria-label={`${s.name}: ${s.pct}%`}
              className={`c-card p-7 reveal ${i % 2 === 1 ? 'reveal-d1' : ''}`}
            >
              <div className="flex justify-between items-center mb-3.5">
                <span className="font-syne font-bold text-[15px] text-[var(--text)]">{s.name}</span>
                <span className="font-mono text-[13px] text-[var(--accent2)] font-medium">{s.pct}%</span>
              </div>
              <div
                className="h-[6px] rounded-full overflow-hidden"
                style={{ background: 'var(--border)' }}
                role="progressbar"
                aria-valuenow={s.pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="c-skill-bar-fill"
                  data-width={s.pct}
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="reveal">
          <p className="font-syne text-lg font-bold text-center mb-5 text-[var(--text)]">
            Also proficient in
          </p>
          <div
            className="flex flex-wrap gap-2.5 justify-center"
            role="list"
            aria-label="Additional skills"
          >
            {chips.map((c) => (
              <span
                key={c}
                role="listitem"
                className="px-[18px] py-2.5 rounded-full border border-[var(--border2)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text2)] cursor-default transition-all hover:border-[var(--accent)] hover:text-[var(--text)] hover:bg-[var(--surface2)] hover:-translate-y-0.5"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
