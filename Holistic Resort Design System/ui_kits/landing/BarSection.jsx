/* global React, SectionHeading */
const { useEffect, useRef, useState } = React;

function BarSection() {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = r.top + r.height / 2 - vh / 2;
      setOffset(Math.max(-80, Math.min(80, -center * 0.18)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="Bar" ref={ref} style={{
      position: 'relative',
      minHeight: '90vh',
      overflow: 'hidden',
      background: '#1a1410',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        position: 'absolute', inset: '-10% 0',
        backgroundImage: 'url(../../assets/Bar.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        transform: `translateY(${offset}px) scale(1.06)`,
        willChange: 'transform',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.7), rgba(0,0,0,0.25) 50%, rgba(0,0,0,0))' }} />

      {/* Glow flecks */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[12, 32, 58, 78, 24, 64, 88].map((t, i) => (
          <span key={i} style={{
            position: 'absolute', left: t + '%', top: (15 + (i * 11) % 60) + '%',
            width: 3, height: 3, borderRadius: '50%',
            background: 'var(--moon)', boxShadow: '0 0 18px rgba(242,232,200,0.7)',
            opacity: 0.4 + (i % 3) * 0.2,
            animation: `flicker ${3 + (i % 4)}s ease-in-out ${i * 0.4}s infinite alternate`,
          }} />
        ))}
      </div>

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '120px 24px', width: '100%' }}>
        <div style={{ maxWidth: 560, color: 'var(--moon)' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(242,232,200,0.7)' }}>
            06 · Bar & gastronomía
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(2.5rem, 1.6rem + 3.4vw, 4rem)',
            lineHeight: 1.05, letterSpacing: '-0.004em',
            margin: '14px 0 18px', color: 'var(--moon)',
          }}>
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Mezcal,</em> palo santo y conversaciones que se alargan.
          </h2>
          <p style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.125rem, 0.95rem + 0.7vw, 1.5rem)', color: 'rgba(242,232,200,0.85)', lineHeight: 1.5, margin: 0, maxWidth: 460 }}>
            Cócteles con ingredientes del huerto, cocina latinoamericana lenta, una bodega de vino natural. Hasta tarde, sin reservación.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes flicker {
          0% { opacity: 0.25 } 100% { opacity: 0.85 }
        }
      `}</style>
    </section>
  );
}
window.BarSection = BarSection;
