# Holistic Eco·Hotel — Design System

A complete brand & UI system for **Holistic Eco·Hotel**, a luxury natural / ecotourism resort. The system supports an ultra-dynamic landing page (Next.js 15, Tailwind v4, GSAP, Framer Motion, Lenis, Supabase) whose hero swaps between a **day** and **night** mode based on the visitor's local hour.

---

## 1 · The brand at a glance

> Holistic is jungle palapas with macramé curtains. It's the candle reflected in the pool at 9pm. It's hand-thrown terracotta vessels and bleached teak. **The architecture defers; nature is the protagonist.**

| | |
|---|---|
| **Name** | Holistic Eco·Hotel |
| **Category** | Luxury ecotourism / wellness resort |
| **Target** | Wellness travelers, design-conscious couples, slow-travel seekers |
| **Voice** | Calm, sensorial, slightly poetic; never shouty |
| **Languages** | Primary Spanish (es-MX), secondary English |
| **Booking engine** | LobbyPMS (external, all "Reservar" CTAs deep-link out) |

### Visual DNA — extracted from the photography

- **Day**: cream plaster, sun-bleached straw umbrellas, deep jungle canopies, sage foliage, pool reflections in eucalyptus-green, sandy travertine.
- **Night**: moonless indigo treeline, votive amber against the pool, soft silver moonlight, candle-warm pinpoints in the palapas.
- **Materials seen on site**: thatched palapa roofs, macramé textile screens, raw teak posts, terracotta urns, hand-thrown pottery, woven rattan pendant lamps, white travertine.

---

## 2 · Source materials referenced

- **Brand brief** — supplied as `pasted_text` in the project (the full "Holistic Resort — Landing Page Ultra-Dinámica" spec including stack, sections, Supabase schema, hooks, animation strategy and a day/night hero contract).
- **Photography** — 36 photographs supplied via `uploads/` (hero, drone, lobby, rooms, exteriors, pool, villas, bar, two logo variants, hero video). All copied into `assets/`.
- **GitHub repo** — [`Sebastiandevmed/HolisticEcoHotel`](https://github.com/Sebastiandevmed/HolisticEcoHotel) (private, currently empty — no code commits at the time of this build). If the developer later pushes code, the README of that repo will be the canonical implementation reference; this design system is the design-side counterpart.

> **No Figma file was supplied.** All visual decisions are derived from the photography and the written brief. If a Figma is published later, re-run this system against it to lock components to the source of truth.

---

## 3 · Repository index

```
.
├── README.md                       ← you are here
├── SKILL.md                        ← agent-skill manifest (download to use as a Claude Skill)
├── colors_and_type.css             ← all tokens — colors, type, spacing, radii, shadows, motion
├── assets/                         ← logos, hero photography, room/pool/villa/bar imagery, hero video
│   ├── logo-mark.jpg               ← clean monogram + wordmark on white
│   ├── logo-wood.jpg               ← brand mockup on dark wood (use for context only)
│   ├── Hero.jpg / Hero2.jpg / DroneHero.jpg
│   ├── HeroNight.jpg / HeroNight2.jpg
│   ├── LobbyRes{,2,3}.jpg
│   ├── Room1.jpg … Room8.jpg
│   ├── RoomOut{,2,3}.jpg
│   ├── Pool.jpg … Pool8.jpg
│   ├── Villages.jpg … Villages5.jpg
│   ├── Bar.jpg
│   └── HolisticVideoHero.mp4
├── preview/                        ← Design System tab cards (one HTML per concept)
│   ├── palette-warm.html
│   ├── palette-botanical.html
│   ├── palette-night.html
│   ├── palette-semantic.html
│   ├── type-display.html
│   ├── type-body.html
│   ├── type-scale.html
│   ├── type-pairings.html
│   ├── spacing-radii.html
│   ├── shadows.html
│   ├── motion.html
│   ├── logo-system.html
│   ├── buttons.html
│   ├── form-inputs.html
│   ├── cards.html
│   ├── badges-tags.html
│   ├── imagery.html
│   ├── iconography.html
│   └── time-of-day.html
└── ui_kits/
    └── landing/
        ├── README.md
        ├── index.html              ← full-page hi-fi recreation of the landing page
        ├── Navbar.jsx
        ├── HeroSection.jsx
        ├── WelcomeSection.jsx
        ├── RoomsShowcase.jsx
        ├── VillasSection.jsx
        ├── LobbyBeforeAfter.jsx
        ├── BarSection.jsx
        ├── CtaSection.jsx
        ├── Footer.jsx
        └── primitives.jsx          ← Button, Eyebrow, SectionHeading, ReserveButton, TimeBadge
```

---

## 4 · Content fundamentals

### Voice
Holistic copy speaks like a friend who runs the place — warm, attentive, **never** corporate. It's written in **Spanish first** (Mexican / neutral Latin American), with English as a secondary localisation.

| Property | Choice |
|---|---|
| Address form | **Tú** (informal singular). Never *usted*. |
| Person | Second person ("**te** esperamos", "**te** abraza") — the guest is the subject |
| Casing | **Sentence case** in body. **Title case in Spanish** = first word + proper nouns only. |
| Headlines | Display headlines are short, lower-case fragments of poetry: *"Donde la naturaleza te abraza"* |
| Sentence length | Short. One image per sentence. Avoid clauses. |
| Emoji | **One only** — the time-badge `☀️` / `🌙`. Never anywhere else. |
| Punctuation | Em-dashes (`—`) over parentheses. Soft hyphen mid-dot (`·`) in the wordmark *only*. |
| Numbers | Spelled out under ten in body copy. Numeric in stats and prices. |

### Tone register
- ✅ *"Una pausa entre el verde."*
- ✅ *"Despierta con el canto del río."*
- ✅ *"Cinco villas. Cinco maneras de desaparecer."*
- ❌ ~"¡Reserva ahora y obtén un 20% OFF!"~ — never urgent, never percent-shouty
- ❌ ~"Welcome to Holistic Resort, the leading luxury wellness destination in..."~ — too corporate

### Standard copy blocks

| Block | Spanish (primary) | English (alt) |
|---|---|---|
| Hero subtitle (day) | *Donde la naturaleza te abraza* | *Where nature holds you close* |
| Hero subtitle (night) | *La noche también es para soñar* | *The night, too, is for dreaming* |
| Primary CTA | *Reservar* | *Book your stay* |
| Secondary CTA | *Explorar el lugar* | *Take a look around* |
| Time badge — day | *☀️ Bienvenido de día* | *☀️ Good afternoon* |
| Time badge — night | *🌙 Buenas noches* | *🌙 Good evening* |
| Final CTA | *Tu escape te espera* | *Your escape is waiting* |
| Footer credit | *Powered by LobbyPMS* | *Powered by LobbyPMS* |

---

## 5 · Visual foundations

### 5.1 Colour
Two palettes, one system. Light/day is the default; `data-theme="night"` flips semantic tokens for the night hero and the late-page night ambience section.

- **Warm neutrals** (foundation): `bone`, `linen`, `sand`, `clay`, `stone`, `ink`, `charcoal`. These do 80% of the work.
- **Botanical greens** (brand): `forest`, `moss`, `sage`, `eucalyptus`. `moss` is the brand green; never use generic Tailwind `green-500`.
- **Warm accents** (signal): `amber` (primary CTA in day mode), `gold` (metallic highlight), `terracotta` (alert / pop), `coral` (sunset secondary).
- **Night palette**: `midnight`, `indigo`, `twilight`, `silver`, `moon`. The night accent is `moon` — a candle-amber cream, **not** white.

Full token list lives in `colors_and_type.css`. Do not invent new colors — if you need a new role, alias an existing token.

### 5.2 Typography — three real brand fonts (self-hosted)

Three families with strict, intentional roles. **Never mix roles.**

| Role | Family | Weights | Used for |
|---|---|---|---|
| **Brand display** | **Italiana** | 400 only, no italic | The wordmark "Holistic" and the hero brand title. Nothing else. |
| **Headings + italic voice** | **Cormorant Garamond** | 300, 400, both with true italics | h1–h4, leads, pull quotes, `<em>` inside body. |
| **Body / UI** | **Raleway** | 300, 400, 500 | All body copy, navigation, buttons, captions, form labels, eyebrows. |

Font files are self-hosted under `fonts/` (loaded via `@font-face` in `colors_and_type.css`):

```
fonts/Italiana-Regular.woff2
fonts/CormorantGaramond-Light.woff2
fonts/CormorantGaramond-LightItalic.woff2
fonts/CormorantGaramond-Regular.woff2
fonts/CormorantGaramond-Italic.woff2
fonts/Raleway-Light.woff2
fonts/Raleway-Regular.woff2
fonts/Raleway-Medium.woff2
```

**Token usage:**

```css
var(--font-brand)    /* Italiana — wordmark + hero only */
var(--font-display)  /* Cormorant Garamond — headings */
var(--font-italic)   /* Cormorant Garamond — italic phrases (same family, intent-named) */
var(--font-body)     /* Raleway — everything else */
var(--font-mono)     /* system mono fallback (no brand mono) */
```

Headings sit at Cormorant **300 (light)** for h1–h2 and **400 (regular)** from h3 down. Lead paragraphs and pull-quotes use Cormorant **300 italic**. Body sits at Raleway **400** with line-height 1.65–1.7. The wordmark and the giant hero "Holistic" use Italiana **400** with tracking 0.18em (wordmark) or 0.04em (hero). **Never bold** — the system tops out at Raleway 500.

> No font substitutions remain — all three families are the client-provided brand assets.

### 5.3 Spacing & layout
- **8px base grid** (`--space-1` = 4, `--space-2` = 8 … `--space-10` = 128).
- Generous **section padding**: vertical 96–128px on desktop, 48–64px on mobile. Holistic is "rooms that breathe" — never crowd content.
- **Max content width**: 1280px for marketing, 760px for prose / single-column.
- Hero and bar sections are **edge-to-edge** (no max-width) so imagery is full-bleed.

### 5.4 Corner radii
- `xs` 4px — chips, tags
- `sm` 8px — inputs
- `md` 14px — cards, image frames (the default)
- `lg` 24px — feature cards, modal sheets
- `xl` 40px — hero image, large feature
- `pill` 999px — buttons, badges, the time-of-day indicator

**No sharp 0px corners** anywhere — the system always has a touch of softness, matching the rounded clay pottery.

### 5.5 Borders & shadows
- Borders are **never pure black**. Use `rgba(42,37,32,0.12)` (`--border`) on light; `rgba(212,220,235,0.10)` on night.
- Shadow system has 4 ramps (`--shadow-1` … `--shadow-4`) — warm, brown-tinted (`rgba(42,37,32,…)`) on light; pure black on dark. Plus two glow tokens (`--shadow-glow-day` warm amber, `--shadow-glow-night` cool silver) for the night hero CTAs.
- Cards default to `--shadow-2` resting → `--shadow-3` on hover (Y-translate −2px, 320ms `--ease-organic`).

### 5.6 Imagery
- **Always full-bleed or full-frame**, never floating in whitespace with a thin border.
- Default treatment is **untouched** — the photography is the brand. The only filter ever applied is the **night-mode hue-rotate fallback** (`brightness(0.6) hue-rotate(200deg) saturate(0.7)`) on the day video when the night video is unavailable.
- **Color vibe**: warm, slightly desaturated greens, naturalistic skin tones, never punchy. The night photography drifts cool/indigo but keeps amber pinpoints of light.
- Aspect ratios in use: 3:2 (1024×683 standard upload), 4:3 (drone shots), 16:9 (cinematic hero crop).
- Decorative effects: **ken-burns slow zoom** on the central pool photo, **clip-path reveal** on room cards, **scale on hover** (1.03, 800ms).

### 5.7 Motion & easing
- Primary easing: `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-organic`) — a deliberate slow exit. Used on hovers, modals, reveals.
- Secondary easing: `cubic-bezier(0.45, 0, 0.55, 1)` (`--ease-drift`) — symmetrical for parallax and ken burns.
- Durations: 180 / 320 / 600 / 1200 ms.
- **No bounces. No springs that overshoot.** This is a calm brand. Springs are reserved for the Framer Motion mobile menu *only*.
- Scroll feel: Lenis smooth-scroll with `lerp: 0.085` (Apple-like sedoso).

### 5.8 Hover, press, focus
| State | Treatment |
|---|---|
| **Hover** (button) | bg darkens to `--accent-hover`, slight `translateY(-1px)`, shadow elevates |
| **Hover** (image card) | scale 1.03, shadow `--shadow-3`, overlay reveals title — 320ms organic |
| **Hover** (link) | underline appears as `border-bottom` growing left→right (200ms) |
| **Press** | `scale(0.985)` for ~120ms — confident, not bouncy |
| **Focus** | 2px solid `--accent` outline at 2px offset — always visible, no `outline:none` |
| **Disabled** | 40% opacity, `cursor: not-allowed`, no hover state |

### 5.9 Transparency & blur
- The navbar uses **`backdrop-filter: blur(20px) saturate(160%)`** with a `rgba(246,241,231,0.72)` bone-tinted scrim in day mode and `rgba(11,15,26,0.65)` indigo at night. It **does not blur** when transparent at the top of the page — only after the user scrolls > 80px.
- Modal scrims use a soft `rgba(26,23,20,0.55)` with no blur — keeps the background photography legible behind.
- Image overlays for text legibility are **always linear vertical gradients** from `rgba(0,0,0,0)` at the top to `rgba(0,0,0,0.55)` at the bottom (or the reverse for top-anchored text).

### 5.10 Layout rules
- Navbar is **fixed**, full-width, 72px tall. Logo centered. Reserve CTA right-aligned, hamburger left.
- One **TimeBadge** in the bottom-right (`☀️ Bienvenido de día` / `🌙 Buenas noches`), fades out at scroll > 120px.
- Section headings are **left-aligned** (eyebrow + h2 + lead paragraph). Centred headings are reserved for the hero and the final CTA only.

---

## 6 · Iconography

Holistic uses iconography **sparingly**. Photography does the work; icons are wayfinding only.

### Approach
- **Icon set**: [Lucide](https://lucide.dev/) (open-source, ISC). Loaded from CDN: `https://unpkg.com/lucide@latest`. Stroke 1.5, never filled, currentColor.
  - This is a **substitution** — the brief did not specify an icon set. Lucide's thin-stroke organic feel matches the brand far better than Heroicons (which feels too tech-y). If the client prefers Phosphor's "thin" weight, that's an acceptable alternate. **Please confirm.**
- **Sizes**: 16, 20 (default for menu items), 24, 32.
- **Custom marks**: the logo monogram (the "H+H" within the oval frame) is the only custom mark. It's rendered as the JPG `assets/logo-mark.jpg` for now; a transparent SVG should be requested from the client.
- **Emoji**: forbidden everywhere *except* the day/night time badge (`☀️` / `🌙`). These are functional state indicators, not decoration.
- **Unicode**: the **mid-dot** `·` (U+00B7) is the brand connector: `Eco·Hotel`, `1 · 2 · 3` in section counters. Never use `•`, `-`, or `/` for the same job.
- **No bespoke amenity icons** at launch. If/when an amenities grid is added, the request to the client should be: provide flat-line SVGs at 1.5px stroke matching Lucide's vocabulary, OR we map to Lucide directly (`waves` = pool, `bed-double` = room, `wine` = bar, `leaf` = nature, `mountain` = vista, `wifi` = wifi, `coffee` = breakfast).

---

## 7 · UI kits

Currently shipping one product surface:

- **`ui_kits/landing/`** — the marketing landing page. See its [README](./ui_kits/landing/README.md). Built as a single `index.html` + JSX components, no build step required. Includes the day/night hero, welcome grid, rooms horizontal scroll, pool masonry, villa carrousel, lobby before/after, bar parallax and final CTA.

Future surfaces to add when content is supplied:
- Booking confirmation email template (post-LobbyPMS handoff)
- Guest portal / pre-arrival microsite
- Spanish / English language toggle pattern

---

## 8 · Engineering notes (carried forward from the brief)

These belong to the developer building the production Next.js site. The design system mirrors them so any artifact built here uses the same conventions:

- **Day/night logic** lives in `useTimeOfDay()`. Defaults to `null` on SSR, hydrates client-side via `useEffect` to avoid mismatch.
- **Reserve buttons** never open a form. They redirect to `lobbyPmsUrl` (fetched from Supabase `settings`).
- **Smooth scroll**: Lenis globally, with `lerp: 0.085`.
- **GSAP** does scroll-driven epic moves (parallax, pinning, ken burns, horizontal scroll). **Framer Motion** does delicate things (hover, mobile menu, modals, gestures). Never both on the same element.
- **Imagery** routes through `next/image` with `placeholder="blur"` and an explicit `priority` flag on the hero poster.

---

## 9 · Open questions for the client

1. **Icon set confirmation** — Lucide is our default. OK?
2. **Logo SVG** — we have only JPGs of the logo. A transparent SVG would unlock dark-mode usage and small sizes.
3. **Night-mode hero video** — the `HolisticVideoHeroNight.mp4` was not supplied. The fallback (day video + CSS `brightness/hue-rotate/saturate` filter) is implemented, but a real night cut would be substantially better.
4. **Voice & languages** — confirm Spanish-first, English-second, and `tú` (informal). The English subtitle alternates are our drafts.
5. **Booking copy** — "Reservar" vs "Reservar ahora" vs "Asegura tu estancia" — locked, or open?
