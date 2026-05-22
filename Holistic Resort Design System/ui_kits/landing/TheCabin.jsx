/* global React, SectionHeading, ReserveButton, IconLucide */
const { useState } = React;

// All cabins are identical: there is a single accommodation type, shown here
// from many angles (interiors + exteriors) rather than as distinct units.
function TheCabin() {
  const gallery = ['Room1.jpg', 'Room5.jpg', 'Room8.jpg', 'RoomOut.jpg', 'Room7.jpg', 'Room2.jpg'];
  const amenities = [
    'Ducha y bañera dentro de la cabaña',
    'Aire acondicionado',
    'Wifi de fibra óptica',
    'Cafetera y minibar',
    'Vista directa a la selva',
    'Ropa de cama de lino',
  ];

  return (
    <section id="La cabaña" style={{ background: 'var(--bone)', padding: 'clamp(64px, 10vw, 128px) 0 96px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 40px' }}>
        <SectionHeading
          eyebrow="02 · La cabaña"
          title="Una sola cabaña. La misma para todos, entre los árboles."
          lead="Sin categorías ni jerarquías: cada huésped duerme en la misma cabaña, abierta a la selva."
        />
      </div>

      {/* Feature image — the cabin from outside */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <figure style={{ margin: 0, position: 'relative', borderRadius: 22, overflow: 'hidden', aspectRatio: '16 / 9', boxShadow: 'var(--shadow-3)' }}>
          <img src="../../assets/Villages.jpg" alt="La cabaña entre los árboles" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'kenBurnsCabin 20s var(--ease-drift) infinite alternate' }} />
          <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: '55%', background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }} />
          <figcaption style={{ position: 'absolute', left: 26, bottom: 22, color: '#fff', fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(20px, 3vw, 30px)', textShadow: '0 1px 14px rgba(0,0,0,0.5)' }}>Tu cabaña, entre los árboles.</figcaption>
        </figure>
      </div>

      {/* Gallery (same cabin, many angles) + single spec card */}
      <div className="cabin-grid" style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 24px 0', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32, alignItems: 'start' }}>
        <div className="cabin-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {gallery.map((src, i) => (
            <figure key={i} style={{ margin: 0, borderRadius: 14, overflow: 'hidden', aspectRatio: '4 / 5', boxShadow: 'var(--shadow-1)', cursor: 'pointer', transition: 'transform 380ms var(--ease-organic), box-shadow 380ms' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = 'var(--shadow-3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-1)'; }}
            >
              <img src={'../../assets/' + src} alt="Interior de la cabaña" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </figure>
          ))}
        </div>

        <aside className="cabin-card" style={{ position: 'sticky', top: 96, background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '30px 28px', boxShadow: 'var(--shadow-2)' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600 }}>El alojamiento</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 34, margin: '8px 0 6px' }}>La cabaña</h3>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-muted)', display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 22 }}>
            <span>2 huéspedes</span><span style={{ opacity: 0.4 }}>·</span><span>38 m²</span><span style={{ opacity: 0.4 }}>·</span><span>1 cama king</span>
          </div>
          <div style={{ height: 1, background: 'var(--divider, var(--border))', margin: '0 0 20px' }} />
          <ul style={{ listStyle: 'none', margin: '0 0 26px', padding: 0, display: 'grid', gap: 12 }}>
            {amenities.map((a) => (
              <li key={a} style={{ display: 'flex', gap: 10, alignItems: 'center', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)' }}>
                <span style={{ color: 'var(--moss)', display: 'inline-flex', flex: '0 0 auto' }}><IconLucide d="M20 6L9 17l-5-5" size={18} /></span>
                {a}
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 18 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)' }}>desde</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 400, color: 'var(--ink)' }}>$480</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)' }}>/ noche</span>
          </div>
          <ReserveButton variant="primary">Reservar la cabaña</ReserveButton>
        </aside>
      </div>

      <style>{`
        @keyframes kenBurnsCabin { 0% { transform: scale(1) } 100% { transform: scale(1.06) } }
        @media (max-width: 860px) {
          .cabin-grid { grid-template-columns: 1fr !important; }
          .cabin-card { position: static !important; }
        }
        @media (max-width: 560px) {
          .cabin-gallery { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
window.TheCabin = TheCabin;
