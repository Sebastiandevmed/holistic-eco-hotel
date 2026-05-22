/* global React */
// Father's-day promo. Shows once per session; `active` lets the home delay it
// until after the splash intro has finished.
const { useState, useEffect } = React;

function PromoPopup({ active = true }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (sessionStorage.getItem('holistic-promo-seen') === '1') return;
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, [active]);

  const close = () => {
    sessionStorage.setItem('holistic-promo-seen', '1');
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={close}
      role="dialog" aria-modal="true" aria-label="Promoción mes del padre"
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        background: 'rgba(11,15,26,0.6)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        animation: 'promoFade 320ms var(--ease-organic) both',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative', width: 'min(440px, 100%)',
          background: 'var(--midnight)', color: 'var(--moon)',
          borderRadius: 22, overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
          border: '1px solid rgba(242,232,200,0.18)',
          animation: 'promoPop 420ms var(--ease-organic) both',
        }}
      >
        {/* Image header */}
        <div style={{ position: 'relative', height: 180 }}>
          <img src="../../assets/HeroNight.jpg" alt="" aria-hidden style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,15,26,0.1), rgba(11,15,26,0.95))' }} />
          <button
            onClick={close} aria-label="Cerrar"
            style={{
              position: 'absolute', top: 12, right: 12,
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(0,0,0,0.45)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)',
              cursor: 'pointer', fontSize: 16, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '8px 30px 32px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--gold)' }}>
            Junio · Mes del padre
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(1.7rem, 1.3rem + 1.6vw, 2.3rem)', lineHeight: 1.12, margin: '12px 0 12px' }}>
            Celebra a papá en la selva.
          </h2>
          <p style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontWeight: 300, fontSize: '1.1rem', color: 'rgba(242,232,200,0.85)', lineHeight: 1.5, margin: '0 auto 24px', maxWidth: 320 }}>
            Reservas con descuento especial por el mes del padre. Solo por tiempo limitado.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="reservas.html" onClick={close} style={{
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, letterSpacing: '0.04em',
              padding: '13px 26px', borderRadius: 999, textDecoration: 'none',
              background: 'var(--moon)', color: 'var(--midnight)',
            }}>Ver reservas →</a>
            <button onClick={close} style={{
              fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: '0.04em',
              padding: '13px 18px', borderRadius: 999, cursor: 'pointer',
              background: 'transparent', color: 'rgba(242,232,200,0.7)', border: 'none',
            }}>Quizás luego</button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes promoFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes promoPop { from { opacity: 0; transform: translateY(16px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}
window.PromoPopup = PromoPopup;
