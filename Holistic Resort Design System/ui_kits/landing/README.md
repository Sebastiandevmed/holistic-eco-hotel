# Landing page UI kit

Hi-fi recreation of the Holistic Eco·Hotel marketing landing page. Built as a single static HTML file plus modular React (Babel) JSX components — no build step required, runs anywhere.

## What's in here

| File | Role |
|---|---|
| `index.html` | Mounts the full page. Loads React 18 + Babel from CDN, includes `colors_and_type.css`, and renders the JSX components in narrative order. |
| `primitives.jsx` | `Eyebrow`, `SectionHeading`, `Button`, `ReserveButton`, `TimeBadge`, `IconLucide` — shared atoms. |
| `SplashIntro.jsx` | ~3s cinematic intro — darkened hero video + Italiana "HOLISTIC" wordmark fade-rises letter-by-letter, framed by two hairlines. Plays once per session (sessionStorage gate), skip on click. Use `?splash=replay` to force-replay. |
| `Navbar.jsx` | Fixed translucent navbar that turns opaque on scroll. Centered wordmark, hamburger left, Reserve CTA right. |
| `HeroSection.jsx` | Day/night hero with a continuously-floating Italiana "HOLISTIC" title (each letter has its own slow oscillation). Reads `hours >= 18` on mount; `?mode=day\|night` overrides for review. |
| `WelcomeSection.jsx` | Drone + nature 3-image grid with the philosophy text. |
| `TheCabin.jsx` | The single accommodation type ("La cabaña"). All cabins are identical, so this shows one feature image + a gallery of the same cabin from many angles + one spec card. Replaces the old per-unit rooms/villas sections. |
| `PoolAndVillas.jsx` | `PoolMasonry` — the "Zonas comunes" (shared common areas): pool, river and outdoor kitchens in a masonry grid. |
| `LobbyBeforeAfter.jsx` | Drag-to-compare before/after slider for the lobby. |
| `BarSection.jsx` | Full-bleed parallax bar section. |
| `CtaSection.jsx` | Final conversion section with two buttons. |
| `Footer.jsx` | Minimalist footer with logo, address, social, LobbyPMS credit. |

## Cut corners (this is a UI kit, not production code)

- **No Lenis / GSAP / Framer Motion**. We approximate the feel with CSS transitions and a small amount of vanilla JS (parallax & scroll-detection). The brief's true Next.js codebase will swap these in.
- **No Supabase**. The few dynamic values (LobbyPMS URL, hero copy, hotel address) are hard-coded.
- **No `next/image`**. Plain `<img>` with lazy loading.
- **No real video poster transition**. The hero shows the video if available, otherwise the poster image.
- The day/night detection is real (`new Date().getHours()`), but we expose a `?mode=day|night` query override so reviewers can see both states without waiting until 6pm.

## What is faithful

- All photography, all section ordering, all CTA copy, the day/night narrative, the time badge, the welcome grid, the horizontal rooms scroll, the villa carousel, the lobby before/after, the bar parallax, and the final CTA — exactly as specified in the brief.
- Every color, font, radius and shadow comes from `../../colors_and_type.css`.
- The reserve button points at `https://holistic.lobbypms.com` (placeholder for the Supabase-managed real URL).
