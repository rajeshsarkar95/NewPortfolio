'use client'

/**
 * Certificates.tsx
 * ------------------------------------------------------------------
 * A single, self-contained "Certificates & Achievements" section for
 * a developer portfolio. Filterable, searchable, with a detail modal
 * and full add / edit / delete / feature flows — all backed by React
 * state, no backend required.
 *
 * Requires: framer-motion, lucide-react (npm install both)
 * Assumes Tailwind's dark mode is set to "class" — `dark:` utilities
 * below will just no-op harmlessly if you're using the "media"
 * strategy instead.
 *
 * Drop straight into a page:
 *   import Certificates from '@/components/Certificates'
 *   export default function Page() { return <Certificates /> }
 * ------------------------------------------------------------------
 */

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  BadgeCheck,
  Building2,
  Calendar,
  ChevronDown,
  Code2,
  Edit3,
  ExternalLink,
  FileBadge2,
  Frame,
  GraduationCap,
  Medal,
  Plus,
  Search,
  Sparkles,
  Star,
  Trash2,
  Trophy,
  X,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category =
  | 'Certificate'
  | 'Achievement'
  | 'Award'
  | 'Course'
  | 'Hackathon'
  | 'Competition'

interface CertificateItem {
  id: string
  title: string
  category: Category
  organization: string
  issueDate: string
  credentialId?: string
  credentialUrl?: string
  imageUrl: string
  description: string
  skills: string[]
  featured: boolean
}

interface CertificateFormState {
  title: string
  category: Category
  organization: string
  issueDate: string
  credentialId: string
  credentialUrl: string
  imageUrl: string
  description: string
  skills: string // comma-separated in the form; split into an array on submit
}

/* ------------------------------------------------------------------ */
/*  Sample data                                                        */
/* ------------------------------------------------------------------ */

const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: '1',
    title: 'React.js Developer Certificate',
    category: 'Certificate',
    organization: 'Example Organization',
    issueDate: '2026',
    credentialId: 'CERT-12345',
    credentialUrl: '#',
    imageUrl: '/certificates/react.jpg',
    description: 'Certificate demonstrating React.js development skills.',
    skills: ['React.js', 'JavaScript', 'Frontend'],
    featured: true,
  },
  {
    id: '2',
    title: 'AWS Certified Solutions Architect',
    category: 'Certificate',
    organization: 'Amazon Web Services',
    issueDate: '2025',
    credentialId: 'AWS-88213',
    credentialUrl: '#',
    imageUrl: '/certificates/aws.jpg',
    description:
      'Validated ability to design distributed systems on AWS that are scalable, secure, and cost-optimized.',
    skills: ['AWS', 'Cloud Architecture', 'System Design'],
    featured: true,
  },
  {
    id: '3',
    title: 'Winner — National Hackathon 2025',
    category: 'Hackathon',
    organization: 'HackIndia',
    issueDate: '2025',
    credentialId: 'HKI-2025-01',
    credentialUrl: '#',
    imageUrl: '/certificates/hackathon.jpg',
    description:
      'First place among 400+ teams for building an offline-first healthcare app in 36 hours.',
    skills: ['Next.js', 'Team Leadership', 'Rapid Prototyping'],
    featured: true,
  },
  {
    id: '4',
    title: 'Advanced TypeScript',
    category: 'Course',
    organization: 'Frontend Masters',
    issueDate: '2025',
    credentialId: 'FM-TS-2025',
    credentialUrl: '',
    imageUrl: '/certificates/typescript.jpg',
    description:
      'Deep dive into generics, conditional types, and building type-safe APIs at scale.',
    skills: ['TypeScript', 'Type Systems'],
    featured: false,
  },
  {
    id: '5',
    title: "Dean's List — Academic Excellence",
    category: 'Award',
    organization: 'University of Technology',
    issueDate: '2024',
    credentialId: '',
    credentialUrl: '',
    imageUrl: '/certificates/deans-list.jpg',
    description: 'Awarded to the top 5% of the graduating class for academic performance.',
    skills: ['Academics'],
    featured: false,
  },
  {
    id: '6',
    title: 'Runner-Up — Global UI Challenge',
    category: 'Competition',
    organization: 'Frontend League',
    issueDate: '2024',
    credentialId: 'FL-2024-RU',
    credentialUrl: '#',
    imageUrl: '/certificates/ui-challenge.jpg',
    description: 'Placed 2nd of 1,200 entries in a global interface design and build competition.',
    skills: ['UI Design', 'CSS', 'Accessibility'],
    featured: false,
  },
]

const CATEGORY_FILTERS: Array<{ value: Category | 'All'; label: string }> = [
  { value: 'All', label: 'All' },
  { value: 'Certificate', label: 'Certificates' },
  { value: 'Achievement', label: 'Achievements' },
  { value: 'Award', label: 'Awards' },
  { value: 'Course', label: 'Courses' },
  { value: 'Hackathon', label: 'Hackathons' },
  { value: 'Competition', label: 'Competitions' },
]

const CATEGORY_META: Record<
  Category,
  { icon: typeof Trophy; color: string; dot: string }
> = {
  Certificate: { icon: FileBadge2, color: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  Achievement: { icon: Sparkles, color: 'text-violet-600 dark:text-violet-400', dot: 'bg-violet-500' },
  Award: { icon: Trophy, color: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  Course: { icon: GraduationCap, color: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
  Hackathon: { icon: Code2, color: 'text-rose-600 dark:text-rose-400', dot: 'bg-rose-500' },
  Competition: { icon: Medal, color: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
}

const EMPTY_FORM: CertificateFormState = {
  title: '',
  category: 'Certificate',
  organization: '',
  issueDate: '',
  credentialId: '',
  credentialUrl: '',
  imageUrl: '',
  description: '',
  skills: '',
}

const genId = () => `cert-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

/* ------------------------------------------------------------------ */
/*  Shared field styles                                                */
/* ------------------------------------------------------------------ */

const inputClass =
  'w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] px-3.5 py-2.5 text-sm text-[#161B22] dark:text-[#F5F3EE] placeholder:text-slate-400 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-emerald-500/40'
const labelClass = 'mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300'
const primaryBtnClass =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-[#161B22] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-[#0B1220] dark:hover:bg-slate-100'
const secondaryBtnClass =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 dark:border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors hover:bg-black/5 dark:hover:bg-white/10'

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Certificates() {
  const [certificates, setCertificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
  const [viewing, setViewing] = useState<CertificateItem | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<CertificateFormState>(EMPTY_FORM)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({})

  const prefersReducedMotion = useReducedMotion()
  const titleInputRef = useRef<HTMLInputElement>(null)

  /* ---------- derived data ---------- */

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return certificates
      .filter((c) => activeCategory === 'All' || c.category === activeCategory)
      .filter(
        (c) => !q || c.title.toLowerCase().includes(q) || c.organization.toLowerCase().includes(q)
      )
      .sort((a, b) => Number(b.featured) - Number(a.featured))
  }, [certificates, activeCategory, query])

  const stats = useMemo(
    () => [
      { label: 'Credentials', value: certificates.length },
      { label: 'Featured', value: certificates.filter((c) => c.featured).length },
      { label: 'Categories', value: new Set(certificates.map((c) => c.category)).size },
    ],
    [certificates]
  )

  /* ---------- effects ---------- */

  // Lock page scroll while any modal is open
  useEffect(() => {
    const anyOpen = Boolean(viewing) || formOpen || Boolean(pendingDeleteId)
    document.body.style.overflow = anyOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [viewing, formOpen, pendingDeleteId])

  // Escape closes whichever modal is on top
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (pendingDeleteId) setPendingDeleteId(null)
      else if (formOpen) closeForm()
      else if (viewing) setViewing(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingDeleteId, formOpen, viewing])

  // Autofocus the first field when the add/edit form opens
  useEffect(() => {
    if (!formOpen) return
    const t = setTimeout(() => titleInputRef.current?.focus(), 50)
    return () => clearTimeout(t)
  }, [formOpen])

  /* ---------- handlers ---------- */

  function openAddForm() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setFormOpen(true)
  }

  function openEditForm(cert: CertificateItem) {
    setEditingId(cert.id)
    setForm({
      title: cert.title,
      category: cert.category,
      organization: cert.organization,
      issueDate: cert.issueDate,
      credentialId: cert.credentialId ?? '',
      credentialUrl: cert.credentialUrl ?? '',
      imageUrl: cert.imageUrl,
      description: cert.description,
      skills: cert.skills.join(', '),
    })
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  function handleFormChange<K extends keyof CertificateFormState>(
    key: K,
    value: CertificateFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.title.trim() || !form.organization.trim() || !form.issueDate.trim()) return

    const skillsArray = form.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    if (editingId) {
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? {
                ...c,
                title: form.title.trim(),
                category: form.category,
                organization: form.organization.trim(),
                issueDate: form.issueDate.trim(),
                credentialId: form.credentialId.trim(),
                credentialUrl: form.credentialUrl.trim(),
                imageUrl: form.imageUrl.trim() || c.imageUrl,
                description: form.description.trim(),
                skills: skillsArray,
              }
            : c
        )
      )
      setViewing((prev) =>
        prev && prev.id === editingId
          ? {
              ...prev,
              title: form.title.trim(),
              category: form.category,
              organization: form.organization.trim(),
              issueDate: form.issueDate.trim(),
              credentialId: form.credentialId.trim(),
              credentialUrl: form.credentialUrl.trim(),
              imageUrl: form.imageUrl.trim() || prev.imageUrl,
              description: form.description.trim(),
              skills: skillsArray,
            }
          : prev
      )
    } else {
      const newCert: CertificateItem = {
        id: genId(),
        title: form.title.trim(),
        category: form.category,
        organization: form.organization.trim(),
        issueDate: form.issueDate.trim(),
        credentialId: form.credentialId.trim(),
        credentialUrl: form.credentialUrl.trim(),
        imageUrl: form.imageUrl.trim(),
        description: form.description.trim(),
        skills: skillsArray,
        featured: false,
      }
      setCertificates((prev) => [newCert, ...prev])
    }

    closeForm()
  }

  function confirmDelete() {
    if (!pendingDeleteId) return
    setCertificates((prev) => prev.filter((c) => c.id !== pendingDeleteId))
    setViewing((prev) => (prev?.id === pendingDeleteId ? null : prev))
    setPendingDeleteId(null)
  }

  function toggleFeatured(id: string) {
    setCertificates((prev) => prev.map((c) => (c.id === id ? { ...c, featured: !c.featured } : c)))
    setViewing((prev) => (prev && prev.id === id ? { ...prev, featured: !prev.featured } : prev))
  }

  function handleImageError(id: string) {
    setBrokenImages((prev) => ({ ...prev, [id]: true }))
  }

  const deleteTarget = pendingDeleteId ? certificates.find((c) => c.id === pendingDeleteId) : null

  /* ---------- card renderer ---------- */

  const renderCard = (cert: CertificateItem) => {
    const meta = CATEGORY_META[cert.category]
    const CategoryIcon = meta.icon
    const hasImage = Boolean(cert.imageUrl) && !brokenImages[cert.id]

    return (
      <div className="group relative flex h-full flex-col rounded-2xl border border-black/5 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
        <div className="relative aspect-[4/3] w-full">
          <div className="absolute inset-0 overflow-hidden rounded-t-2xl">
            {hasImage ? (
              // eslint-disable-next-line @next/next/no-img-element -- image URLs are arbitrary/user-supplied, not known at build time
              <img
                src={cert.imageUrl}
                alt={cert.title}
                loading="lazy"
                onError={() => handleImageError(cert.id)}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1F2937] via-[#2A3652] to-[#3B4A6B]">
                <CategoryIcon className="h-10 w-10 text-white/25" />
              </div>
            )}
          </div>

          {/* Featured ribbon */}
          {cert.featured && (
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-24 w-24 overflow-hidden">
              <div className="absolute -left-10 top-5 w-36 -rotate-45 bg-gradient-to-r from-amber-500 to-yellow-400 py-1 text-center text-[10px] font-bold uppercase tracking-widest text-white shadow-md">
                Featured
              </div>
            </div>
          )}

          {/* Category chip */}
          <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur dark:bg-black/60">
            <CategoryIcon className={`h-3 w-3 ${meta.color}`} />
            <span className={meta.color}>{cert.category}</span>
          </div>

          {/* Hover actions */}
          <div className="absolute right-3 top-11 z-10 flex flex-col items-end gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => toggleFeatured(cert.id)}
              title={cert.featured ? 'Unmark featured' : 'Mark as featured'}
              className={`flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur transition-colors ${
                cert.featured
                  ? 'bg-amber-500 text-white'
                  : 'bg-white/90 text-slate-600 hover:bg-white dark:bg-black/60 dark:text-slate-200'
              }`}
            >
              <Star className="h-3.5 w-3.5" fill={cert.featured ? 'currentColor' : 'none'} />
            </button>
            <button
              type="button"
              onClick={() => openEditForm(cert)}
              title="Edit"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm backdrop-blur transition-colors hover:bg-white dark:bg-black/60 dark:text-slate-200"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setPendingDeleteId(cert.id)}
              title="Delete"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-rose-600 shadow-sm backdrop-blur transition-colors hover:bg-rose-500 hover:text-white dark:bg-black/60"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Verified stamp */}
          {cert.credentialUrl && (
            <div className="absolute -bottom-5 right-4 z-20 flex h-14 w-14 -rotate-[8deg] items-center justify-center rounded-full border-2 border-dashed border-emerald-500/70 bg-white/95 shadow-md backdrop-blur dark:bg-[#0F1A2B]/95">
              <div className="flex flex-col items-center leading-none">
                <BadgeCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="mt-0.5 text-[6px] font-bold tracking-wider text-emerald-700 dark:text-emerald-400">
                  VERIFIED
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 pt-7">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            <span className={meta.color}>{cert.category}</span>
          </div>

          <h3 className="font-serif text-lg font-semibold leading-snug text-[#161B22] line-clamp-2 dark:text-[#F5F3EE]">
            {cert.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              {cert.organization}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {cert.issueDate}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-300">
            {cert.description}
          </p>

          {cert.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-black/5 bg-black/[0.03] px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300"
                >
                  {skill}
                </span>
              ))}
              {cert.skills.length > 3 && (
                <span className="rounded-full px-2.5 py-1 text-[11px] font-medium text-slate-400">
                  +{cert.skills.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between gap-2 border-t border-black/5 pt-3 dark:border-white/10">
            <span className="truncate font-mono text-[11px] text-slate-400 dark:text-slate-500">
              {cert.credentialId ? `#${cert.credentialId}` : '—'}
            </span>
            <div className="flex shrink-0 items-center gap-2">
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-emerald-600/30 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-500/10 dark:text-emerald-400"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Verify
                </a>
              )}
              <button
                type="button"
                onClick={() => setViewing(cert)}
                className="inline-flex items-center gap-1 rounded-lg bg-[#161B22] px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-[#0B1220]"
              >
                View Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ---------- render ---------- */

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F0] px-4 py-16 transition-colors dark:bg-[#0B1220] sm:px-6 sm:py-20 lg:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-500/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-500/10"
      />

      <motion.div
        className="relative mx-auto max-w-7xl"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-14 lg:flex-row lg:items-end">
          <div className="flex max-w-2xl flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
              <BadgeCheck className="h-3.5 w-3.5" /> Verified Credentials
            </span>
            <h2 className="font-serif text-4xl font-semibold tracking-tight text-[#161B22] dark:text-[#F5F3EE] sm:text-5xl">
              Certificates &amp; Achievements
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              A record of the certifications, competitions, and milestones behind the work —
              each one verifiable, each one earned.
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono text-2xl font-bold text-[#161B22] dark:text-[#F5F3EE]">
                    {stat.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="button" onClick={openAddForm} className={`${primaryBtnClass} self-start`}>
            <Plus className="h-4 w-4" /> Add Certificate
          </button>
        </div>

        {/* Toolbar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search by title or organization…"
              className={`${inputClass} pl-9`}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map(({ value, label }) => {
              const isActive = activeCategory === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setActiveCategory(value)}
                  aria-pressed={isActive}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#161B22] text-white dark:bg-white dark:text-[#0B1220]'
                      : 'border border-black/10 text-slate-600 hover:border-black/20 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Grid / empty state */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-black/10 py-20 text-center dark:border-white/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/5 dark:bg-white/5">
              <Frame className="h-6 w-6 text-slate-400" />
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-[#161B22] dark:text-[#F5F3EE]">
                {certificates.length === 0 ? 'No credentials yet' : 'Nothing matches your search'}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {certificates.length === 0
                  ? 'Add your first certificate to start building this section.'
                  : 'Try a different search term or category.'}
              </p>
            </div>
            {certificates.length === 0 ? (
              <button type="button" onClick={openAddForm} className={primaryBtnClass}>
                <Plus className="h-4 w-4" /> Add Certificate
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setActiveCategory('All')
                }}
                className={secondaryBtnClass}
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((cert) => (
                <motion.div
                  key={cert.id}
                  layout
                  className="h-full"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {renderCard(cert)}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>

      {/* ---------------- View modal ---------------- */}
      <AnimatePresence>
        {viewing && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewing(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-label={viewing.title}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-black/10 bg-[#FAF7F0] shadow-2xl dark:border-white/10 dark:bg-[#0F1729]"
            >
              <button
                type="button"
                onClick={() => setViewing(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-white/5">
                {viewing.imageUrl && !brokenImages[viewing.id] ? (
                  // eslint-disable-next-line @next/next/no-img-element -- image URLs are arbitrary/user-supplied, not known at build time
                  <img
                    src={viewing.imageUrl}
                    alt={viewing.title}
                    onError={() => handleImageError(viewing.id)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1F2937] via-[#2A3652] to-[#3B4A6B]">
                    {(() => {
                      const Icon = CATEGORY_META[viewing.category].icon
                      return <Icon className="h-14 w-14 text-white/25" />
                    })()}
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
                  <span className={`h-1.5 w-1.5 rounded-full ${CATEGORY_META[viewing.category].dot}`} />
                  <span className={CATEGORY_META[viewing.category].color}>{viewing.category}</span>
                  {viewing.featured && (
                    <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-600 dark:text-amber-400">
                      <Star className="h-3 w-3" fill="currentColor" /> Featured
                    </span>
                  )}
                </div>

                <h3 className="mt-2 font-serif text-2xl font-semibold text-[#161B22] dark:text-[#F5F3EE]">
                  {viewing.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" />
                    {viewing.organization}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {viewing.issueDate}
                  </span>
                  {viewing.credentialId && (
                    <span className="font-mono text-xs text-slate-400">#{viewing.credentialId}</span>
                  )}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {viewing.description}
                </p>

                {viewing.skills.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {viewing.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-black/5 bg-black/[0.03] px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-black/10 pt-6 dark:border-white/10">
                  {viewing.credentialUrl && (
                    <a
                      href={viewing.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                    >
                      <ExternalLink className="h-4 w-4" /> Verify Credential
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => openEditForm(viewing)}
                    className={secondaryBtnClass}
                  >
                    <Edit3 className="h-4 w-4" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDeleteId(viewing.id)}
                    className="inline-flex items-center gap-2 rounded-xl border border-rose-600/20 px-4 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-500/10"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewing(null)}
                    className="ml-auto text-sm font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Add / edit form modal ---------------- */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeForm}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-label={editingId ? 'Edit certificate' : 'Add certificate'}
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0F1729] sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-serif text-xl font-semibold text-[#161B22] dark:text-[#F5F3EE]">
                  {editingId ? 'Edit Certificate' : 'Add Certificate'}
                </h3>
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Title *</label>
                  <input
                    ref={titleInputRef}
                    required
                    value={form.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    placeholder="e.g. React.js Developer Certificate"
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Category</label>
                    <div className="relative">
                      <select
                        value={form.category}
                        onChange={(e) => handleFormChange('category', e.target.value as Category)}
                        className={`${inputClass} appearance-none pr-9`}
                      >
                        {(Object.keys(CATEGORY_META) as Category[]).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Organization *</label>
                    <input
                      required
                      value={form.organization}
                      onChange={(e) => handleFormChange('organization', e.target.value)}
                      placeholder="e.g. Meta"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Issue Date *</label>
                    <input
                      required
                      value={form.issueDate}
                      onChange={(e) => handleFormChange('issueDate', e.target.value)}
                      placeholder="e.g. 2026 or Jan 2026"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Credential ID</label>
                    <input
                      value={form.credentialId}
                      onChange={(e) => handleFormChange('credentialId', e.target.value)}
                      placeholder="e.g. CERT-12345"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Credential URL</label>
                    <input
                      value={form.credentialUrl}
                      onChange={(e) => handleFormChange('credentialUrl', e.target.value)}
                      placeholder="https://…"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Image URL</label>
                    <input
                      value={form.imageUrl}
                      onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                      placeholder="/certificates/example.jpg"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    placeholder="What does this credential represent?"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelClass}>Skills</label>
                  <input
                    value={form.skills}
                    onChange={(e) => handleFormChange('skills', e.target.value)}
                    placeholder="React.js, JavaScript, Frontend"
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-[11px] text-slate-400">Separate each skill with a comma.</p>
                </div>

                <div className="mt-2 flex items-center justify-end gap-3 border-t border-black/10 pt-5 dark:border-white/10">
                  <button type="button" onClick={closeForm} className={secondaryBtnClass}>
                    Cancel
                  </button>
                  <button type="submit" className={primaryBtnClass}>
                    {editingId ? 'Save Changes' : 'Add Certificate'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Delete confirmation ---------------- */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPendingDeleteId(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              role="alertdialog"
              aria-modal="true"
              className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0F1729]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-500/10">
                <Trash2 className="h-5 w-5 text-rose-600" />
              </div>
              <h4 className="mt-4 font-serif text-lg font-semibold text-[#161B22] dark:text-[#F5F3EE]">
                Delete this credential?
              </h4>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                &ldquo;{deleteTarget.title}&rdquo; will be removed permanently. This can&apos;t be undone.
              </p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPendingDeleteId(null)}
                  className={secondaryBtnClass}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}