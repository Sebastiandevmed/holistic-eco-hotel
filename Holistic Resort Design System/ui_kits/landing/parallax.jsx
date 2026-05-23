/* global React, gsap, ScrollTrigger */
// GSAP-powered helpers shared across the site:
//   - ParallaxBackdrop: full-bleed photo that drifts on scroll, behind a
//     theme-aware readability scrim. Drop it as the first child of any section
//     that should no longer be a flat colour; give the section position:relative
//     + overflow:hidden, and lift the real content with position:relative/zIndex.
//   - Reveal: fades + lifts its children in once they enter the viewport.
// Both degrade gracefully: if the GSAP CDN fails to load, backdrops render as
// static images and Reveal content stays fully visible.
const { useRef, useEffect } = React;

const HAS_GSAP = typeof window !== 'undefined' && window.gsap;
if (HAS_GSAP && window.ScrollTrigger) {
  window.gsap.registerPlugin(window.ScrollTrigger);
  // Photos load after first paint and shift layout; recompute trigger
  // positions once everything is in so parallax/reveals line up.
  window.addEventListener('load', () => window.ScrollTrigger.refresh());
}

function ParallaxBackdrop({ image, scrim = 'var(--section-scrim)', strength = 12 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !ref.current) return;
    const el = ref.current;
    const tween = window.gsap.fromTo(
      el,
      { yPercent: -strength },
      {
        yPercent: strength,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [strength]);

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      <img
        ref={ref}
        src={image}
        alt=""
        loading="lazy"
        style={{
          position: 'absolute', inset: '-18% 0', width: '100%', height: '136%',
          objectFit: 'cover', willChange: 'transform',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: scrim }} />
    </div>
  );
}

function Reveal({ children, y = 30, delay = 0, duration = 0.9, as = 'div', style = {}, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.gsap) { el.style.opacity = 1; el.style.transform = 'none'; return; }
    if (!window.ScrollTrigger) {
      window.gsap.to(el, { opacity: 1, y: 0, duration, ease: 'power3.out', delay });
      return;
    }
    const tween = window.gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1, y: 0, duration, ease: 'power3.out', delay,
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      }
    );
    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  const Comp = as;
  // Start hidden only when GSAP is present so a failed CDN never hides content.
  const initialHidden = HAS_GSAP ? { opacity: 0 } : {};
  return <Comp ref={ref} style={{ ...initialHidden, ...style }} {...rest}>{children}</Comp>;
}

window.ParallaxBackdrop = ParallaxBackdrop;
window.Reveal = Reveal;
