/* global React */
// Shared shell helpers for the multi-page site:
//  - useTimeMode(): day/night mode driven by ?mode=… or the current hour
//  - ModeSwitch:    floating day/night toggle (ships its own CSS)
//  - PageHero:      slim header band used at the top of each subpage
const { useState, useEffect } = React;

function getInitialMode() {
  const params = new URLSearchParams(location.search);
  const forced = params.get('mode'); // 'day' | 'night' | null
  if (forced === 'day' || forced === 'night') return forced;
  const h = new Date().getHours();
  return (h >= 18 || h < 6) ? 'night' : 'day';
}

// Keeps <html data-time-mode> in sync so the design-system tokens flip.
function useTimeMode() {
  const [mode, setMode] = useState(getInitialMode);
  useEffect(() => {
    document.documentElement.dataset.timeMode = mode;
  }, [mode]);
  return [mode, setMode];
}

function ModeSwitch({ mode, setMode, onReplaySplash }) {
  const SunIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
  const MoonIcon = (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
  return (
    <div className="modeSwitch" role="group" aria-label="Cambiar modo día / noche">
      <button type="button" aria-label="Modo día" aria-pressed={mode === 'day'} className={mode === 'day' ? 'on' : ''} onClick={() => setMode('day')}>{SunIcon}</button>
      <button type="button" aria-label="Modo noche" aria-pressed={mode === 'night'} className={mode === 'night' ? 'on' : ''} onClick={() => setMode('night')}>{MoonIcon}</button>
      {onReplaySplash ? (
        <button type="button" className="splash" title="Repetir intro" aria-label="Repetir intro" onClick={onReplaySplash}>↻</button>
      ) : null}
      <style>{`
        .modeSwitch {
          position: fixed; bottom: 22px; left: 22px; z-index: 100;
          background: rgba(5,7,14,0.82);
          padding: 4px; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 2px;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(242,232,200,0.2);
        }
        .modeSwitch button {
          appearance: none; background: transparent; border: none; cursor: pointer;
          color: var(--moon); opacity: 0.5;
          width: 30px; height: 30px; padding: 0; border-radius: 999px;
          display: inline-flex; align-items: center; justify-content: center;
          transition: opacity 200ms, background 200ms, color 200ms;
        }
        .modeSwitch button:hover { opacity: 1; }
        .modeSwitch button.on { background: var(--moon); color: var(--midnight); opacity: 1; }
        .modeSwitch button.splash { font-family: var(--font-mono); font-size: 15px; }
      `}</style>
    </div>
  );
}

// Slim hero band for subpages: full-bleed image, overlay, eyebrow + title + lead.
function PageHero({ eyebrow, title, lead, image, mode = 'day' }) {
  return (
    <header style={{
      position: 'relative',
      minHeight: '52vh',
      display: 'flex', alignItems: 'flex-end',
      padding: '120px 24px 56px',
      overflow: 'hidden',
      background: '#1a1410',
      color: '#fff',
    }}>
      <img src={image} alt="" aria-hidden style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        animation: 'pageHeroZoom 22s var(--ease-drift) infinite alternate',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.72) 100%)' }} />
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
          {eyebrow}
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: 'clamp(2.6rem, 1.8rem + 4vw, 5rem)',
          lineHeight: 1.02, letterSpacing: '-0.006em',
          margin: '14px 0 0', maxWidth: 16 + 'ch', textShadow: '0 2px 28px rgba(0,0,0,0.5)',
        }}>{title}</h1>
        {lead ? (
          <p style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.1rem, 0.95rem + 0.7vw, 1.5rem)', color: 'rgba(255,255,255,0.9)', margin: '16px 0 0', maxWidth: 540, textShadow: '0 1px 16px rgba(0,0,0,0.5)' }}>{lead}</p>
        ) : null}
      </div>
      <style>{`
        @keyframes pageHeroZoom { 0% { transform: scale(1) } 100% { transform: scale(1.07) } }
      `}</style>
    </header>
  );
}

window.useTimeMode = useTimeMode;
window.ModeSwitch = ModeSwitch;
window.PageHero = PageHero;
