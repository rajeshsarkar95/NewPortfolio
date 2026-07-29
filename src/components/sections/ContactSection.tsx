import { useState, useRef, FormEvent } from 'react'
import type { ContactForm } from '@/types'

function validate(data: ContactForm) {
  const errors: Partial<ContactForm> = {}
  if (!data.name.trim() || data.name.trim().length < 2) errors.name = 'Please enter your name (min 2 chars).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!data.subject.trim() || data.subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters.'
  if (!data.message.trim() || data.message.trim().length < 20) errors.message = 'Message must be at least 20 characters.'
  return errors
}
const LINKS = [
  { label: 'EMAIL', value: 'prorajeshsarakar@gmail.com', href: 'mailto:prorajeshsarakar@gmail.com', bg: 'rgba(108,99,255,0.15)', color: '#6c63ff', emoji: '📧' },
  { label: 'LINKEDIN', value: 'Linkedin', href: 'https://www.linkedin.com/in/rajesh-sarkar-9777b0302/', bg: 'rgba(56,189,248,0.15)', color: '#38bdf8', emoji: '💼' },
  { label: 'GITHUB', value: 'Github', href: 'https://github.com/rajeshsarkar95', bg: 'rgba(167,139,250,0.15)', color: '#a78bfa', emoji: '🐙' },
  { label: 'LOCATION', value: 'Uttar Pradesh, India', href: null, bg: 'rgba(52,211,153,0.15)', color: '#34d399', emoji: '📍' },
]
export default function ContactSection() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Partial<ContactForm>>({})
  const [submitting, setSubmit] = useState(false)
  const [success, setSuccess] = useState(false)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name as keyof ContactForm]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = async (e: FormEvent)=>{
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return}
    setSubmit(true)
    await new Promise((r) => setTimeout(r,1500))
    setSuccess(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setSubmit(false)
    setTimeout(() => setSuccess(false), 5000)
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="c-section">
      <div className="c-container">
        <div className="text-center mb-16 reveal">
          <span className="c-section-tag">06 — Contact</span>
          <h2 id="contact-heading" className="c-section-title">
            Let&apos;s <span className="c-gradient-text">Work Together</span>
          </h2>
          <p className="c-section-desc">Have a project in mind? I&apos;d love to hear about it.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-2 reveal">
            <h3 className="font-syne text-2xl font-black mb-4 text-[var(--text)]">Get in Touch</h3>
            <p className="text-[var(--text2)] text-[15px] leading-relaxed mb-8">
              Whether you have a job opportunity, a project idea, or just want to connect — my inbox
              is always open. I&apos;ll get back to you within 24 hours.
            </p>
            <div className="flex flex-col gap-3" role="list">
              {LINKS.map((l) => {
                const inner = (
                  <>
                    <div
                      className="w-[38px] h-[38px] rounded-[9px] flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: l.bg, color: l.color }}
                      aria-hidden="true"
                    >
                      {l.emoji}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[10px] text-[var(--text3)] tracking-[1px] uppercase">{l.label}</span>
                      <span className="text-sm font-medium">{l.value}</span>
                    </div>
                  </>
                )
                return l.href ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    role="listitem"
                    className="c-contact-link"
                    aria-label={`${l.label}: ${l.value}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={l.label} role="listitem" className="c-contact-link cursor-default">{inner}</div>
                )
              })}
            </div>
          </div>
          <div className="lg:col-span-3 reveal reveal-d2">
            <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[13px] font-medium text-[var(--text2)]">Full Name *</label>
                  <input
                    id="name" name="name" type="text" autoComplete="name"
                    placeholder="John Doe" value={form.name} onChange={handleChange}
                    className={`c-input ${errors.name ? 'c-input-error' : ''}`}
                    aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                  {errors.name && <span id="err-name" role="alert" className="text-[12px] text-red-400">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[13px] font-medium text-[var(--text2)]">Email *</label>
                  <input
                    id="email" name="email" type="email" autoComplete="email"
                    placeholder="john@example.com" value={form.email} onChange={handleChange}
                    className={`c-input ${errors.email ? 'c-input-error' : ''}`}
                    aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined}
                  />
                  {errors.email && <span id="err-email" role="alert" className="text-[12px] text-red-400">{errors.email}</span>}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-[13px] font-medium text-[var(--text2)]">Subject *</label>
                <input
                  id="subject" name="subject" type="text"
                  placeholder="Project opportunity..." value={form.subject} onChange={handleChange}
                  className={`c-input ${errors.subject ? 'c-input-error' : ''}`}
                  aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'err-subject' : undefined}
                />
                {errors.subject && <span id="err-subject" role="alert" className="text-[12px] text-red-400">{errors.subject}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[13px] font-medium text-[var(--text2)]">Message *</label>
                <textarea
                  id="message" name="message" rows={5}
                  placeholder="Tell me about your project..." value={form.message} onChange={handleChange}
                  className={`c-input resize-none ${errors.message ? 'c-input-error' : ''}`}
                  aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined}
                />
                {errors.message && <span id="err-message" role="alert" className="text-[12px] text-red-400">{errors.message}</span>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="c-btn-primary justify-center py-4 w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Send message"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
                    </svg>
                  </>
                )}
              </button>
              {success && (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium"
                  style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: 'var(--green)' }}
                >
                  ✅ Message sent! I&apos;ll get back to you within 24 hours.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
