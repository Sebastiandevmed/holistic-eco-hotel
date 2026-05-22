/* global React, SectionHeading, Button */
const { useEffect, useRef, useState } = React;

function PoolMasonry() {
  const photos = [
    { src: 'Pool.jpg',   cls: 'big',  cap: 'La piscina principal' },
    { src: 'Pool2.jpg',  cls: 'sm' },
    { src: 'Pool3.jpg',  cls: 'sm' },
    { src: 'RoomOut.jpg', cls: 'sm' },
    { src: 'Pool4.jpg',  cls: 'tall', cap: 'Atardecer junto al agua' },
    { src: 'Pool5.jpg',  cls: 'sm' },
    { src: 'Pool6.jpg',  cls: 'wide' },
    { src: 'RoomOut2.jpg', cls: 'sm' },
    { src: 'Pool7.jpg',  cls: 'sm' },
    { src: 'Pool8.jpg',  cls: 'wide' },
    { src: 'RoomOut3.jpg', cls: 'sm' },
  ];

  return (
    <section style={{ background: 'var(--linen)', padding: 'clamp(64px, 10vw, 128px) 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto 56px' }}>
        <SectionHeading
          eyebrow="03 · Piscina & exteriores"
          title="Agua, sombra, silencio."
          lead="Una piscina en forma de gota, hamacas, y dos cocinas frente al río."
        />
      </div>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: '180px',
        gap: 16,
      }} className="pool-grid">
        {photos.map((p, i) => {
          const span = p.cls === 'big' ? { gridColumn: 'span 2', gridRow: 'span 2' }
            : p.cls === 'tall' ? { gridRow: 'span 2' }
            : p.cls === 'wide' ? { gridColumn: 'span 2' }
            : {};
          return (
            <figure key={i} style={{
              ...span,
              margin: 0,
              borderRadius: 14,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'var(--shadow-1)',
              transition: 'transform 380ms var(--ease-organic), box-shadow 380ms, z-index 0s 380ms',
              cursor: 'zoom-in',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = 'var(--shadow-3)'; e.currentTarget.style.zIndex = 5; e.currentTarget.style.transition = 'transform 380ms var(--ease-organic), box-shadow 380ms'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-1)'; e.currentTarget.style.zIndex = ''; }}
            >
              <img src={'../../assets/' + p.src} alt={p.cap || ''} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: p.cls === 'big' ? 'kenBurns 18s var(--ease-drift) infinite alternate' : 'none' }} />
              {p.cap ? (
                <figcaption style={{ position: 'absolute', left: 18, bottom: 16, color: '#fff', fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontWeight: 300, fontSize: 22, textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>{p.cap}</figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1) translate(0,0) }
          100% { transform: scale(1.08) translate(-2%, -1%) }
        }
        @media (max-width: 720px) {
          .pool-grid { grid-template-columns: 1fr 1fr !important; }
          .pool-grid > * { grid-column: auto !important; grid-row: auto !important; }
        }
      `}</style>
    </section>
  );
}

function VillasSection() {
  const villas = [
    { img: 'Villages.jpg',  name: 'Villa Ceiba',     desc: 'Dos habitaciones, terraza con hamaca, vista al río.' },
    { img: 'Villages2.jpg', name: 'Villa Iguá',      desc: 'Una recámara, jacuzzi privado bajo palapa.' },
    { img: 'Villages3.jpg', name: 'Villa Almendro',  desc: 'Familiar — tres habitaciones, cocina equipada.' },
    { img: 'Villages4.jpg', name: 'Villa Yarumo',    desc: 'Romántica, una cama king, ducha al aire libre.' },
    { img: 'Villages5.jpg', name: 'Villa Guayacán',  desc: 'Suite del fundador — vista panorámica al valle.' },
  ];
  const [active, setActive] = useState(0);
  const scrollerRef = useRef(null);

  const onTilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg) translateY(-6px)`;
  };
  const offTilt = (e) => { e.currentTarget.style.transform = ''; };

  return (
    <section id="Villas" style={{
      background: 'var(--bg-muted)',
      padding: 'clamp(64px, 10vw, 128px) 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(../../assets/${villas[active].img})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(50px) brightness(0.5) saturate(0.7)',
        opacity: 0.45,
        transition: 'background-image 1200ms var(--ease-drift)',
      }} />
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 24px 40px' }}>
        <SectionHeading
          eyebrow="04 · Villas"
          title="Cinco villas, cinco maneras de desaparecer."
          lead="Para escapadas largas o reuniones de familia, una villa privada en medio de la selva."
          dark
        />
      </div>
      <div
        ref={scrollerRef}
        style={{
          display: 'flex', gap: 20,
          overflowX: 'auto',
          padding: '24px 24px 32px',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          position: 'relative',
        }}
        onScroll={(e) => {
          const w = e.currentTarget.clientWidth;
          setActive(Math.min(villas.length - 1, Math.max(0, Math.round(e.currentTarget.scrollLeft / (w * 0.7)))));
        }}
      >
        {villas.map((v, i) => (
          <article key={v.name} style={{
            flex: '0 0 auto', width: 'min(78vw, 460px)',
            scrollSnapAlign: 'center',
            borderRadius: 22,
            overflow: 'hidden',
            background: '#fff',
            boxShadow: 'var(--shadow-3)',
            transition: 'transform 400ms var(--ease-organic), box-shadow 400ms',
            transformStyle: 'preserve-3d',
            cursor: 'pointer',
          }}
          onMouseMove={onTilt}
          onMouseLeave={offTilt}
          >
            <div style={{ aspectRatio: '4 / 5', position: 'relative' }}>
              <img src={'../../assets/' + v.img} alt={v.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: '70%', background: 'linear-gradient(to top, rgba(0,0,0,0.75) 10%, transparent 70%)' }} />
              <div style={{ position: 'absolute', left: 22, right: 22, bottom: 22, color: '#fff' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.85, fontWeight: 600 }}>0{i + 1} · Villa</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 32, margin: '6px 0 8px' }}>{v.name}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)', margin: 0, maxWidth: 320 }}>{v.desc}</p>
                <button style={{
                  marginTop: 16, padding: '10px 18px',
                  background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.5)',
                  borderRadius: 999, fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
                  letterSpacing: '0.06em', cursor: 'pointer',
                  transition: 'all 280ms var(--ease-organic)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--ink)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
                >Más info →</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {/* Dots */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: 8, marginTop: 18 }}>
        {villas.map((_, i) => (
          <span key={i} style={{
            width: i === active ? 28 : 8, height: 4, borderRadius: 999,
            background: i === active ? 'var(--moon)' : 'rgba(242,232,200,0.35)',
            transition: 'all 320ms var(--ease-organic)',
          }} />
        ))}
      </div>
    </section>
  );
}

window.PoolMasonry = PoolMasonry;
window.VillasSection = VillasSection;
