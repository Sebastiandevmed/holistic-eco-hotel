/* global React, ReserveButton, Button, TimeBadge */
const { useEffect, useRef, useState } = React;

function HeroSection({ forceMode }) {
  const [mode, setMode] = useState(forceMode || 'day');
  const [scrolled, setScrolled] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    if (!forceMode) {
      const h = new Date().getHours();
      setMode(h >= 18 || h < 6 ? 'night' : 'day');
    }
  }, [forceMode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 140);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const r = heroRef.current?.getBoundingClientRect();
      if (!r) return;
      setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const isDay = mode === 'day';
  const config = isDay ? {
    poster: '../../assets/Hero.jpg',
    parallax: '../../assets/Hero2.jpg',
    title: 'Holistic',
    subtitle: 'Donde la naturaleza te abraza',
    overlay: 'linear-gradient(180deg, rgba(40,30,12,0.18) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)',
    radial: `radial-gradient(circle at ${50 + mouse.x * 12}% ${42 + mouse.y * 10}%, rgba(212,168,87,0.22), rgba(0,0,0,0) 55%)`,
    cta: { variant: 'primary', secondaryVariant: 'secondary' },
    titleColor: '#fff',
    sub: 'rgba(255,255,255,0.85)',
    indicator: 'var(--gold)',
  } : {
    poster: '../../assets/HeroNight.jpg',
    parallax: '../../assets/HeroNight2.jpg',
    title: 'Holistic',
    subtitle: 'La noche también es para soñar',
    overlay: 'linear-gradient(180deg, rgba(11,15,26,0.45) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.65) 100%)',
    radial: `radial-gradient(circle at ${50 + mouse.x * 12}% ${42 + mouse.y * 10}%, rgba(80,110,180,0.30), rgba(0,0,0,0) 55%)`,
    cta: { variant: 'nightFill', secondaryVariant: 'night' },
    titleColor: '#F2E8C8',
    sub: 'rgba(242,232,200,0.85)',
    indicator: 'var(--silver)',
  };

  const titleSpans = config.title.split('').map((c, i) => (
    <span key={i} style={{
      display: 'inline-block',
      animation: `holisticReveal 1100ms var(--ease-organic) ${280 + i * 110}ms both, holisticFloat ${4.6 + (i % 4) * 0.7}s ease-in-out ${-i * 0.35}s infinite alternate`,
      textShadow: isDay
        ? '0 6px 40px rgba(0,0,0,0.30), 0 1px 0 rgba(255,255,255,0.05)'
        : '0 0 36px rgba(212,220,235,0.55), 0 0 80px rgba(80,110,180,0.35)',
      transformOrigin: '50% 100%',
      willChange: 'transform, opacity',
    }}>{c === ' ' ? '\u00A0' : c}</span>
  ));

  return (
    <section ref={heroRef} style={{
      position: 'relative', height: '100vh', minHeight: 640,
      overflow: 'hidden',
      background: isDay ? '#1a1714' : '#05070d',
      color: config.titleColor,
    }}>
      {/* Layer 1 — parallax bg image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${config.parallax})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        transform: `scale(1.08) translate(${mouse.x * -10}px, ${mouse.y * -10}px)`,
        filter: isDay ? 'none' : 'brightness(0.62) hue-rotate(202deg) saturate(0.75)',
        transition: 'transform 900ms var(--ease-drift)',
      }} />

      {/* Layer 1.5 — video (autoplay) on top, fades up after */}
      <video
        autoPlay muted loop playsInline
        poster={config.poster}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          filter: isDay ? 'brightness(0.95)' : 'brightness(0.55) hue-rotate(202deg) saturate(0.78)',
          opacity: 1,
        }}>
        <source src="../../assets/HolisticVideoHero.mp4" type="video/mp4" />
      </video>

      {/* Layer 2 — gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: config.overlay, pointerEvents: 'none' }} />
      {/* Layer 2b — mouse-following radial */}
      <div style={{ position: 'absolute', inset: 0, background: config.radial, pointerEvents: 'none', mixBlendMode: 'screen' }} />

      {/* Night particles */}
      {!isDay && <NightParticles />}

      {/* Layer 3 — content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '0 24px', textAlign: 'center',
        transform: `translate(${mouse.x * 8}px, ${mouse.y * 6}px)`,
        transition: 'transform 400ms var(--ease-drift)',
      }}>
        <h1 className="hero-title" style={{
          fontFamily: 'var(--font-brand)', fontWeight: 400,
          fontSize: 'clamp(4.5rem, 2.4rem + 9vw, 11rem)',
          lineHeight: 0.92,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: config.titleColor,
          margin: 0,
          cursor: 'default',
        }}>{titleSpans}</h1>
        <p style={{
          fontFamily: 'var(--font-italic)', fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.25rem, 1rem + 1vw, 1.875rem)',
          color: config.sub,
          margin: '18px 0 40px',
          letterSpacing: '0.005em',
          textShadow: '0 1px 14px rgba(0,0,0,0.4)',
          animation: 'fadeUp 1000ms var(--ease-organic) 700ms both',
        }}>{config.subtitle}</p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 1000ms var(--ease-organic) 1000ms both' }}>
          <ReserveButton variant={config.cta.variant}>Reservar</ReserveButton>
          <Button variant={config.cta.secondaryVariant} href="#El lugar">Explorar el lugar</Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        color: config.indicator,
        fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
        animation: 'pulseDown 2400ms var(--ease-drift) infinite',
      }}>
        <span>Descubre más</span>
        <div style={{ width: 1, height: 36, background: 'currentColor', opacity: 1 }} />
      </div>

      <TimeBadge mode={mode} scrolled={scrolled} />

      <style>{`
        @keyframes holisticReveal {
          from {
            opacity: 1;
            transform: translateY(56px) scale(0.94);
            clip-path: inset(100% 0 0 0);
          }
          60% { opacity: 1 }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            clip-path: inset(0 0 0 0);
          }
        }
        @keyframes holisticFloat {
          0%   { transform: translateY(0)    rotate(0deg)    scale(1); }
          50%  { transform: translateY(-6px) rotate(-0.4deg) scale(1.012); }
          100% { transform: translateY(2px)  rotate(0.3deg)  scale(0.995); }
        }
        @keyframes fadeUp {
          from { opacity: 1; transform: translateY(18px) }
          to { opacity: 1; transform: translateY(0) }
        }
        @keyframes pulseDown {
          0%,100% { transform: translateX(-50%) translateY(0); opacity: 1 }
          50% { transform: translateX(-50%) translateY(6px); opacity: 1 }
        }
        /* Hover the title — letters lift a hair more, in unison */
        .hero-title:hover span {
          animation-play-state: paused;
          transform: translateY(-4px);
          transition: transform 380ms var(--ease-organic);
        }
      `}</style>
    </section>
  );
}

function NightParticles() {
  // Pre-computed seeds so they don't jump on rerender
  const seeds = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 28; i++) {
      arr.push({
        left: Math.random() * 100,
        top: Math.random() * 80,
        size: 1 + Math.random() * 2,
        dur: 6 + Math.random() * 10,
        delay: -Math.random() * 12,
        opacity: 1,
      });
    }
    return arr;
  }, []);
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
      {seeds.map((s, i) => (
        <span key={i} style={{
          position: 'absolute',
          left: s.left + '%', top: s.top + '%',
          width: s.size, height: s.size,
          borderRadius: '50%',
          background: 'var(--moon)',
          boxShadow: '0 0 6px rgba(242,232,200,0.55)',
          opacity: 1,
          animation: `drift ${s.dur}s linear ${s.delay}s infinite`,
        }} />
      ))}
      <style>{`
        @keyframes drift {
          from { transform: translateY(0) translateX(0) }
          to { transform: translateY(40px) translateX(20px) }
        }
      `}</style>
    </div>
  );
}

window.HeroSection = HeroSection;
