/* global React, ReserveButton */
const { useEffect, useState } = React;

function Navbar({ mode = 'day' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const links = ['El lugar', 'Habitaciones', 'Villas', 'Bar', 'Contacto'];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
      height: 72,
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
      padding: '0 28px',
      background: bg,
      backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
      borderBottom: border,
      color: fg,
      transition: 'background 320ms var(--ease-organic), color 320ms, border-color 320ms',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <button
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            width: 30, height: 22, padding: 0, position: 'relative',
            color: 'inherit',
          }}>
          <span style={{ position: 'absolute', left: 0, right: 0, height: 1.5, background: 'currentColor', top: menuOpen ? '50%' : 4, transform: menuOpen ? 'rotate(45deg)' : 'none', transition: 'all 280ms var(--ease-organic)' }} />
          <span style={{ position: 'absolute', left: 0, right: 0, height: 1.5, background: 'currentColor', top: '50%', opacity: menuOpen ? 0 : 1, transition: 'opacity 200ms' }} />
          <span style={{ position: 'absolute', left: 0, right: 0, height: 1.5, background: 'currentColor', bottom: menuOpen ? '50%' : 4, transform: menuOpen ? 'rotate(-45deg)' : 'none', transition: 'all 280ms var(--ease-organic)' }} />
        </button>
        <div style={{ display: 'flex', gap: 22, fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: '0.06em', alignItems: 'center' }} className="nav-links">
          {links.slice(0, 3).map(l => (
            <a key={l} href={'#' + l} style={{ color: 'inherit', textDecoration: 'none', opacity: 0.85 }}>{l}</a>
          ))}
        </div>
      </div>

      <div style={{
        fontFamily: 'var(--font-brand)', fontWeight: 400,
        fontSize: 22, letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'inherit', lineHeight: 1,
      }}>
        Holistic
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.45em', fontWeight: 500, marginTop: 5, opacity: 0.7, textAlign: 'center' }}>Eco · Hotel</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 18, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 22, fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: '0.06em' }} className="nav-links">
          {links.slice(3).map(l => (
            <a key={l} href={'#' + l} style={{ color: 'inherit', textDecoration: 'none', opacity: 0.85 }}>{l}</a>
          ))}
        </div>
        <ReserveButton
          variant={scrolled ? 'primary' : (isNight ? 'night' : 'secondary')}
          arrow={false}
        >Reservar</ReserveButton>
      </div>

      <style>{`
        @media (max-width: 880px) { .nav-links { display: none !important; } }
      `}</style>
    </nav>
  );
}
window.Navbar = Navbar;
