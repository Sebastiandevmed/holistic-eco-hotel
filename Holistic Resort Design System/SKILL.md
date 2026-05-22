---
name: holistic-design
description: Use this skill to generate well-branded interfaces and assets for Holistic Eco·Hotel — a luxury natural / ecotourism resort. Contains essential design guidelines, colors, type, fonts, photography, and a UI kit recreation of the landing page (with day/night hero mode). Use for production code, marketing artifacts, slide mocks, throwaway prototypes, or any work that has to look and feel like Holistic.
user-invocable: true
---

# Holistic Eco·Hotel — design skill

Read `README.md` first — it covers the brand at a glance, voice, visual foundations (color, type, spacing, radii, shadow, motion, imagery, hover/press/focus, transparency, layout rules), iconography, the UI-kit inventory, and open questions.

Then explore:

- `colors_and_type.css` — every color, font, spacing, radius, shadow and motion token used by the system. **Drop this stylesheet in and use the CSS variables**; do not redefine colors.
- `assets/` — logos (`logo-mark.jpg`, `logo-wood.jpg`), hero photography (day + night), 8 rooms, 5 villas, 8 pool shots, 3 exteriors, lobby (3), bar, hero video (`HolisticVideoHero.mp4`). **Always copy assets out**; never link cross-project.
- `preview/` — design-system specimen cards. Useful for showing the user "here is what the system looks like" before building.
- `ui_kits/landing/` — modular JSX components for the marketing landing page. Open `index.html` to see them assembled. Lift components from here; don't reinvent them.

## When invoked

If invoked with no extra guidance, ask:

1. **What surface?** Landing page, an individual section, a slide deck, an email, a slide mock?
2. **Day, night, or both?** The brand has two visual modes; many artifacts only need one.
3. **Spanish, English, or bilingual?** Spanish-first by default; English is a second-class localisation.
4. **Where does "Reservar" link to?** Always external — defaults to the LobbyPMS URL placeholder.

## Behaviour rules

- **Color**: use semantic tokens (`--bg`, `--fg`, `--accent`, `--brand`). Avoid hex literals.
- **Type**: three brand fonts, strict roles. **Italiana** for the wordmark and the giant hero "Holistic" only. **Cormorant Garamond** (light 300 / regular 400, with italics) for all headings, leads, and `<em>` inside body. **Raleway** (light 300 / regular 400 / medium 500) for body, UI, navigation, captions and buttons. Never bold beyond Raleway 500. Tokens: `--font-brand`, `--font-display`, `--font-italic`, `--font-body`.
- **Buttons**: pill (`border-radius: 999px`). Primary = amber on day, candle-amber on night. CTAs that read "Reservar" must point at the LobbyPMS URL — they never open forms.
- **Imagery**: always full-bleed. Only filter ever applied is the night-mode fallback (`brightness(0.6) hue-rotate(200deg) saturate(0.7)`) on day video.
- **Icons**: Lucide (CDN). Stroke 1.5, currentColor. Never invent SVG amenity icons.
- **Emoji**: forbidden anywhere except the time badge (`☀️` / `🌙`).
- **Motion**: easings from `colors_and_type.css`. No springs that overshoot. 320 ms default duration.

## Producing artifacts

If the user wants a **mock or static artifact**, output a single self-contained HTML file (you can inline CSS but you should still `<link>` `colors_and_type.css`). Copy any assets you use into the artifact's folder so it works offline.

If the user wants **production code**, follow the stack in the brief: Next.js 15 App Router + Tailwind v4 + GSAP + Framer Motion + Lenis + Supabase. Carry over the `useTimeOfDay()` hook, the day/night hero contract, the reserve-button-redirect contract, and the Supabase schema as documented in `README.md`.

Always ask before adding content the user didn't request.
