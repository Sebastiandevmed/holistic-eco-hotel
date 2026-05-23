/* global React, ParallaxBackdrop, Reveal */
// "Lo último de Holistic" — a horizontal, drag-and-scroll carousel of the
// hotel's social posts. Front-end only: posts are local sample content built
// from the available photography. Cards are frosted glass over a parallax
// backdrop, so it reads in both day and night.
const { useRef } = React;

const POSTS = [
  { img: 'Pool.jpg',     caption: 'Amanece sobre la piscina principal. ☀️', date: 'hace 2 días',    likes: 248 },
  { img: 'Room5.jpg',    caption: 'Café en la cama, con la selva de testigo.', date: 'hace 5 días',  likes: 312 },
  { img: 'Bar.jpg',      caption: 'Noches de mezcal y palo santo en el bar.',  date: 'hace 1 semana', likes: 189 },
  { img: 'Villages3.jpg',caption: 'Tu cabaña entre los árboles te espera.',    date: 'hace 1 semana', likes: 274 },
  { img: 'Pool4.jpg',    caption: 'El atardecer pinta el agua de oro.',        date: 'hace 2 semanas',likes: 401 },
  { img: 'RoomOut2.jpg', caption: 'Despertar sin alarma, solo el río.',        date: 'hace 3 semanas',likes: 156 },
  { img: 'HeroNight.jpg',caption: 'Cuando cae el sol, todo cambia de tono. 🌙', date: 'hace 1 mes',   likes: 358 },
];

const INSTAGRAM_URL = 'https://instagram.com/holistic.ecohotel';

function PublicationsSection() {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const scrollByCards = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const step = card ? card.offsetWidth + 18 : 320;
    el.scrollBy({ left: dir * step * 1.2, behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture?.(e.pointerId);
    el.style.cursor = 'grabbing';
    el.style.scrollSnapType = 'none';
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = (e) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    drag.current.active = false;
    el.releasePointerCapture?.(e.pointerId);
    el.style.cursor = 'grab';
    el.style.scrollSnapType = 'x mandatory';
  };

  return (
    <section id="Publicaciones" style={{
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(64px, 10vw, 128px) 0',
    }}>
      <ParallaxBackdrop image="../../assets/Pool8.jpg" strength={10} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 24px 36px' }}>
        <Reveal style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600 }}>
              Síguenos · <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)', textDecoration: 'none' }}>@holistic.ecohotel</a>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(2.2rem, 1.5rem + 2.8vw, 3.6rem)', lineHeight: 1.05, letterSpacing: '-0.004em', margin: '12px 0 0', color: 'var(--fg)' }}>
              Lo último de Holistic.
            </h2>
            <p style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.05rem, 0.95rem + 0.6vw, 1.4rem)', color: 'var(--fg-muted)', margin: '10px 0 0', maxWidth: '48ch' }}>
              Historias del bosque, día a día. Arrastra para ver más.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[-1, 1].map((dir) => (
              <button key={dir} aria-label={dir < 0 ? 'Anterior' : 'Siguiente'} onClick={() => scrollByCards(dir)} style={{
                width: 46, height: 46, borderRadius: 999, cursor: 'pointer',
                background: 'var(--glass-bg)', WebkitBackdropFilter: 'var(--glass-blur)', backdropFilter: 'var(--glass-blur)',
                border: '1px solid var(--glass-border)', color: 'var(--fg)',
                fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 200ms var(--ease-organic)',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
              >{dir < 0 ? '←' : '→'}</button>
            ))}
          </div>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        className="pub-track"
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', gap: 18,
          overflowX: 'auto', scrollSnapType: 'x mandatory',
          padding: '6px max(24px, calc((100vw - 1280px) / 2 + 24px)) 8px',
          cursor: 'grab', scrollbarWidth: 'none',
        }}
      >
        {POSTS.map((p, i) => (
          <Reveal key={p.img} data-card delay={Math.min(i * 0.08, 0.4)} style={{
            flex: '0 0 auto', width: 'clamp(248px, 78vw, 300px)', scrollSnapAlign: 'start',
          }}>
            <article style={{
              background: 'var(--glass-bg)', WebkitBackdropFilter: 'var(--glass-blur)', backdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
              boxShadow: 'var(--shadow-2)', height: '100%',
            }}>
              <div style={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden' }}>
                <img src={'../../assets/' + p.img} alt={p.caption} loading="lazy" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }} />
                <span style={{
                  position: 'absolute', top: 12, left: 12,
                  fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.04em',
                  background: 'rgba(5,7,14,0.45)', color: '#F4ECCF', backdropFilter: 'blur(6px)',
                  padding: '5px 10px', borderRadius: 999,
                }}>{p.date}</span>
              </div>
              <div style={{ padding: '16px 18px 18px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.5, color: 'var(--fg)', margin: '0 0 12px' }}>{p.caption}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span aria-hidden style={{ color: 'var(--danger, #C97B5C)' }}>♥</span>{p.likes}
                  </span>
                  <span>@holistic.ecohotel</span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <style>{`
        .pub-track::-webkit-scrollbar { display: none; }
        .pub-track img { user-select: none; -webkit-user-drag: none; }
      `}</style>
    </section>
  );
}
window.PublicationsSection = PublicationsSection;
