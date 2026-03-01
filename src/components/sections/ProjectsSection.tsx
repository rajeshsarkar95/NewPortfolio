import { projects } from '@/data/portfolio'
import type { Project } from '@/types'

function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  return (
    <article
      role="listitem"
      className={`relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg3)] transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] reveal reveal-d${(idx % 3) + 1}`}
    >
      {p.featured && (
        <div className="absolute top-3.5 right-3.5 z-10 px-3 py-1 rounded-full bg-[var(--accent)] text-white text-[11px] font-semibold">
          ⭐ Featured
        </div>
      )}
      <div className="h-48 relative overflow-hidden bg-[var(--bg)]" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
          style={{ background: p.gradient }}
        />
        <div className="w-full h-full flex items-center justify-center text-6xl font-syne font-black text-[var(--text3)] transition-transform duration-300 hover:scale-105">
          {p.emoji}
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-1.5 mb-3.5" role="list" aria-label="Technologies used">
          {p.tags.map((t) => (
            <span
              key={t}
              role="listitem"
              className="px-2.5 py-1 rounded-md bg-[var(--surface)] border border-[var(--border)] font-mono text-[11px] text-[var(--accent2)]"
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-syne text-lg font-bold leading-tight mb-2.5 text-[var(--text)]">
          {p.title}
        </h3>
        <p className="text-sm text-[var(--text2)] leading-relaxed mb-5">{p.desc}</p>
        <div className="flex gap-3">
          <a
            href={p.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo of ${p.title}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[9px] bg-[var(--accent)] text-white text-[13px] font-semibold transition-all hover:bg-[var(--accent2)] hover:shadow-accent"
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
            Live Demo
          </a>
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub repo of ${p.title}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[9px] bg-[var(--surface)] border border-[var(--border2)] text-[var(--text2)] text-[13px] font-semibold transition-all hover:bg-[var(--surface2)] hover:text-[var(--text)] hover:border-[var(--accent)]"
          >
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </article>
  )
}
export default function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="c-section bg-[var(--bg2)]">
      <div className="c-container">

        <div className="text-center mb-16 reveal">
          <span className="c-section-tag">03 — Projects</span>
          <h2 id="projects-heading" className="c-section-title">
            Featured <span className="c-gradient-text">Work</span>
          </h2>
          <p className="c-section-desc">
            A selection of projects showcasing full-stack capabilities and design thinking.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Portfolio projects"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} idx={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
