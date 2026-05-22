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
          <form onSubmit={submit} noValidate className="community-form" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              aria-label="Tu correo electrónico"
              aria-invalid={!!error}
              style={{
                flex: '1 1 280px', maxWidth: 360,
                fontFamily: 'var(--font-body)', fontSize: 15,
                padding: '14px 18px', borderRadius: 999,
                border: error ? '1px solid #E5897A' : '1px solid rgba(242,232,200,0.35)',
                background: 'rgba(255,255,255,0.06)', color: 'var(--moon)',
                outline: 'none',
              }}
            />
            <button type="submit" style={{
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, letterSpacing: '0.04em',
              padding: '14px 30px', borderRadius: 999, border: 'none', cursor: 'pointer',
              background: 'var(--moon)', color: 'var(--forest)',
              transition: 'transform 200ms var(--ease-organic), box-shadow 200ms',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(242,232,200,0.35)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >Unirme</button>
          </form>
        )}
        {error ? (
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#F0B3A8', marginTop: 12 }}>{error}</div>
        ) : null}
      </div>
      <style>{`
        .community-form input::placeholder { color: rgba(242,232,200,0.5); }
      `}</style>
    </section>
  );
}
window.CommunitySection = CommunitySection;
