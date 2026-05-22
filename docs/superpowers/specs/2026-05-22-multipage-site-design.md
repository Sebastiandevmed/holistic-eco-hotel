# Holistic — Migración de one-page a multipágina

Fecha: 2026-05-22

## Objetivo

Convertir la landing one-page del hotel en un sitio multipágina con páginas
dedicadas para **Cabaña**, **Galería** y **Reservas**, con URLs reales y
navegación entre páginas. Motivación: estructura más profesional/SEO y mayor
valor comercial del proyecto.

## Decisiones

- **Routing**: archivos HTML separados (`cabana.html`, `galeria.html`,
  `reservas.html` + `index.html`). Sin build, sin router JS, robusto en GitHub
  Pages, URLs reales. Descartado hash-routing (URLs feas) y react-router
  (requiere hack de 404.html en GitHub Pages).
- **Home**: resumen liviano (hero + bienvenida + 3 tarjetas teaser + bar +
  footer). El contenido detallado vive en cada subpágina (sin duplicar).
- **Reservas / LobbyPMS**: opción más segura = enlace al motor de LobbyPMS que
  abre en pestaña nueva (no iframe). Muchos motores bloquean ser embebidos
  (`X-Frame-Options`) y un iframe de pago de terceros es frágil. Reutiliza el
  patrón actual del botón "Reservar" (`LOBBYPMS_URL`).

## Mapa de páginas

- `index.html` (home): Splash (1ª visita) · Navbar · HeroSection · WelcomeSection ·
  3 tarjetas teaser → cabaña/galería/reservas · BarSection · Footer
- `cabana.html`: Navbar · PageHero · TheCabin · franja CTA → reservas · Footer
- `galeria.html`: Navbar · PageHero · galería cabaña + PoolMasonry (zonas) +
  LobbyBeforeAfter (piscina día/noche) · Footer
- `reservas.html`: Navbar · CtaSection (Reservar=LobbyPMS nueva pestaña +
  WhatsApp) + resumen precio/incluye · Footer

## Componentes nuevos

- `siteShell.jsx`: `useTimeMode()` (lee `?mode` o la hora, fija
  `document.documentElement.dataset.timeMode`), `ModeSwitch` (toggle flotante
  día/noche, con su propio `<style>`), `PageHero` (encabezado de subpágina).
- `HomeTeasers.jsx`: 3 tarjetas que enlazan a las subpáginas.

## Componentes modificados

- `Navbar.jsx`: links a páginas reales (Inicio, La cabaña, Galería, Reservas) en
  vez de anclas de scroll; resalta la página activa; logo enlaza a inicio;
  **menú móvil real** (hoy en móvil los links se ocultan y no hay forma de
  navegar — necesario al ser multipágina).
- `index.html`: reconstruido como home resumen, usando `useTimeMode`/`ModeSwitch`
  compartidos.

## No incluido (YAGNI)

- Sin CMS (el contenido sigue en código).
- Sin iframe de LobbyPMS.
- Bar y "El lugar" quedan en el home (no son subpáginas pedidas).
