export const educations = [
  {
    id: '1',
    institution: 'uttarakhand  university',
    degree: 'Bachelor of Computer Applications (BCA)',
    period: '2024 – 2027',
    description:
      'Focused on full-stack development, databases, and software engineering fundamentals, with a strong emphasis on building scalable, high-performance web applications. Passionate about clean architecture, optimized backend systems, responsive frontend interfaces, and writing maintainable, well-structured code. Continuously improving problem-solving skills, data structures & algorithms knowledge, and understanding of system design principles.',
  },
  {
    id: '2',
    institution: 'Ak inter college',
    degree: 'Intermediate (Science Stream)',
    period: '2023 – 2024',
    description:
      'Completed Science stream with a strong academic foundation in Physics, Chemistry, and Mathematics. Developed a deep interest in understanding scientific principles, numerical problem-solving, and analytical thinking. Consistently performed well in Mathematics and Physics, demonstrating logical reasoning and conceptual clarity. Actively engaged in practical experiments and academic assignments, strengthening both theoretical knowledge and application skills.',
  },
  {
    id: '2',
    institution: 'CGS Inter College',
    degree: 'High School (Science Stream)',
    period: '2021 – 2022',
    description:
      'Completed High School in Science stream with a strong academic foundation in Physics, Chemistry, and Mathematics. Developed solid analytical and problem-solving skills through consistent performance in Mathematics and Physics. Demonstrated logical reasoning, conceptual clarity, and a keen interest in scientific principles. Actively participated in laboratory experiments and academic activities, strengthening both theoretical understanding and practical application skills.'
  },
]

export default function EducationSection() {
  return (
    <section id="education" aria-labelledby="edu-heading" className="c-section">
      <div className="c-container">
        <div className="text-center mb-16 reveal">
          <h2 id="edu-heading" className="c-section-title">
            My <span className="c-gradient-text">Education</span>
          </h2>
          <p className="c-section-desc">
            My academic background and continuous learning journey.
          </p>
        </div>

        <div
          className="relative max-w-[800px] mx-auto c-timeline"
          role="list"
          aria-label="Education timeline"
        >
          {educations.map((e, i) => (
            <div
              key={e.id}
              role="listitem"
              className={`relative pl-[70px] mb-12 last:mb-0 reveal reveal-d${i + 1}`}
            >
              <div
                className="absolute left-3 top-2 w-[22px] h-[22px] rounded-full bg-[var(--accent)] border-[3px] border-[var(--bg)] flex items-center justify-center"
                style={{ boxShadow: '0 0 16px var(--glow)' }}
                aria-hidden="true"
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <div className="p-6 px-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] transition-all hover:border-[var(--accent)] hover:bg-[var(--surface2)]">
                <div className="flex flex-wrap justify-between items-start gap-3 mb-2">
                  <h3 className="font-syne text-lg font-bold text-[var(--text)]">
                    {e.institution}
                  </h3>
                  <span className="font-mono text-xs text-[var(--accent2)] px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                    {e.period}
                  </span>
                </div>
                <p className="text-sm text-[var(--accent)] font-medium mb-3">
                  {e.degree}
                </p>
                {e.description && (
                  <p className="text-sm text-[var(--text2)] leading-relaxed">
                    {e.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}