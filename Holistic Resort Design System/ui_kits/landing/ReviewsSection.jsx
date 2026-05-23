/* global React, SectionHeading */
// Guest reviews — real, verified quotes pulled from the hotel's public
// profiles on Booking (8.8/10 · 6 reseñas) and Tripadvisor (5.0/5).
// Front-end only; the cards adapt to day/night through the design tokens.
const REVIEWS = [
  {
    name: 'Sebastián D.',
    place: 'Pareja · Colombia',
    source: 'Tripadvisor',
    score: 5,
    quote: 'El hotel es nuevo y muy lindo. Llegas y notas la arquitectura hermosa y bien hecha. Atención, comida, decoración: todo es espectacular. Y a menos de una hora de Medellín.',
  },
  {
    name: 'Jorge',
    place: 'Estados Unidos',
    source: 'Booking',
    score: 5,
    quote: 'Un gran lugar, con estilo y mucha atención al detalle. Todo nuevo y muy limpio.',
  },
  {
    name: 'Laura',
    place: 'Estados Unidos',
    source: 'Booking',
    score: 4,
    quote: 'Un hotel nuevo y hermoso, con un aire moderno. La comida estaba deliciosa.',
  },
  {
    name: 'Javier',
    place: 'Colombia',
    source: 'Booking',
    score: 5,
    quote: 'Excepcional. Maravilloso de principio a fin.',
  },
];

// Public reviews page (Google · Holistic EcoHotel).
const REVIEWS_URL = 'https://www.google.com/travel/search?q=holistic%20ecohotel';

function Stars({ score }) {
  return (
    <div aria-label={`${score} de 5`} style={{ display: 'inline-flex', gap: 2, color: 'var(--brand)' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} aria-hidden style={{ fontSize: 14, opacity: i <= score ? 1 : 0.22 }}>★</span>
      ))}
    </div>
  );
}

function ReviewsSection() {
  return (
    <section style={{ background: 'transparent', padding: 'clamp(64px, 10vw, 128px) 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHeading
          eyebrow="Lo que dicen"
          title="Voces de quienes ya vinieron."
          lead="Reseñas reales de huéspedes en Booking y Tripadvisor."
          align="center"
        />

        <div style={{ display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap', margin: '24px 0 8px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)', letterSpacing: '0.04em' }}>
          <span><strong style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--fg)', fontWeight: 400 }}>8.8</strong> / 10 · Booking</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span><strong style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--fg)', fontWeight: 400 }}>5.0</strong> / 5 · Tripadvisor</span>
        </div>

        <div className="reviews-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22, marginTop: 44,
        }}>
          {REVIEWS.map((r) => (
            <figure key={r.name} style={{
              margin: 0, display: 'flex', flexDirection: 'column',
              background: 'var(--glass-bg)', WebkitBackdropFilter: 'var(--glass-blur)', backdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)',
              padding: '26px 24px', boxShadow: 'var(--shadow-2)',
            }}>
              <Stars score={r.score} />
              <blockquote style={{
                margin: '16px 0 0', flex: 1,
                fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontWeight: 300,
                fontSize: 16, lineHeight: 1.5, color: 'var(--fg)',
              }}>“{r.quote}”</blockquote>
              <figcaption style={{ marginTop: 22 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--fg)' }}>{r.name}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{r.place} · {r.source}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href={REVIEWS_URL} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em',
            color: 'var(--brand)', textDecoration: 'none',
          }}>Ver todas las reseñas en Google →</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) { .reviews-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .reviews-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
window.ReviewsSection = ReviewsSection;
