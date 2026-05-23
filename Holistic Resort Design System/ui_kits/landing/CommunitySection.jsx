/* global React */
// Newsletter / "comunidad" signup. Front-end only for now: it validates the
// email and shows a thank-you, but does not yet POST anywhere.
const { useState } = React;

function CommunitySection() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const submit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Ingresa un correo válido.');
      return;
    }
    setError('');
    setDone(true);
    // TODO: conectar a Formspree/Mailchimp para guardar el correo de verdad.
  };

  return (
    <section id="Comunidad" style={{ background: 'var(--forest)', color: 'var(--moon)', padding: 'clamp(64px, 10vw, 120px) 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(242,232,200,0.7)' }}>
          La comunidad
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(2rem, 1.4rem + 2.6vw, 3.2rem)', lineHeight: 1.1, margin: '14px 0 14px' }}>
          Sé parte de Holistic.
        </h2>
        <p style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.05rem, 0.95rem + 0.6vw, 1.4rem)', color: 'rgba(242,232,200,0.85)', margin: '0 auto 32px', maxWidth: 480, lineHeight: 1.5 }}>
          Historias del bosque, fechas especiales y tarifas antes que nadie. Sin spam, lo prometemos.
        </p>

        {done ? (
          <div role="status" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-body)', fontSize: 16,
            background: 'rgba(242,232,200,0.12)', border: '1px solid rgba(242,232,200,0.3)',
            borderRadius: 999, padding: '14px 24px', color: 'var(--moon)',
          }}>
            <span aria-hidden style={{ color: 'var(--sage)' }}>✓</span>
            ¡Gracias! Ya eres parte de la comunidad.
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="community-form" style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'flex-end', flexWrap: 'wrap', maxWidth: 440, margin: '0 auto' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              aria-label="Tu correo electrónico"
              aria-invalid={!!error}
              className="community-input"
              style={{
                flex: '1 1 220px',
                fontFamily: 'var(--font-body)', fontSize: 16,
                padding: '10px 2px', borderRadius: 0,
                border: 'none',
                borderBottom: error ? '1px solid #E5897A' : '1px solid rgba(242,232,200,0.4)',
                background: 'transparent', color: 'var(--moon)',
                outline: 'none',
              }}
            />
            <button type="submit" className="community-submit" style={{
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, letterSpacing: '0.06em',
              padding: '10px 2px', border: 'none', cursor: 'pointer',
              background: 'transparent', color: 'var(--moon)',
              borderBottom: '1px solid rgba(242,232,200,0.4)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'border-color 200ms, gap 200ms',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.gap = '12px'; }}
              onMouseLeave={(e) => { e.currentTarget.style.gap = '8px'; }}
            >Unirme <span aria-hidden style={{ fontFamily: 'var(--font-display)' }}>→</span></button>
          </form>
        )}
        {error ? (
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#F0B3A8', marginTop: 12 }}>{error}</div>
        ) : null}
      </div>
      <style>{`
        .community-form input::placeholder { color: rgba(242,232,200,0.45); }
        .community-input:focus { border-bottom-color: var(--moon) !important; }
        .community-submit:hover { border-bottom-color: var(--moon) !important; }
      `}</style>
    </section>
  );
}
window.CommunitySection = CommunitySection;
