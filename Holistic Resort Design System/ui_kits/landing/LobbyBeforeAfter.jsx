/* global React, SectionHeading */
const { useEffect, useRef, useState } = React;

function LobbyBeforeAfter() {
  const [pos, setPos] = useState(0.5);
  const ref = useRef(null);
  const dragging = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      setPos(Math.max(0, Math.min(1, x / r.width)));
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <section style={{ background: 'var(--bone)', padding: 'clamp(64px, 10vw, 128px) 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto 48px' }}>
        <SectionHeading
          eyebrow="04 · Lobby & recepción"
          title="Dos lobbies. Un solo gesto."
          lead="Una recepción que es también sala de estar. Arrastra para ver el detalle del interiorismo."
        />
      </div>
      <div
        ref={ref}
        style={{
          maxWidth: 1280, margin: '0 auto',
          position: 'relative',
          aspectRatio: '16 / 9',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-3)',
          userSelect: 'none',
          touchAction: 'none',
        }}
        onMouseDown={(e) => { dragging.current = true; const r = ref.current.getBoundingClientRect(); setPos(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))); }}
        onTouchStart={(e) => { dragging.current = true; }}
      >
        <img src="../../assets/LobbyRes.jpg" alt="Lobby — lado A" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <img src="../../assets/LobbyRes2.jpg" alt="Lobby — lado B" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          clipPath: `inset(0 0 0 ${pos * 100}%)`,
        }} />

        {/* Handle */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: (pos * 100) + '%', width: 2, background: '#fff', boxShadow: '0 0 24px rgba(0,0,0,0.5)', transform: 'translateX(-1px)', cursor: 'ew-resize' }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 54, height: 54, borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)', boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink)', cursor: 'ew-resize',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M9 5l-5 7 5 7M15 5l5 7-5 7" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span style={{ position: 'absolute', top: 18, left: 22, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>Lobby — recepción</span>
        <span style={{ position: 'absolute', top: 18, right: 22, fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>Lobby — salón</span>
      </div>

      {/* Thumb with reflection */}
      <div style={{ maxWidth: 1280, margin: '24px auto 0', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ position: 'relative', width: 220 }}>
          <img src="../../assets/LobbyRes3.jpg" alt="Lobby vista 3" style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 12, display: 'block' }} />
          <img src="../../assets/LobbyRes3.jpg" alt="" aria-hidden style={{ width: '100%', height: 60, objectFit: 'cover', objectPosition: 'bottom', transform: 'scaleY(-1)', borderRadius: '0 0 12px 12px', opacity: 0.25, marginTop: -2, maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }} />
        </div>
      </div>
    </section>
  );
}
window.LobbyBeforeAfter = LobbyBeforeAfter;
