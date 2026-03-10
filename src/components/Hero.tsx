import { useEffect, useState } from 'react';

const lines = [
  { prompt: '$', text: ' whoami' },
  { prompt: '>', text: ' feijo — fullstack engineer @ namibia', delay: 800 },
  { prompt: '$', text: ' cat current_project.txt', delay: 1600 },
  { prompt: '>', text: ' CRENIT | fintech | rent + credit + real impact', delay: 2400 },
  { prompt: '$', text: ' cat philosophy.md', delay: 3200 },
  { prompt: '>', text: ' "Good software is invisible — users just feel it working."', delay: 4000 },
  { prompt: '$', text: ' git log --oneline -1', delay: 4800 },
  { prompt: '>', text: ' shipping phase 1... 🚀', delay: 5600 },
];

function TypewriterLine({ prompt, text, delay, onDone }: { prompt: string; text: string; delay: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onDone?.();
      }
    }, 28);
    return () => clearInterval(interval);
  }, [started, text, onDone]);

  if (!started && delay > 0) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '0.35rem' }}>
      <span style={{
        color: prompt === '$' ? 'var(--copper)' : 'var(--copper-light)',
        fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginRight: '0.5rem',
        opacity: 0.9,
      }}>{prompt}</span>
      <span style={{
        color: prompt === '$' ? 'var(--text-secondary)' : 'var(--text-primary)',
        fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
        opacity: prompt === '>' ? 0.85 : 1,
      }}>{displayed}</span>
    </div>
  );
}

export default function Hero() {
  const [showCta, setShowCta] = useState(false);

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '0 4rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '10%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(184,115,51,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '5%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(184,115,51,0.04) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Vertical line accent */}
      <div style={{
        position: 'absolute', left: '4rem', top: '0', bottom: '0',
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, var(--copper), transparent)',
        opacity: 0.25,
      }} />

      <div style={{ maxWidth: '900px', paddingLeft: '3rem' }}>
        {/* Pre-title */}
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 300,
          letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--copper)',
          marginBottom: '2rem', opacity: 0,
          animation: 'fadeIn 0.6s ease 0.2s forwards',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          <span style={{ display: 'inline-block', width: '2.5rem', height: '1px', background: 'var(--copper)' }} />
          Fullstack Engineer · Windhoek, Namibia
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 300, lineHeight: 0.9,
          marginBottom: '1.5rem', opacity: 0,
          animation: 'fadeUp 0.9s ease 0.4s forwards',
        }}>
          <span style={{ display: 'block', fontSize: 'clamp(5rem, 14vw, 11rem)', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Feijo
          </span>
          <span style={{
            display: 'block', fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', letterSpacing: '0.35em',
            background: 'linear-gradient(135deg, var(--copper) 0%, var(--copper-bright) 50%, var(--copper-light) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontStyle: 'italic', marginTop: '0.5rem',
          }}>
            Building fintech from the bottom up.
          </span>
        </h1>

        {/* Terminal block */}
        <div style={{
          background: 'rgba(22,21,20,0.8)', border: '1px solid var(--border)',
          borderRadius: '8px', padding: '1.5rem 2rem', marginBottom: '3rem',
          backdropFilter: 'blur(10px)', maxWidth: '580px',
          opacity: 0, animation: 'fadeUp 0.9s ease 0.8s forwards',
          boxShadow: '0 0 40px rgba(0,0,0,0.5)',
        }}>
          {/* Terminal header dots */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
            {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.7 }} />
            ))}
          </div>

          {lines.map((line, i) => (
            <TypewriterLine
              key={i}
              prompt={line.prompt}
              text={line.text}
              delay={line.delay || 0}
              onDone={i === lines.length - 1 ? () => setShowCta(true) : undefined}
            />
          ))}

          {showCta && (
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ color: 'var(--copper)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginRight: '0.5rem' }}>$</span>
              <span style={{
                display: 'inline-block', width: '8px', height: '16px',
                background: 'var(--copper)', animation: 'blink 1s step-end infinite',
              }} />
            </div>
          )}
        </div>

        {/* CTA buttons */}
        <div style={{
          display: 'flex', gap: '1.5rem', flexWrap: 'wrap',
          opacity: 0, animation: showCta ? 'fadeUp 0.7s ease 0.1s forwards' : 'none',
        }}>
          <a href="#projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.9rem 2.5rem',
            background: 'linear-gradient(135deg, var(--copper), var(--copper-light))',
            color: 'var(--black)', textDecoration: 'none',
            fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 400,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            borderRadius: '2px', transition: 'all 0.3s ease',
            boxShadow: '0 4px 24px rgba(184,115,51,0.35)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 32px rgba(184,115,51,0.55)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(184,115,51,0.35)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
          >
            View Work
          </a>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.9rem 2.5rem',
            background: 'transparent',
            color: 'var(--copper-light)', textDecoration: 'none',
            fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 300,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            border: '1px solid var(--copper)', borderRadius: '2px', transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--copper-glow)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
          >
            Get In Touch
          </a>
        </div>

        {/* Socials */}
        <div style={{
          display: 'flex', gap: '2rem', marginTop: '3.5rem',
          opacity: 0, animation: showCta ? 'fadeIn 0.7s ease 0.3s forwards' : 'none',
        }}>
          {[
            { label: 'GitHub', href: 'https://github.com/feijoshow' },
            { label: 'Email', href: 'mailto:cristianofeijo@gmail.com' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 300,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--copper)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >{label}</a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '3rem', right: '4rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
        opacity: 0, animation: showCta ? 'fadeIn 1s ease 1s forwards' : 'none',
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', writingMode: 'vertical-rl' }}>Scroll</span>
        <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, var(--copper), transparent)' }} />
      </div>
    </section>
  );
}