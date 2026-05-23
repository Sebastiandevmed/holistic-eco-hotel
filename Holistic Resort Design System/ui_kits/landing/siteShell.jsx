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
  return (
    <div className="modeSwitch" role="group" aria-label="Cambiar modo">
      <span style={{ opacity: 0.55, marginRight: 4 }}>UI kit</span>
      <a href="?mode=day" className={mode === 'day' ? 'on' : ''} onClick={(e) => { e.preventDefault(); setMode('day'); }}>☀ día</a>
      <a href="?mode=night" className={mode === 'night' ? 'on' : ''} onClick={(e) => { e.preventDefault(); setMode('night'); }}>☾ noche</a>
      {onReplaySplash ? (
        <>
          <span style={{ opacity: 0.3, margin: '0 4px' }}>·</span>
          <a href="#" onClick={(e) => { e.preventDefault(); onReplaySplash(); }} title="Repetir intro">↻ splash</a>
        </>
      ) : null}
      <style>{`
        .modeSwitch {
          position: fixed; bottom: 22px; left: 22px; z-index: 100;
          background: rgba(5,7,14,0.82); color: var(--moon);
          font-family: var(--font-mono); font-size: 11px;
          padding: 8px 12px; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 8px;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(242,232,200,0.2);
        }
        .modeSwitch a { color: var(--moon); opacity: 0.55; text-decoration: none; padding: 2px 8px; border-radius: 999px; }
        .modeSwitch a.on { background: var(--moon); color: var(--midnight); opacity: 1; }
        .modeSwitch a:hover { opacity: 1; }
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
