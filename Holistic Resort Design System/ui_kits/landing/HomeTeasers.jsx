/* global React, SectionHeading */
// Home "resumen": three cards that lead into the dedicated subpages.
function HomeTeasers() {
  const cards = [
    {
      href: 'cabana.html',
      img: '../../assets/Villages.jpg',
      tag: 'El alojamiento',
      title: 'La cabaña',
      text: 'Una sola cabaña, la misma para todos, entre los árboles. Ducha y bañera dentro, vista directa a la selva.',
    },
    {
      href: 'galeria.html',
      img: '../../assets/Pool.jpg',
      tag: 'Fotos',
      title: 'Galería',
      text: 'La cabaña por dentro y por fuera, las zonas comunes y la piscina de día y de noche.',
    },
    {
      href: 'reservas.html',
      img: '../../assets/HeroNight.jpg',
      tag: 'Reservar',
      title: 'Reservas',
      text: 'Disponibilidad, tarifas y contacto directo. Solo quedan algunas fechas para esta temporada.',
    },
  ];

  return (
    <section style={{ background: 'var(--linen)', padding: 'clamp(64px, 10vw, 128px) 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto 56px' }}>
        <SectionHeading
          eyebrow="02 · El sitio"
          title="Explora Holistic."
          lead="Tres formas de entrar: la cabaña, las fotos y la reserva."
        />
      </div>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
      }} className="teaser-grid">
        {cards.map((c) => (
          <a key={c.href} href={c.href} style={{
            display: 'flex', flexDirection: 'column',
            textDecoration: 'none', color: 'inherit',
            background: '#fff', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            boxShadow: 'var(--shadow-1)',
            transition: 'transform 380ms var(--ease-organic), box-shadow 380ms',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-1)'; }}
          >
            <div style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}>
              <img src={c.img} alt={c.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: '24px 26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600 }}>{c.tag}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, margin: '8px 0 10px' }}>{c.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '0 0 18px' }}>{c.text}</p>
              <span style={{ marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--forest, var(--moss))' }}>Ver {c.title.toLowerCase()} →</span>
            </div>
          </a>
        ))}
      </div>
      <style>{`
        @media (max-width: 880px) { .teaser-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
window.HomeTeasers = HomeTeasers;
