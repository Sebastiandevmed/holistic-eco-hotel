/* global React, SectionHeading */
const { useEffect, useRef, useState } = React;

function RoomsShowcase() {
  const scrollerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const rooms = [
    { img: 'Room1.jpg', name: 'Suite Samán',     m2: 34, cap: 2, price: 420 },
    { img: 'Room2.jpg', name: 'Suite Ceiba',     m2: 38, cap: 2, price: 460 },
    { img: 'Room3.jpg', name: 'Suite Guayacán',  m2: 32, cap: 2, price: 410 },
    { img: 'Room4.jpg', name: 'Suite Cedro',     m2: 36, cap: 2, price: 440 },
    { img: 'Room5.jpg', name: 'Suite Almendro',  m2: 30, cap: 2, price: 390 },
    { img: 'Room6.jpg', name: 'Suite Caracolí',  m2: 40, cap: 3, price: 510 },
    { img: 'Room7.jpg', name: 'Suite Iguá',      m2: 42, cap: 3, price: 540 },
    { img: 'Room8.jpg', name: 'Suite Yarumo',    m2: 46, cap: 3, price: 580 },
  ];

  return (
    <section id="Habitaciones" style={{
      background: 'var(--bone)',
      padding: 'clamp(64px, 10vw, 128px) 0 96px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 32px' }}>
        <SectionHeading
          eyebrow="02 · Habitaciones"
          title="Ocho suites bajo techos de palma."
          lead="Cada una abre a la selva. Cada una huele a madera y limpio."
        />
      </div>

      <div
        ref={scrollerRef}
        style={{
          display: 'flex', gap: 18,
          overflowX: 'auto',
          padding: '8px 24px 28px',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
        }}
      >
        <style>{`
          .rooms-scroller::-webkit-scrollbar { display: none; }
        `}</style>
        {rooms.map((r, i) => (
          <article key={r.name} style={{
            flex: '0 0 auto',
            width: 'min(76vw, 380px)',
            scrollSnapAlign: 'start',
            borderRadius: 18,
            overflow: 'hidden',
            background: '#fff',
            boxShadow: 'var(--shadow-2)',
            transition: 'transform 320ms var(--ease-organic), box-shadow 320ms',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-2)'; }}
          >
            <div style={{ position: 'relative', aspectRatio: '4 / 5' }}>
              <img src={'../../assets/' + r.img} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }} />
              <div style={{ position: 'absolute', left: 18, right: 18, bottom: 16, color: '#fff' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.85, fontWeight: 600 }}>0{i + 1} · Suite</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 30, margin: '4px 0 6px', letterSpacing: '0.005em' }}>{r.name}</h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.85)', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <span>{r.cap} huésp.</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{r.m2} m²</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>desde ${r.price}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
        <div style={{ flex: '0 0 24px' }} />
      </div>

      {/* Progress bar */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', letterSpacing: '0.05em' }}>
            {String(Math.round(progress * 7) + 1).padStart(2, '0')} <span style={{ opacity: 0.4 }}>/ 08</span>
          </div>
          <div style={{ flex: 1, height: 1, background: 'rgba(42,37,32,0.12)', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: -0.5, height: 2, background: 'var(--moss)', width: (progress * 100) + '%', transition: 'width 120ms linear' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>Desliza →</div>
        </div>
      </div>
    </section>
  );
}
window.RoomsShowcase = RoomsShowcase;
