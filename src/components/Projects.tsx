import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    id: '01',
    name: 'CRENIT',
    tagline: 'Rent Payments as a Credit Engine',
    description: 'The problem: millions of renters pay on time every month. None of it builds their credit score. CRENIT turns every rent payment into a credit-building event. On-time = score up. Late = accountability. Consistently.',
    status: '🚧 Active Development',
    phase: 'Phase 1 Shipped',
    stack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'TypeORM', 'JWT', 'RBAC'],
    shipped: ['Auth system (JWT, role-based)', 'Landlord dashboard', 'Tenant dashboard + credit score', 'KYC document verification', 'Auto credit score engine'],
    planned: ['Stripe payment integration', 'Credit bureau API reporting', 'Escrow & deposit management', 'Mobile apps'],
    link: 'https://github.com/robertofeijon/CRENIT',
    featured: true,
  },
  {
    id: '02',
    name: 'More coming soon',
    tagline: 'Always shipping.',
    description: 'Currently heads-down on CRENIT. More projects will surface as they ship. The pipeline is full — the commits are just not public yet.',
    status: '⚡ In Pipeline',
    phase: '',
    stack: ['React', 'TypeScript', 'Node.js'],
    shipped: [],
    planned: [],
    link: 'https://github.com/feijoshow',
    featured: false,
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 120);
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
    <section id="projects" ref={ref} style={{
      minHeight: '100vh', padding: '10rem 4rem',
      borderTop: '1px solid var(--border)', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, right: '15%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(184,115,51,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ ...revealStyle, fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ display: 'inline-block', width: '2.5rem', height: '1px', background: 'var(--copper)' }} />
          Projects
        </div>

        <h2 className="reveal" style={{ ...revealStyle, fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '5rem', color: 'var(--text-primary)' }}>
          Things I've<br /><em style={{ color: 'var(--copper-light)' }}>built & shipped</em>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {projects.map((project) => (
            <div key={project.id} className="reveal" style={{ ...revealStyle }}>
              <div
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: hovered === project.id ? 'rgba(22,21,20,0.95)' : 'var(--surface)',
                  border: `1px solid ${hovered === project.id ? 'rgba(184,115,51,0.4)' : 'var(--border)'}`,
                  borderRadius: '4px', padding: '3rem',
                  transition: 'all 0.4s ease',
                  boxShadow: hovered === project.id ? '0 8px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(184,115,51,0.1)' : 'none',
                  cursor: 'default',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--copper)', opacity: 0.6 }}>{project.id}</span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                        {project.name}
                      </h3>
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--copper-light)', opacity: 0.8 }}>
                      {project.tagline}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', padding: '0.3rem 0.8rem', border: '1px solid var(--border)', borderRadius: '2px' }}>
                      {project.status}
                    </span>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                      color: 'var(--copper)', textDecoration: 'none',
                      borderBottom: '1px solid rgba(184,115,51,0.4)', paddingBottom: '2px',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--copper-bright)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--copper)')}
                    >
                      GitHub →
                    </a>
                  </div>
                </div>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.9, color: 'var(--text-secondary)', maxWidth: '700px', marginBottom: '2rem' }}>
                  {project.description}
                </p>

                {project.featured && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--copper)', marginBottom: '1rem', textTransform: 'uppercase' }}>✅ Phase 1 Shipped</div>
                      {project.shipped.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.45rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: '0.78rem', lineHeight: 1.5 }}>
                          <span style={{ color: 'var(--copper)', opacity: 0.5, marginTop: '1px' }}>—</span>
                          {item}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase' }}>⬜ Phase 2 Planned</div>
                      {project.planned.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.45rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.78rem', lineHeight: 1.5 }}>
                          <span style={{ opacity: 0.4, marginTop: '1px' }}>—</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.stack.map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                      color: 'var(--copper)', padding: '0.3rem 0.8rem',
                      border: '1px solid rgba(184,115,51,0.25)', borderRadius: '2px',
                      background: 'rgba(184,115,51,0.04)',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ ...revealStyle, textAlign: 'center', marginTop: '4rem' }}>
          <a href="https://github.com/feijoshow" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--text-secondary)', textDecoration: 'none',
            borderBottom: '1px solid var(--border)', paddingBottom: '4px',
            transition: 'color 0.3s, border-color 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--copper)'; e.currentTarget.style.borderColor = 'var(--copper)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            More on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
