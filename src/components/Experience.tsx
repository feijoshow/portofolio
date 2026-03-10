import React, { useEffect, useRef } from 'react';

const experiences = [
  {
    period: '2024 — Present',
    role: 'Founder & Lead Engineer',
    company: 'CRENIT',
    type: 'Startup · Fintech',
    description: 'Building a fintech platform that converts rent payments into credit-building events. Architecting the full stack — React frontend, NestJS backend, PostgreSQL, role-based auth, and an automated credit scoring engine.',
    tags: ['React', 'NestJS', 'PostgreSQL', 'TypeORM', 'JWT', 'RBAC'],
  },
  {
    period: '2023 — 2024',
    role: 'Fullstack Developer',
    company: 'Freelance',
    type: 'Independent · Remote',
    description: 'Delivered end-to-end web applications for clients across Namibia and remote contracts. Focused on clean architecture, auth systems, and performant UIs.',
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'TypeScript'],
  },
  {
    period: '2022 — 2023',
    role: 'Frontend Developer',
    company: 'Local Projects',
    type: 'Namibia',
    description: 'Built UI systems and client-facing interfaces, developing a strong foundation in component design, state management, and modern CSS.',
    tags: ['React', 'CSS', 'JavaScript', 'Figma'],
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const revealStyle: React.CSSProperties = {
    opacity: 0, transform: 'translateY(24px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  };

  return (
    <section id="experience" ref={ref} style={{
      minHeight: '100vh', padding: '10rem 4rem',
      borderTop: '1px solid var(--border)', position: 'relative',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="reveal" style={{ ...revealStyle, fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ display: 'inline-block', width: '2.5rem', height: '1px', background: 'var(--copper)' }} />
          Experience
        </div>

        <h2 className="reveal" style={{ ...revealStyle, fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '5rem', color: 'var(--text-primary)' }}>
          Where I've<br /><em style={{ color: 'var(--copper-light)' }}>shipped things</em>
        </h2>

        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: '0', top: 0, bottom: 0,
            width: '1px', background: 'linear-gradient(to bottom, var(--copper), transparent)',
            opacity: 0.3,
          }} />

          {experiences.map((exp, i) => (
            <div key={i} className="reveal" style={{
              ...revealStyle, paddingLeft: '3rem', paddingBottom: '4rem',
              position: 'relative',
            }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: '-4px', top: '6px',
                width: '9px', height: '9px',
                border: '1px solid var(--copper)',
                borderRadius: '50%',
                background: i === 0 ? 'var(--copper)' : 'var(--black)',
                boxShadow: i === 0 ? '0 0 12px rgba(184,115,51,0.5)' : 'none',
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {exp.role}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--copper-light)', opacity: 0.9 }}>
                    {exp.company} <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>·</span> {exp.type}
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.05em', paddingTop: '0.3rem' }}>
                  {exp.period}
                </div>
              </div>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.85, color: 'var(--text-secondary)', letterSpacing: '0.03em', marginBottom: '1.25rem', maxWidth: '580px' }}>
                {exp.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {exp.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 300,
                    letterSpacing: '0.1em', color: 'var(--copper)', padding: '0.3rem 0.8rem',
                    border: '1px solid rgba(184,115,51,0.3)', borderRadius: '2px',
                    background: 'rgba(184,115,51,0.05)',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
