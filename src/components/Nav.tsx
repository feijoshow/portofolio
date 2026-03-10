import { useState, useEffect } from 'react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '1.2rem 4rem' : '2rem 4rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(10,9,8,0.94)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid #2a2826' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <a href="#hero" style={{
        fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 300,
        color: 'var(--text-primary)', textDecoration: 'none', letterSpacing: '0.1em',
      }}>
        F<span style={{ color: 'var(--copper)' }}>.</span>
      </a>

      <ul style={{ display: 'flex', gap: '3rem', listStyle: 'none' }}>
        {links.map(({ label, href }) => (
          <li key={label}>
            <a href={href} style={{
              fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 300,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--text-secondary)', textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--copper-light)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
