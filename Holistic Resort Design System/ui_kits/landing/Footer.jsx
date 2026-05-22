/* global React */
function Footer() {
  return (
    <footer style={{
      background: 'var(--midnight)',
      color: 'var(--silver)',
      padding: '96px 24px 44px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ height: 1, background: 'rgba(212,220,235,0.16)', marginBottom: 56 }} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
          gap: 40,
          fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.65,
        }} className="footer-grid">
          <div>
            <div style={{
              fontFamily: 'var(--font-brand)', fontWeight: 400,
              fontSize: 24, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--moon)',
            }}>Holistic</div>
            <div style={{ fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', marginTop: 6, opacity: 0.6 }}>Eco · Hotel</div>
            <p style={{ margin: '24px 0 0', opacity: 0.7, maxWidth: 280 }}>Cinco hectáreas en medio de la selva. Un lugar para no hacer nada — bien.</p>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, opacity: 0.6, marginBottom: 14 }}>Visítanos</div>
            <div style={{ opacity: 0.85 }}>Vereda La Esperanza<br />Mariquita, Tolima<br />Colombia</div>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, opacity: 0.6, marginBottom: 14 }}>Contacto</div>
            <div style={{ opacity: 0.85 }}>
              <a href="tel:+5713000000" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>+57 (1) 300 000 0000</a>
              <a href="mailto:reservas@holistic.com" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>reservas@holistic.com</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, opacity: 0.6, marginBottom: 14 }}>Síguenos</div>
            <div style={{ display: 'flex', gap: 18, opacity: 0.85 }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Facebook</a>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(212,220,235,0.12)',
          fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.55, letterSpacing: '0.05em',
        }} className="footer-bottom">
          <div>© 2026 Holistic Eco · Hotel — todos los derechos reservados.</div>
          <div>Powered by <a href="https://lobbypms.com" style={{ color: 'inherit' }}>LobbyPMS</a></div>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-bottom { flex-direction: column; gap: 10px; }
        }
      `}</style>
    </footer>
  );
}
window.Footer = Footer;
