/* global React, ReserveButton, Button */
const { useEffect, useState } = React;

function CtaSection() {
  return (
    <section id="Contacto" style={{
      position: 'relative',
      minHeight: '80vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '120px 24px',
      overflow: 'hidden',
      background: '#0B0F1A',
    }}>
      <img src="../../assets/DroneHero.jpg" alt="" aria-hidden style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        opacity: 0.45,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,15,26,0.55), rgba(11,15,26,0.85))' }} />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 760, color: 'var(--moon)' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(242,232,200,0.7)' }}>
          Reservar
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: 'clamp(3rem, 2rem + 4vw, 5.5rem)',
          lineHeight: 1, letterSpacing: '-0.008em',
          margin: '16px 0 20px',
        }}>
          Tu escape <em style={{ fontStyle: 'italic' }}>te espera</em>.
        </h2>
        <p style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.25rem, 1rem + 1vw, 1.625rem)', color: 'rgba(242,232,200,0.85)', lineHeight: 1.5, margin: '0 auto 36px', maxWidth: 520 }}>
          Cinco hectáreas de selva y un puñado de cabañas, todas iguales. Solo quedan algunas fechas para esta temporada.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <ReserveButton variant="nightFill">Reservar ahora</ReserveButton>
          {/* TODO: reemplazar por el número real de WhatsApp del hotel */}
          <Button variant="night" href="https://wa.me/0000000000" target="_blank" rel="noopener noreferrer">Contáctanos</Button>
        </div>
        <div style={{ marginTop: 30, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(242,232,200,0.55)', letterSpacing: '0.05em' }}>
          Solo quedan <b style={{ color: 'var(--moon)', fontWeight: 600 }}>3 cabañas</b> para diciembre.
        </div>
      </div>
    </section>
  );
}
window.CtaSection = CtaSection;
