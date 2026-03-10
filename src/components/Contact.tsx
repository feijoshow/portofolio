import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

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

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: '3px', padding: '1rem 1.25rem',
    fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 300,
    color: 'var(--text-primary)', letterSpacing: '0.04em',
    outline: 'none', transition: 'border-color 0.3s',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(184,115,51,0.5)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--border)';
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    // mailto fallback — works without a backend
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:cristianofeijo@gmail.com?subject=${subject}&body=${body}`);
    setTimeout(() => {
      setStatus('done');
      setForm({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" ref={ref} style={{
      minHeight: '100vh', padding: '10rem 4rem',
      borderTop: '1px solid var(--border)', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '700px',
        background: 'radial-gradient(circle, rgba(184,115,51,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'start' }}>
        
        {/* Left */}
        <div>
          <div className="reveal" style={{ ...revealStyle, fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ display: 'inline-block', width: '2.5rem', height: '1px', background: 'var(--copper)' }} />
            Contact
          </div>

          <h2 className="reveal" style={{ ...revealStyle, fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '2.5rem', color: 'var(--text-primary)' }}>
            Let's build<br /><em style={{ color: 'var(--copper-light)' }}>something real</em>
          </h2>

          <p className="reveal" style={{ ...revealStyle, fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.9, color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            Open to collabs, contracts, full-time, and interesting problems. Not open to bad coffee and boring work.
          </p>

          <div className="reveal" style={{ ...revealStyle }}>
            {[
              { label: '$ email', value: 'cristianofeijo@gmail.com', href: 'mailto:cristianofeijo@gmail.com' },
              { label: '$ github', value: 'github.com/feijoshow', href: 'https://github.com/feijoshow' },
              { label: '$ based', value: 'Windhoek, Namibia 🌍', href: null },
            ].map(({ label, value, href }) => (
              <div key={label} style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.2rem', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--copper)', opacity: 0.7, minWidth: '80px' }}>{label}</span>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 300,
                    color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s',
                    letterSpacing: '0.03em',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--copper-light)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >{value}</a>
                ) : (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 300, color: 'var(--text-secondary)', letterSpacing: '0.03em' }}>{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div className="reveal" style={{ ...revealStyle }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your name"
                style={{ ...inputStyle }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com"
                style={{ ...inputStyle }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>Message</label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="What are you building?"
                rows={6}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 } as React.CSSProperties}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={status === 'sending' || status === 'done'}
              style={{
                padding: '1rem 2.5rem',
                background: status === 'done' ? 'rgba(184,115,51,0.15)' : 'linear-gradient(135deg, var(--copper), var(--copper-light))',
                color: status === 'done' ? 'var(--copper)' : 'var(--black)',
                border: status === 'done' ? '1px solid var(--copper)' : 'none',
                borderRadius: '3px', cursor: status === 'done' ? 'default' : 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 400,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                transition: 'all 0.3s ease', alignSelf: 'flex-start',
                boxShadow: status === 'done' ? 'none' : '0 4px 24px rgba(184,115,51,0.3)',
              }}
              onMouseEnter={e => {
                if (status === 'idle') (e.currentTarget.style.boxShadow = '0 6px 32px rgba(184,115,51,0.5)');
              }}
              onMouseLeave={e => {
                if (status === 'idle') (e.currentTarget.style.boxShadow = '0 4px 24px rgba(184,115,51,0.3)');
              }}
            >
              {status === 'idle' && 'Send Message'}
              {status === 'sending' && 'Opening...'}
              {status === 'done' && '✓ Message ready'}
            </button>

            {status === 'done' && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--copper)', opacity: 0.7, letterSpacing: '0.05em' }}>
                Your mail client should have opened. If not, email directly →
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        maxWidth: '1200px', margin: '8rem auto 0',
        borderTop: '1px solid var(--border)', paddingTop: '3rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          Cristiano Feijo<span style={{ color: 'var(--copper)' }}>.</span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          © 2025 · Built with React · Deployed on Vercel
        </span>
      </div>
    </section>
  );
}
