/* global React */
const { useEffect, useState } = React;

/* ============================================================================
   SplashIntro — cinematic opening sequence.

   Plays once per browser session (gated by sessionStorage). Click anywhere to
   skip. Total runtime ~3.0s:

     0.0s  black scrim covers everything; hero video already playing behind
     0.3s  top hairline draws from center outward
     0.5s  HOLISTIC letters fade-rise from below, staggered every 110ms
     1.6s  "Eco · Hotel" tag fades in
     1.9s  bottom hairline draws
     2.4s  whole splash fades + scales up slightly, hero takes over
     3.0s  splash unmounts entirely
============================================================================ */

function SplashIntro({ onDone, mode = 'day' }) {
  const [phase, setPhase] = useState('intro'); // intro → show → outro → gone

  useEffect(() => {
    if (sessionStorage.getItem('holistic-splash-seen') === '1') {
      onDone();
      return;
    }
    const t1 = setTimeout(() => setPhase('show'), 60);
    const t2 = setTimeout(() => setPhase('outro'), 2400);
    const t3 = setTimeout(() => {
      sessionStorage.setItem('holistic-splash-seen', '1');
      onDone();
    }, 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const skip = () => {
    sessionStorage.setItem('holistic-splash-seen', '1');
    setPhase('outro');
    setTimeout(onDone, 800);
  };

  const isNight = mode === 'night';
  const showing = phase === 'show';
  const outro = phase === 'outro';

  return (
    <div
      onClick={skip}
      role="presentation"
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: isNight ? 'var(--midnight)' : '#0d0a06',
        opacity: outro ? 0 : 1,
        transform: outro ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 900ms var(--ease-organic), transform 1100ms var(--ease-organic)',
        pointerEvents: outro ? 'none' : 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Layer 1 — same hero video, heavily darkened, slow zoom */}
      <video autoPlay muted loop playsInline style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover',
        opacity: 0.55,
        filter: isNight
          ? 'brightness(0.4) hue-rotate(202deg) saturate(0.7)'
          : 'brightness(0.65) saturate(0.95)',
        transform: outro ? 'scale(1.08)' : 'scale(1.02)',
        transition: 'transform 3200ms var(--ease-drift)',
      }}>
        <source src="../../assets/HolisticVideoHero.mp4" type="video/mp4" />
      </video>

      {/* Layer 2 — vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.85) 100%)',
      }} />

      {/* Night flecks */}
      {isNight && (
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {[18, 36, 58, 74, 88, 12, 46, 66].map((x, i) => (
            <span key={i} style={{
              position: 'absolute', left: x + '%', top: (20 + (i * 13) % 60) + '%',
              width: 2, height: 2, borderRadius: '50%',
              background: 'var(--moon)',
              boxShadow: '0 0 12px rgba(242,232,200,0.7)',
              opacity: 0.45 + (i % 3) * 0.18,
              animation: `splashFlicker ${3 + (i % 4)}s ease-in-out ${i * 0.3}s infinite alternate`,
            }} />
          ))}
        </div>
      )}

      {/* Center stage */}
      <div style={{
        position: 'relative',
        textAlign: 'center',
        color: isNight ? 'var(--moon)' : 'var(--bone)',
      }}>
        {/* Top hairline */}
        <div style={{
          width: 100, height: 1,
          background: 'currentColor', opacity: 0.55,
          margin: '0 auto 36px',
          transform: showing || outro ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'center',
          transition: 'transform 1100ms var(--ease-organic) 250ms',
        }} />

        {/* HOLISTIC */}
        <h1 style={{
          fontFamily: 'var(--font-brand)', fontWeight: 400,
          fontSize: 'clamp(3.5rem, 2.4rem + 5.5vw, 8.5rem)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          margin: 0, lineHeight: 1,
          color: 'inherit',
          textShadow: isNight
            ? '0 0 40px rgba(242,232,200,0.35), 0 0 90px rgba(80,110,180,0.4)'
            : '0 6px 60px rgba(0,0,0,0.55)',
        }}>
          {'HOLISTIC'.split('').map((c, i) => (
            <span key={i} style={{
              display: 'inline-block',
              opacity: showing || outro ? 1 : 0,
              transform: showing || outro ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.92)',
              filter: showing || outro ? 'blur(0)' : 'blur(6px)',
              transition: `opacity 900ms var(--ease-organic) ${500 + i * 110}ms,
                           transform 1000ms var(--ease-organic) ${500 + i * 110}ms,
                           filter 700ms var(--ease-organic) ${500 + i * 110}ms`,
            }}>{c}</span>
          ))}
        </h1>

        {/* Eco · Hotel tag */}
        <div style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'clamp(10px, 0.4vw + 8px, 13px)',
          letterSpacing: '0.55em',
          textTransform: 'uppercase',
          marginTop: 26,
          opacity: showing || outro ? 0.78 : 0,
          transform: showing || outro ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 900ms var(--ease-organic) 1500ms, transform 900ms var(--ease-organic) 1500ms',
        }}>Eco · Hotel</div>

        {/* Bottom hairline */}
        <div style={{
          width: 100, height: 1,
          background: 'currentColor', opacity: 0.55,
          margin: '36px auto 0',
          transform: showing || outro ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'center',
          transition: 'transform 1100ms var(--ease-organic) 1800ms',
        }} />
      </div>

      {/* "Toca para entrar" footer prompt */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        color: isNight ? 'var(--moon)' : 'var(--bone)',
        opacity: showing && !outro ? 0.4 : 0,
        transition: 'opacity 900ms var(--ease-organic) 2000ms',
        fontFamily: 'var(--font-body)', fontWeight: 500,
        fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase',
        animation: 'splashBlink 2200ms ease-in-out 2.4s infinite',
      }}>Toca para entrar</div>

      <style>{`
        @keyframes splashFlicker {
          0% { opacity: 0.25 } 100% { opacity: 0.8 }
        }
        @keyframes splashBlink {
          0%, 100% { opacity: 0.4 }
          50% { opacity: 0.18 }
        }
      `}</style>
    </div>
  );
}
window.SplashIntro = SplashIntro;
