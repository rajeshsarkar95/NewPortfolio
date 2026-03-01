import { useEffect, useRef } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'

import Navbar               from '@/components/layout/Navbar'
import Footer               from '@/components/layout/Footer'
import HeroSection          from '@/components/sections/HeroSection'
import AboutSection         from '@/components/sections/AboutSection'
import SkillsSection        from '@/components/sections/SkillsSection'
import ProjectsSection      from '@/components/sections/ProjectsSection'
import ExperienceSection    from '@/components/sections/ExperienceSection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import ContactSection       from '@/components/sections/ContactSection'

function AmbientOrbs() {
  return (
    <div aria-hidden="true" className="pointer-events-none">
      <div
        className="fixed rounded-full"
        style={{
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(108,99,255,0.27) 0%, transparent 70%)',
          filter: 'blur(100px)',
          top: -200, left: -200, zIndex: 0, opacity: 0.35,
          animation: 'orbFloat 12s ease-in-out infinite',
        }}
      />
      <div
        className="fixed rounded-full"
        style={{
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(56,189,248,0.27) 0%, transparent 70%)',
          filter: 'blur(100px)',
          bottom: '20%', right: -100, zIndex: 0, opacity: 0.35,
          animation: 'orbFloat 16s ease-in-out infinite reverse',
        }}
      />
      <div
        className="fixed rounded-full"
        style={{
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)',
          filter: 'blur(100px)',
          top: '50%', left: '30%', zIndex: 0, opacity: 0.35,
          animation: 'orbFloat 20s ease-in-out infinite',
        }}
      />
    </div>
  )
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return
      ref.current.style.left = e.clientX + 'px'
      ref.current.style.top  = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed pointer-events-none rounded-full hidden md:block"
      style={{
        width: 400, height: 400, zIndex: 1, opacity: 0.45,
        background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.12s ease, top 0.12s ease',
      }}
    />
  )
}

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('visible')
          entry.target.querySelectorAll<HTMLElement>('[data-width]').forEach((bar) => {
            bar.style.width = bar.dataset.width + '%'
          })
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
const Home: NextPage = () => {
  useScrollReveal()

  return (
    <>
      <Head>
        <title>Rajesh Sarkar — Full Stack Developer | MERN Stack</title>
        <meta
          name="description"
          content="Full Stack MERN Developer from Uttar Pradesh, India. Building scalable, efficient, user-focused web applications with React, Next.js, Node.js, MongoDB & TypeScript."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Rajesh Sarkar — Full Stack Developer" />
        <meta property="og:description" content="Building scalable, efficient, user-focused web applications." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="noise-overlay" aria-hidden="true" />
      <AmbientOrbs />
      <CursorGlow />
      <Navbar />

      <main id="main-content" role="main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}

export default Home
