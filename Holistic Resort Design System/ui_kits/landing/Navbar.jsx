/* global React, ReserveButton */
const { useEffect, useState } = React;

// Page links shared across the whole multi-page site.
const NAV_LINKS = [
  { label: 'Inicio', href: 'index.html' },
  { label: 'La cabaña', href: 'cabana.html' },
  { label: 'Galería', href: 'galeria.html' },
  { label: 'Reservas', href: 'reservas.html' },
];

function currentPage() {
  const file = location.pathname.split('/').pop();
  return !file || file === '' ? 'index.html' : file;
}

function Navbar({ mode = 'day' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const here = currentPage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isNight = mode === 'night';
  const bg = scrolled
    ? (isNight ? 'rgba(11,15,26,0.78)' : 'rgba(246,241,231,0.82)')
    : 'transparent';
  const fg = scrolled
    ? (isNight ? 'var(--silver)' : 'var(--ink)')
    : (isNight ? 'var(--silver)' : '#fff');
  const border = scrolled
    ? (isNight ? '1px solid rgba(212,220,235,0.08)' : '1px solid rgba(42,37,32,0.08)')
    : '1px solid transparent';

  const linkStyle = (href) => ({
    color: 'inherit', textDecoration: 'none',
    opacity: here === href ? 1 : 0.85,
    borderBottom: here === href ? '1.5px solid currentColor' : '1.5px solid transparent',
    paddingBottom: 2,
  });

  const left = NAV_LINKS.slice(0, 2);
  const right = NAV_LINKS.slice(2);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
      minHeight: 72, padding: '0 28px',
      background: bg,
      backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
      borderBottom: border,
      color: fg,
      transition: 'background 320ms var(--ease-organic), color 320ms, border-color 320ms',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <button
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            width: 30, height: 22, padding: 0, position: 'relative', color: 'inherit',
          }}>
          <span style={{ position: 'absolute', left: 0, right: 0, height: 1.5, background: 'currentColor', top: menuOpen ? '50%' : 4, transform: menuOpen ? 'rotate(45deg)' : 'none', transition: 'all 280ms var(--ease-organic)' }} />
          <span style={{ position: 'absolute', left: 0, right: 0, height: 1.5, background: 'currentColor', top: '50%', opacity: menuOpen ? 0 : 1, transition: 'opacity 200ms' }} />
          <span style={{ position: 'absolute', left: 0, right: 0, height: 1.5, background: 'currentColor', bottom: menuOpen ? '50%' : 4, transform: menuOpen ? 'rotate(-45deg)' : 'none', transition: 'all 280ms var(--ease-organic)' }} />
        </button>
        <div style={{ display: 'flex', gap: 22, fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: '0.06em', alignItems: 'center' }} className="nav-links">
          {left.map(l => (
            <a key={l.href} href={l.href} style={linkStyle(l.href)}>{l.label}</a>
          ))}
        </div>
      </div>

      <a href="index.html" style={{
        fontFamily: 'var(--font-brand)', fontWeight: 400,
        fontSize: 22, letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'inherit', lineHeight: 1, textDecoration: 'none',
      }}>
        Holistic
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.45em', fontWeight: 500, marginTop: 5, opacity: 0.7, textAlign: 'center' }}>Eco · Hotel</div>
      </a>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 18, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 22, fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: '0.06em', alignItems: 'center' }} className="nav-links">
          {right.map(l => (
            <a key={l.href} href={l.href} style={linkStyle(l.href)}>{l.label}</a>
          ))}
        </div>
        <ReserveButton
          variant={scrolled ? 'primary' : (isNight ? 'night' : 'secondary')}
          arrow={false}
        >Reservar</ReserveButton>
      </div>

      {/* Drop-down menu (the only way to navigate on mobile, where nav-links are hidden) */}
      <div style={{
        position: 'absolute', top: '100%', left: 0, right: 0,
        background: isNight ? 'rgba(11,15,26,0.96)' : 'rgba(246,241,231,0.97)',
        color: isNight ? 'var(--silver)' : 'var(--ink)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        borderBottom: border,
        overflow: 'hidden',
        maxHeight: menuOpen ? 360 : 0,
        opacity: menuOpen ? 1 : 0,
        transition: 'max-height 360ms var(--ease-organic), opacity 240ms',
        pointerEvents: menuOpen ? 'auto' : 'none',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: menuOpen ? '14px 28px 22px' : '0 28px' }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              color: 'inherit', textDecoration: 'none',
              fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 24,
              padding: '12px 0',
              opacity: here === l.href ? 1 : 0.7,
              borderBottom: '1px solid rgba(128,128,128,0.14)',
            }}>{l.label}</a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) { .nav-links { display: none !important; } }
      `}</style>
    </nav>
  );
}
window.Navbar = Navbar;
