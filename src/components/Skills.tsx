import { useEffect, useRef } from 'react';

const stackData = [
  {
    category: 'Frontend',
    icon: '◈',
    items: ['React', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    icon: '◉',
    items: ['NestJS', 'Node.js', 'Express', 'REST API'],
  },
  {
    category: 'Database',
    icon: '◎',
    items: ['PostgreSQL', 'MySQL', 'TypeORM'],
  },
  {
    category: 'Auth & Security',
    icon: '◐',
    items: ['JWT', 'Passport', 'bcrypt', 'RBAC'],
  },
  {
    category: 'Tools & Deploy',
    icon: '◑',
    items: ['Git', 'GitHub', 'Vercel', 'Railway', 'VSCode', 'Figma'],
  },
  {
    category: 'Currently Learning',
    icon: '◌',
    items: ['Fintech Architecture', 'Payment Systems', 'Credit Infrastructure', 'Stripe API'],
  },
];

export default function Skills() {
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
              }, i * 80);
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
    <section id="skills" ref={ref} style={{
      minHeight: '100vh', padding: '10rem 4rem',
      borderTop: '1px solid var(--border)', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', bottom: '20%', left: '10%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(184,115,51,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ ...revealStyle, fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ display: 'inline-block', width: '2.5rem', height: '1px', background: 'var(--copper)' }} />
          Stack
        </div>

        <h2 className="reveal" style={{ ...revealStyle, fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          Tools of<br /><em style={{ color: 'var(--copper-light)' }}>the craft</em>
        </h2>

        {/* JSON representation */}
        <div className="reveal" style={{
          ...revealStyle,
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)',
          marginBottom: '5rem', letterSpacing: '0.05em',
        }}>
          $ cat stack.json
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {stackData.map((group, i) => (
            <div key={i} className="reveal" style={{
              ...revealStyle,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '4px', padding: '2rem',
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,115,51,0.35)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 32px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--copper)', opacity: 0.7 }}>{group.icon}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--copper-light)', opacity: 0.8 }}>
                  {group.category}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {group.items.map(item => (
                  <span key={item} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 300,
                    color: 'var(--text-primary)', padding: '0.4rem 0.9rem',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,235,228,0.08)',
                    borderRadius: '2px', letterSpacing: '0.05em', opacity: 0.8,
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Learning currently bar */}
        <div className="reveal" style={{
          ...revealStyle, marginTop: '4rem',
          padding: '2rem 3rem',
          background: 'linear-gradient(135deg, rgba(184,115,51,0.08) 0%, transparent 100%)',
          border: '1px solid rgba(184,115,51,0.2)', borderRadius: '4px',
          display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--copper)', letterSpacing: '0.15em' }}>leveling_up:</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 300, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            fintech architecture · payment systems · credit infrastructure · always more
          </span>
        </div>
      </div>
    </section>
  );
}
