/* global React, SectionHeading */

// Common areas (pool, river, outdoor kitchens) — the shared spaces of the resort.
function PoolMasonry() {
  const photos = [
    { src: 'Pool.jpg',   cls: 'big',  cap: 'La piscina principal' },
    { src: 'Pool2.jpg',  cls: 'sm' },
    { src: 'Pool3.jpg',  cls: 'sm' },
    { src: 'RoomOut.jpg', cls: 'sm' },
    { src: 'Pool4.jpg',  cls: 'tall', cap: 'Atardecer junto al agua' },
    { src: 'Pool5.jpg',  cls: 'sm' },
    { src: 'Pool6.jpg',  cls: 'wide' },
    { src: 'RoomOut2.jpg', cls: 'sm' },
    { src: 'Pool7.jpg',  cls: 'sm' },
    { src: 'Pool8.jpg',  cls: 'wide' },
    { src: 'RoomOut3.jpg', cls: 'sm' },
  ];

  return (
    <section id="Zonas comunes" style={{ background: 'var(--linen)', padding: 'clamp(64px, 10vw, 128px) 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto 56px' }}>
        <SectionHeading
          eyebrow="03 · Zonas comunes"
          title="Agua, sombra, silencio."
          lead="Las zonas que todos compartimos: una piscina en forma de gota, hamacas y dos cocinas frente al río."
        />
      </div>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: '180px',
        gap: 16,
      }} className="pool-grid">
        {photos.map((p, i) => {
          const span = p.cls === 'big' ? { gridColumn: 'span 2', gridRow: 'span 2' }
            : p.cls === 'tall' ? { gridRow: 'span 2' }
            : p.cls === 'wide' ? { gridColumn: 'span 2' }
            : {};
          return (
            <figure key={i} style={{
              ...span,
              margin: 0,
              borderRadius: 14,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'var(--shadow-1)',
              transition: 'transform 380ms var(--ease-organic), box-shadow 380ms, z-index 0s 380ms',
              cursor: 'zoom-in',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = 'var(--shadow-3)'; e.currentTarget.style.zIndex = 5; e.currentTarget.style.transition = 'transform 380ms var(--ease-organic), box-shadow 380ms'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-1)'; e.currentTarget.style.zIndex = ''; }}
            >
              <img src={'../../assets/' + p.src} alt={p.cap || ''} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: p.cls === 'big' ? 'kenBurns 18s var(--ease-drift) infinite alternate' : 'none' }} />
              {p.cap ? (
                <figcaption style={{ position: 'absolute', left: 18, bottom: 16, color: '#fff', fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontWeight: 300, fontSize: 22, textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>{p.cap}</figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1) translate(0,0) }
          100% { transform: scale(1.08) translate(-2%, -1%) }
        }
        @media (max-width: 720px) {
          .pool-grid { grid-template-columns: 1fr 1fr !important; }
          .pool-grid > * { grid-column: auto !important; grid-row: auto !important; }
        }
      `}</style>
    </section>
  );
}

window.PoolMasonry = PoolMasonry;
