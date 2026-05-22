/* global React, SectionHeading */
const { useEffect, useRef } = React;

function WelcomeSection() {
  return (
    <section id="El lugar" style={{
      background: 'var(--bone)',
      padding: 'clamp(80px, 12vw, 160px) 24px',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr)',
        gridTemplateRows: 'auto auto auto',
        gap: 24,
      }} className="welcome-grid">
        {/* Left big drone image */}
        <div style={{ gridRow: '1 / span 3', borderRadius: 24, overflow: 'hidden', aspectRatio: '3 / 5', minHeight: 540 }}>
          <img src="../../assets/DroneHero.jpg" alt="Vista aérea de Holistic Eco Hotel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Text block — middle column row 1 */}
        <div style={{ gridColumn: '2 / span 2', padding: '20px 0 8px' }}>
          <SectionHeading
            eyebrow="01 · El lugar"
            title="Un pedazo de selva con cama tendida."
            lead="Cinco hectáreas entre samanes y ceibas, en silencio casi completo. Holistic no se visita — se habita."
          />
        </div>

        {/* Middle column row 2 — Hero2 image */}
        <div style={{ borderRadius: 18, overflow: 'hidden', aspectRatio: '4 / 3' }}>
          <img src="../../assets/Hero2.jpg" alt="Piscina vista desde arriba" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Right column row 2 — paragraph */}
        <div style={{ alignSelf: 'center', padding: '8px 0' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--ink)', margin: 0 }}>
            Despertarás con el canto del río. Almorzarás bajo la palapa. Descalzo por la piscina al atardecer, sin que nadie te apure.
          </p>
          <p style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontSize: 18, color: 'var(--moss)', margin: '14px 0 0' }}>
            — Una pausa entre el verde.
          </p>
        </div>

        {/* Bottom right — night image as pre-echo */}
        <div style={{ gridColumn: '2 / span 2', borderRadius: 18, overflow: 'hidden', aspectRatio: '21 / 8', position: 'relative' }}>
          <img src="../../assets/HeroNight.jpg" alt="La piscina al anochecer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(11,15,26,0.5), rgba(0,0,0,0))', display: 'flex', alignItems: 'center', padding: '0 32px' }}>
            <span style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.25rem, 1rem + 1vw, 1.875rem)', color: 'var(--moon)', maxWidth: 380 }}>
              Y cuando cae el sol, todo cambia de tono.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .welcome-grid { grid-template-columns: 1fr !important; }
          .welcome-grid > :first-child { grid-row: auto !important; aspect-ratio: 4 / 5 !important; min-height: 0 !important; }
          .welcome-grid > :nth-child(2) { grid-column: 1 !important; }
          .welcome-grid > :nth-child(5) { grid-column: 1 !important; aspect-ratio: 16 / 9 !important; }
        }
      `}</style>
    </section>
  );
}
window.WelcomeSection = WelcomeSection;
