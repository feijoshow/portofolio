import { useEffect, useRef } from 'react';

const bugs = [
  'Cannot stop building once an idea takes hold',
  'Hides easter eggs in every project (feature, not a bug)',
  'Allergic to stopping at "good enough"',
];

export default function About() {
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
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const revealStyle: React.CSSProperties = {
    opacity: 0,
    transform: 'translateY(24px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  };

  return (
    <section id="about" ref={ref} style={{
      minHeight: '100vh', padding: '10rem 4rem',
      display: 'flex', alignItems: 'center',
      borderTop: '1px solid var(--border)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(184,115,51,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
        
        {/* Left */}
        <div>
          <div className="reveal" style={{ ...revealStyle, fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ display: 'inline-block', width: '2.5rem', height: '1px', background: 'var(--copper)' }} />
            About
          </div>

          <h2 className="reveal" style={{ ...revealStyle, fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '2.5rem', color: 'var(--text-primary)' }}>
            Building software<br />
            <em style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>that disappears</em>
          </h2>

          <p className="reveal" style={{ ...revealStyle, fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.9, color: 'var(--text-secondary)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>
            Fullstack engineer based in Windhoek, Namibia. I build products where the technology is invisible — where users just <em>feel</em> it working. Currently deep in fintech, exploring how software can reshape credit infrastructure in underserved markets.
          </p>

          <p className="reveal" style={{ ...revealStyle, fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.9, color: 'var(--text-secondary)', letterSpacing: '0.04em', marginBottom: '3rem' }}>
            Open to collabs, contracts, and interesting problems. Not open to bad coffee and boring work.
          </p>

          <div className="reveal" style={{ ...revealStyle }}>
            <a href="mailto:cristianofeijo@gmail.com" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 300,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--copper)', textDecoration: 'none',
              borderBottom: '1px solid var(--copper)', paddingBottom: '4px',
              transition: 'color 0.3s, opacity 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--copper-bright)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--copper)')}
            >
              cristianofeijo@gmail.com →
            </a>
          </div>
        </div>

        {/* Right - Info card */}
        <div>
          {/* System info block */}
          <div className="reveal" style={{
            ...revealStyle,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '4px', padding: '2rem', marginBottom: '2rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
          }}>
            <div style={{ color: 'var(--copper)', marginBottom: '1.2rem', fontSize: '0.65rem', letterSpacing: '0.2em' }}>{'// system.info'}</div>
            {[
              { k: 'NAME', v: 'Feijo' },
              { k: 'ROLE', v: 'Fullstack Engineer' },
              { k: 'LOCATION', v: 'Windhoek, Namibia 🌍' },
              { k: 'STATUS', v: 'open to collabs & opportunities' },
              { k: 'UPTIME', v: 'always building' },
              { k: 'KERNEL', v: 'curiosity v∞' },
              { k: 'LOAD AVG', v: 'high — intentionally' },
            ].map(({ k, v }) => (
              <div key={k} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--copper-light)', minWidth: '90px', opacity: 0.7 }}>{k}</span>
                <span style={{ color: 'var(--text-primary)', opacity: 0.75 }}>: {v}</span>
              </div>
            ))}
          </div>

          {/* Known bugs */}
          <div className="reveal" style={{
            ...revealStyle,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '4px', padding: '2rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
          }}>
            <div style={{ color: 'var(--copper)', marginBottom: '1.2rem', fontSize: '0.65rem', letterSpacing: '0.2em' }}>{'// known_bugs.log'}</div>
            {bugs.map((bug, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--copper)', opacity: 0.5 }}>—</span>
                <span>{bug}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}