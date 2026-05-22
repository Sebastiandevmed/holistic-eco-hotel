# Holistic Resort &mdash; Landing Page Ultra-Din&aacute;mica

## 1. VISI&Oacute;N GENERAL / CONTEXTO DEL PROYECTO

**Cliente:** Holistic Resort (hoteler&iacute;a de lujo natural / ecoturismo premium)
**Objetivo principal:** Landing page hiper-inmersiva que enganche al usuario instante&aacute;neamente usando toda la multimedia disponible y lo convierta en reserva mediante redirecci&oacute;n a LobbyPMS.

La p&aacute;gina debe transmitir: para&iacute;so natural, exclusividad, desconexi&oacute;n, bienestar, lujo org&aacute;nico y experiencia sensorial completa.

**NO es una web de cat&aacute;logo est&aacute;tico.** Cada secci&oacute;n debe ser una experiencia narrativa donde el scroll, las im&aacute;genes, los videos y las animaciones cuenten una historia progresiva sobre el resort.

---

## 2. STACK TECNOL&Oacute;GICO OBLIGATORIO

| Capa | Tecnolog&iacute;a | Justificaci&oacute;n |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SSR/SSG h&iacute;brido, Image Optimization nativo, rutas internacionalizadas si se requiere |
| Estilos | **Tailwind CSS v4** | Velocidad de prototipado, utility-first, f&aacute;cil de animar con clases condicionales |
| Animaciones | **GSAP + ScrollTrigger** | Scroll-driven animations complejas, parallax multi-capa, timelines narrativos |
| Micro-interacciones | **Framer Motion** | Transiciones de ruta, hover states, gestos t&aacute;ctiles, layout animations |
| UI/UX interactions | **Lenis (smooth scroll)** + **React Intersection Observer** | Scroll sedoso tipo Apple, detecci&oacute;n de secciones visibles para activar animaciones |
| Backend & DB | **Supabase** | Auth, base de datos PostgreSQL, storage para assets, real-time si se necesita, row-level security |
| Multimedia | **Next/Image + video lazy loading** | Optimizaci&oacute;n de im&aacute;genes, formatos modernos (webp/avif), placeholders blur |
| Formularios | **React Hook Form + Zod** | Validaci&oacute;n de formulario de newsletter/contacto |
| Estado global | **Zustand** | Estado liviano para UI (men&uacute; m&oacute;vil, modal de galer&iacute;a, preferencias) |
| Deployment | **Vercel** | Optimizado para Next.js, edge functions, analytics |

---

## 3. INVENTARIO COMPLETO DE ASSETS MULTIMEDIA

### Video
```
HolisticVideoHero.mp4       →  Hero background video DIURNO (loop, muted, autoplay) — usar antes de las 18:00
HolisticVideoHeroNight.mp4  →  Hero background video NOCTURNO (loop, muted, autoplay) — usar desde las 18:00
                                ⚠️ Si este archivo no existe aún, usar HolisticVideoHero.mp4 con overlay
                                CSS de tonos azul-morado oscuro (filter + mix-blend-mode) para simular
                                la versión nocturna hasta que el cliente provea el video de noche.
```

### Logos
```
LogoNOBC.jpg          →  Logo sin fondo (509×509)
HolisticLogoConfO.jpg →  Logo variante/isotipo (509×509)
```

### Hero (5 im&aacute;genes — separadas por modo d&iacute;a/noche)

**HERO DIURNO** (antes de las 18:00 hrs):
```
Hero.jpg              →  Hero diurno principal — poster image del video diurno (1024×683)
Hero2.jpg             →  Hero diurno variante 2, usar en parallax de fondo (1024×768)
DroneHero.jpg         →  Toma a&eacute;rea con drone, usada en hero diurno como capa secundaria (1024×768)
```

**HERO NOCTURNO** (desde las 18:00 hrs):
```
HeroNight.jpg         →  Hero nocturno principal — poster image del video nocturno (1024×683)
HeroNight2.jpg        →  Hero nocturno variante, usar en parallax de fondo nocturno (1024×683)
```

### Lobby / Recepci&oacute;n (3 im&aacute;genes)
```
LobbyRes.jpg          →  Lobby principal (1024×683)
LobbyRes2.jpg         →  Lobby variante 2 (1024×683)
LobbyRes3.jpg         →  Lobby variante 3 (1024×683)
```

### Habitaciones (8 im&aacute;genes)
```
Room1.jpg  →  Room8.jpg   (1024×683 each)
```

### Exteriores / Vistas desde habitaci&oacute;n (3 im&aacute;genes)
```
RoomOut.jpg, RoomOut2.jpg, RoomOut3.jpg  (1024×683 each)
```

### Piscina (8 im&aacute;genes)
```
Pool.jpg  →  Pool8.jpg  (1024×683 each)
```

### Villas / Caba&ntilde;as (5 im&aacute;genes)
```
Villages.jpg  →  Villages5.jpg  (1024×683 each)
```

### Bar (1 imagen)
```
Bar.jpg  (1024×683)
```

---

## 4. ARQUITECTURA DE SECCIONES (SCROLL NARRATIVO)

### 4.1 &mdash; NAVBAR FLOTANTE INTELIGENTE
- **Glassmorphism** blur backdrop (backdrop-blur-xl) con logo Holistic en el centro
- Cambia de transparente → s&oacute;lido al hacer scroll (GSAP)
- Hamburguesa animada con morphing a X (Framer Motion)
- Men&uacute; fullscreen overlay con im&aacute;genes de fondo que cambian seg&uacute;n la secci&oacute;n hovereada
- Bot&oacute;n &ldquo;Reservar&rdquo; siempre visible con pulso animado s&uacute;til
- **Al hacer clic en reservar:** redirecci&oacute;n a LobbyPMS (URL configurable desde Supabase → tabla `settings`)

### 4.2 &mdash; HERO SECTION DINÁMICO DÍA/NOCHE (fullscreen, prioridad m&aacute;xima de impacto)

> **LÓGICA CENTRAL:** Al cargar la p&aacute;gina, se lee la hora local del cliente con `new Date().getHours()`. Si `hours < 18` → **modo d&iacute;a**. Si `hours >= 18` → **modo noche**. El hero renderiza una experiencia completamente diferente seg&uacute;n este valor. Esta l&oacute;gica vive en el hook `useTimeOfDay()`.

---

#### 🌅 HERO DIURNO (00:00 – 17:59 hrs)

- **Video de fondo:** `HolisticVideoHero.mp4` en loop, muted, autoplay, con overlay gradiente oscuro suave (dorado/&aacute;mbar al negro)
- **Poster image:** `Hero.jpg` mientras carga el video
- **Paleta tonal:** Dorados, blancos c&aacute;lidos, verdes vibrantes — luz de d&iacute;a exuberante
- **Parallax multi-capa con GSAP:**
  - Capa 1: Video diurno (profundidad base, movimiento m&iacute;nimo)
  - Capa 2: Overlay gradiente radial dorado/&aacute;mbar que sigue ligeramente el mouse
  - Capa 2b: Imagen `Hero2.jpg` en parallax lento detr&aacute;s del video (aparece en fade cuando el video termina la primera iteraci&oacute;n, solo desktop)
  - Capa 3: T&iacute;tulo &ldquo;Holistic&rdquo; con efecto de revelado letra por letra (SplitText o manual con spans)
  - Capa 3b: Subt&iacute;tulo diurno: *&ldquo;Donde la naturaleza te abraza&rdquo;* con stagger (Framer Motion)
  - Capa 4: CTA buttons (&ldquo;Explorar&rdquo; + &ldquo;Reservar → LobbyPMS&rdquo;) con escala al hacer scroll
- **Efecto de mouse parallax:** texto y gradiente dorado siguen ligeramente el cursor (tilt 3D sutil, solo desktop)
- **Badge de tiempo:** peque&ntilde;o indicador visual sutil en esquina inferior derecha: `☀️ Bienvenido de d&iacute;a` (desaparece con scroll)

---

#### 🌙 HERO NOCTURNO (18:00 – 23:59 hrs)

- **Video de fondo:** `HolisticVideoHeroNight.mp4` en loop, muted, autoplay. **Fallback:** si el archivo no existe, usar `HolisticVideoHero.mp4` con CSS filter `brightness(0.6) hue-rotate(200deg) saturate(0.7)` para lograr el tono nocturno azulado/oscuro.
- **Poster image:** `HeroNight.jpg` mientras carga el video
- **Paleta tonal:** Azules profundos, morados c&oacute;smicos, negros con destellos, platas — ambiente m&iacute;stico nocturno
- **Parallax multi-capa con GSAP:**
  - Capa 1: Video nocturno (profundidad base)
  - Capa 2: Overlay gradiente radial azul-morado oscuro que sigue ligeramente el mouse, con m&iacute;nimos destellos tipo estrellas/luz de luna (CSS radial-gradient animado)
  - Capa 2b: Imagen `HeroNight2.jpg` en parallax lento detr&aacute;s del video (solo desktop)
  - Capa 3: T&iacute;tulo &ldquo;Holistic&rdquo; con efecto de revelado letra por letra + resplandor nocturno sutil (text-shadow animado con GSAP)
  - Capa 3b: Subt&iacute;tulo nocturno alternativo: *&ldquo;La noche tambi&eacute;n es para soñar&rdquo;* con stagger (Framer Motion)
  - Capa 4: CTA buttons con estilo nocturno (borde luminoso, hover con halo azul-plata) → mismas acciones que en modo d&iacute;a
- **Efecto de partículas:** micropart&iacute;culas CSS (puntos pequeños, opacidad baja) flotando lentamente en el fondo para simular el ambiente nocturno — solo desktop, sin impacto en performance significativo
- **Efecto de mouse parallax:** texto y resplandor azulado siguen ligeramente el cursor
- **Badge de tiempo:** peque&ntilde;o indicador visual: `🌙 Buenas noches` (desaparece con scroll)

---

#### Implementaci&oacute;n t&eacute;cnica del cambio d&iacute;a/noche:

```tsx
// hooks/useTimeOfDay.ts
export type TimeOfDay = 'day' | 'night';

export function useTimeOfDay(): TimeOfDay {
  const hours = new Date().getHours();
  return hours >= 18 ? 'night' : 'day';
}
```

```tsx
// sections/HeroSection.tsx
const timeOfDay = useTimeOfDay();
const isDayMode = timeOfDay === 'day';

const heroConfig = {
  day: {
    video: '/assets/HolisticVideoHero.mp4',
    poster: '/assets/Hero.jpg',
    parallaxBg: '/assets/Hero2.jpg',
    subtitle: 'Donde la naturaleza te abraza',
    overlayClass: 'from-amber-900/40 via-transparent to-black/60',
    badge: '☀️ Bienvenido de día',
  },
  night: {
    video: '/assets/HolisticVideoHeroNight.mp4', // fallback: HolisticVideoHero.mp4 + CSS filter
    poster: '/assets/HeroNight.jpg',
    parallaxBg: '/assets/HeroNight2.jpg',
    subtitle: 'La noche también es para soñar',
    overlayClass: 'from-indigo-950/60 via-purple-950/30 to-black/70',
    badge: '🌙 Buenas noches',
  },
};

const config = heroConfig[timeOfDay];
```

- **Server-side rendering:** el hero puede pre-renderizarse sin el dato de hora del cliente. Usar `suppressHydrationWarning` en el componente o cargar la l&oacute;gica de hora solo en cliente con `useEffect` + estado inicial neutro para evitar hydration mismatch.
- **Transici&oacute;n suave:** si el usuario tiene la p&aacute;gina abierta y cruza las 18:00 (edge case), el hero no se recarga autom&aacute;ticamente. La hora se lee solo al montar el componente.
- **Testeo:** pasar prop `forceTimeOfDay?: 'day' | 'night'` para poder testear ambos modos en desarrollo.

---

- **Indicador de scroll (ambos modos):** flecha/l&iacute;nea animada abajo (&ldquo;Descubre m&aacute;s&rdquo;) que pulsa con GSAP — color dorado en d&iacute;a, color plata/azul en noche

### 4.3 &mdash; SECCI&Oacute;N BIENVENIDA / EL LUGAR (fade-in + parallax)
- Grid de 3 columnas con im&aacute;genes de drone y naturaleza:
  - `DroneHero.jpg` a la izquierda (m&aacute;s grande, parallax vertical diferente)
  - `Hero2.jpg` centro-arriba
  - `HeroNight.jpg` derecha-abajo
- Texto central con la filosof&iacute;a del resort (animaci&oacute;n entrada from bottom con GSAP ScrollTrigger)
- **Efecto:** las im&aacute;genes se mueven a distintas velocidades (parallax diferencial) mientras el texto permanece fijo relativo al viewport por un momento (pin de ScrollTrigger)

### 4.4 &mdash; GALER&Iacute;A HABITACIONES (showcase horizontal scroll)
- **Scroll horizontal nativo convertido con GSAP:** container con `overflow-x: hidden`, las 8 im&aacute;genes de Room1→Room8 desfilan horizontalmente al hacer scroll vertical (fake horizontal scroll)
- Cada room card tiene:
  - Imagen con efecto de revelado (clip-path o scale)
  - Nombre de la habitaci&oacute;n overlay en hover
  - Indicador de progreso del scroll horizontal
- **Transici&oacute;n:** al terminar el scroll horizontal, se activa un fade-out y la p&aacute;gina retoma el flujo vertical

### 4.5 &mdash; SECCI&Oacute;N PISCINA &amp; EXTERIORES (masonry din&aacute;mico)
- Collage/masonry grid con las 8 fotos de Pool + 3 de RoomOut (11 im&aacute;genes)
- Layout asim&eacute;trico que se revela progresivamente con GSAP ScrollTrigger (stagger from random directions)
- Cada imagen tiene un hover state que la expande ligeramente (scale + z-index + sombra, Framer Motion `whileHover`)
- Una imagen central grande (`Pool.jpg` o la m&aacute;s impactante) con efecto de ken burns lento (escala sutil continua con GSAP)

### 4.6 &mdash; SECCI&Oacute;N VILLAS / CABA&Ntilde;AS (cards 3D interactivas)
- 5 villas en carrusel horizontal con snap-scroll (scroll-snap-type en el contenedor)
- Cada card de villa:
  - Imagen de fondo
  - Gradiente overlay que revela texto en hover
  - Efecto 3D tilt al hacer hover (perspective + rotateX/Y con evento de mouse, vanilla JS + Framer Motion)
  - Bot&oacute;n &ldquo;M&aacute;s info&rdquo; que abre modal
- **Fondo animado:** transici&oacute;n suave entre `Villages.jpg` → `Villages5.jpg` como background del contenedor mientras se desliza

### 4.7 &mdash; LOBBY &amp; RECEPCI&Oacute;N (before/after slider)
- Slider comparativo tipo before/after:
  - Mitad izquierda: `LobbyRes.jpg`
  - Mitad derecha: `LobbyRes2.jpg`
- El usuario arrastra la l&iacute;nea divisoria (interactivo con mouse/touch, GSAP Draggable o implementaci&oacute;n custom)
- Esto crea engagement y curiosidad → muestra atenci&oacute;n al detalle del interiorismo
- `LobbyRes3.jpg` aparece como thumbnail debajo del slider con efecto de reflejo

### 4.8 &mdash; SECCI&Oacute;N BAR &amp; GASTRONOM&Iacute;A (full-width immersive parallax)
- Background fijo/parallax con `Bar.jpg` a pantalla completa
- Texto overlay que aparece por la izquierda al hacer scroll (GSAP from x: -100)
- **Efecto de part&iacute;culas o luz ambiental** sutil con canvas o CSS (ambiente de velas/luces del bar)
- Subt&iacute;tulo con tipograf&iacute;a serif elegante describiendo la experiencia gastron&oacute;mica

### 4.9 &mdash; SECCI&Oacute;N NOCTURNA / AMBIENTE (transici&oacute;n d&iacute;a→noche)
- **Narrativa visual de transici&oacute;n d&iacute;a a noche:**
  - Al llegar a esta secci&oacute;n, el fondo general de la p&aacute;gina transiciona de tonos dorados/diurnos a tonos azulados/nocturnos (CSS custom properties animadas con GSAP)
  - `HeroNight.jpg` y `HeroNight2.jpg` en parallax doble
  - Las im&aacute;genes pasan de un filtro c&aacute;lido a uno nocturno (transici&oacute;n de filter: hue-rotate/brightness con GSAP)
- Frase aspiracional grande centrada: &ldquo;Holistic de noche&rdquo; con efecto de luz que recorre las letras (CSS animated gradient o shader simple)

### 4.10 &mdash; CTA FINAL + RESERVAR (m&aacute;xima conversi&oacute;n)
- Full-width secci&oacute;n con `DroneHero.jpg` de fondo + overlay gradiente
- **Texto principal:** llamada a la acci&oacute;n persuasiva (&ldquo;Tu escape te espera&rdquo; o similar)
- **Dos botones prominentes:**
  1. &ldquo;Reservar ahora&rdquo; → **Redirecci&oacute;n directa a LobbyPMS** (URL desde Supabase)
  2. &ldquo;Cont&aacute;ctanos&rdquo; → abre modal con formulario que guarda en Supabase (tabla `contacts`)
- **Efecto:** los botones tienen un halo/pulso animado con GSAP + gradiente c&oacute;smico en hover
- **Contador regresivo o badge de disponibilidad:** (si se integra con LobbyPMS API) &ldquo;Solo quedan X habitaciones&rdquo; → urgencia/escases

### 4.11 &mdash; FOOTER
- Minimalista con logo Holistic, links sociales, direcci&oacute;n, tel&eacute;fono (datos desde Supabase)
- &ldquo;Powered by LobbyPMS&rdquo; con link
- Efecto de l&iacute;nea horizontal que aparece con scroll (GSAP from scaleX: 0)

---

## 5. ESTRATEGIA DE ANIMACIONES (GSAP + FRAMER MOTION)

### Qu&eacute; anima GSAP (ScrollTrigger):
- Parallax multi-velocidad en cada secci&oacute;n que tiene im&aacute;genes grandes
- Fake horizontal scroll de habitaciones
- Transiciones d&iacute;a-noche (CSS custom properties)
- Ken burns en im&aacute;genes destacadas
- Pinned sections (el texto se queda fijo mientras las im&aacute;genes pasan)
- Efectos de revelado de texto (split text / clip-path reveals)
- Stagger reveals de galer&iacute;as

### Qu&eacute; anima Framer Motion:
- Transiciones de ruta (page transitions con AnimatePresence)
- Hover states en cards, botones, galer&iacute;a
- Apertura/cierre del men&uacute; m&oacute;vil (layout animations + spring)
- Modales (contacto, galer&iacute;a fullscreen, info de villa)
- Gestos en m&oacute;vil (swipe en carrusel de villas)
- Efecto 3D tilt en villas (motion.div con style={{ rotateX, rotateY }})

### Interacci&oacute;n mouse (solo desktop, desactivado en touch):
- Cursor personalizado tipo fade-out radial (opcional, elegante)
- Efecto de seguimiento de mouse en hero (texto y gradiente)
- Tilt en villas y cards de habitaciones

### Smooth Scroll:
- Lenis implementado globalmente con config suave pero responsiva
- Anclas de navegaci&oacute;n con scrollTo animado

---

## 6. ESTRATEGIA DE UI/UX (MICRO-INTERACCIONES)

- **Tipograf&iacute;a:** Fuente serif elegante para t&iacute;tulos (Playfair Display o Cormorant Garamond) + sans-serif limpia para body (Inter o DM Sans)
- **Paleta de colores:** Tonos tierra, dorados, verdes oscuros, cremas, y un acento c&aacute;lido (terracota o &aacute;mbar). Extraer de las im&aacute;genes mismas un color scheme que armonice.
- **Loaders:** Skeleton cards pulsantes mientras cargan im&aacute;genes (Next.js loading.tsx por ruta)
- **Transiciones de carga de im&aacute;genes:** efecto blur-in (de borroso a n&iacute;tido) con placeholder blur de Next/Image
- **Empty states y errores:** Mensajes elegantes si Supabase falla (toast notifications con estilo del brand)
- **Responsive:** Adaptar el fake horizontal scroll a carrusel vertical en m&oacute;vil, los parallax se aten&uacute;an en touch, los tilts se desactivan, tipograf&iacute;as escalan correctamente
- **A11y:** Atributos aria, focus states, contraste suficiente, etiquetas alt descriptivas con las keywords del resort

---

## 7. BASE DE DATOS SUPABASE &mdash; ESQUEMA COMPLETO

### Tabla `settings` (configuraci&oacute;n global del sitio)
```sql
CREATE TABLE settings (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key           TEXT UNIQUE NOT NULL,
  value         TEXT,
  description   TEXT,
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
-- Rows esperados:
-- 'lobbypms_url'        → 'https://holistic.lobbypms.com/...'
-- 'hotel_name'          → 'Holistic Resort'
-- 'hotel_address'       → '...'
-- 'hotel_phone'         → '+52...'
-- 'hotel_email'         → 'reservas@holistic.com'
-- 'hero_title'          → 'Holistic'
-- 'hero_subtitle'       → 'Donde la naturaleza te abraza'
-- 'cta_text'            → 'Reservar ahora'
-- 'instagram_url'       → '...'
-- 'facebook_url'        → '...'
```

### Tabla `rooms` (habitaciones)
```sql
CREATE TABLE rooms (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  short_desc    TEXT,
  price_night   DECIMAL(10,2),
  capacity      INT,
  size_m2       INT,
  amenities     JSONB DEFAULT '[]',
  images        JSONB DEFAULT '[]',
  featured      BOOLEAN DEFAULT false,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabla `villas` (caba&ntilde;as)
```sql
CREATE TABLE villas (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  short_desc    TEXT,
  price_night   DECIMAL(10,2),
  capacity      INT,
  images        JSONB DEFAULT '[]',
  featured      BOOLEAN DEFAULT false,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabla `gallery` (galer&iacute;a de im&aacute;genes con metadatos)
```sql
CREATE TABLE gallery (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category      TEXT NOT NULL,
  image_url     TEXT NOT NULL,
  alt_text      TEXT,
  width         INT,
  height        INT,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabla `contacts` (leads del formulario)
```sql
CREATE TABLE contacts (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  message       TEXT,
  source        TEXT DEFAULT 'website',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabla `testimonials` (opcional, si se a&ntilde;ade secci&oacute;n de rese&ntilde;as)
```sql
CREATE TABLE testimonials (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  text          TEXT NOT NULL,
  rating        INT DEFAULT 5,
  avatar_url    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### Storage Buckets
- `assets` → todas las im&aacute;genes y videos optimizados (webp generados autom&aacute;ticamente por Next/Image)
- `logos` → logos del hotel

### Row Level Security
- Tablas `contacts` y `testimonials`: INSERT p&uacute;blico, SELECT solo authenticated
- Tablas `settings`, `rooms`, `villas`, `gallery`: SELECT p&uacute;blico, INSERT/UPDATE/DELETE solo authenticated

---

## 8. INTEGRACI&Oacute;N CON LOBBYPMS

Todos los botones de &ldquo;Reservar&rdquo; en la p&aacute;gina (navbar, hero CTA, secci&oacute;n de habitaciones, secci&oacute;n final CTA) deben redireccionar a la URL de LobbyPMS configurada en la tabla `settings` de Supabase con key `lobbypms_url`.

### Implementaci&oacute;n sugerida:
```tsx
// Componente compartido ReserveButton
<Button onClick={() => router.push(lobbyPmsUrl)}>
  Reservar ahora
</Button>
```

Donde `lobbyPmsUrl` se obtiene desde Supabase al cargar la p&aacute;gina (getStaticProps o server component) y se cachea. Si la DB no responde, usar un fallback URL hardcodeado.

---

## 9. COMPONENTES REACT PRINCIPALES A CONSTRUIR

```
components/
├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── MobileMenu.tsx
├── ui/
│   ├── ReserveButton.tsx       (→ LobbyPMS redirect)
│   ├── SectionHeading.tsx
│   ├── ParallaxImage.tsx
│   ├── ScrollReveal.tsx        (wrapper GSAP reveal)
│   ├── MouseFollower.tsx
│   └── TimeBadge.tsx           (badge "☀️ Bienvenido de día" / "🌙 Buenas noches" — desaparece con scroll)
├── sections/
│   ├── HeroSection.tsx         (hero dinámico día/noche — video bg + parallax + CTA)
│   │   ├── HeroDayMode.tsx     (sub-componente: config visual diurna)
│   │   └── HeroNightMode.tsx   (sub-componente: config visual nocturna + partículas)
│   ├── WelcomeSection.tsx      (drone + naturaleza)
│   ├── RoomsShowcase.tsx       (horizontal scroll)
│   ├── PoolExteriors.tsx       (masonry collage)
│   ├── VillasSection.tsx       (3D tilt carrusel)
│   ├── LobbySection.tsx        (before/after slider)
│   ├── BarSection.tsx          (full parallax)
│   ├── NightAmbiance.tsx       (día→noche transition en scroll)
│   └── CtaSection.tsx          (call to action final)
├── gallery/
│   ├── BeforeAfterSlider.tsx
│   ├── MasonryGrid.tsx
│   └── LightboxModal.tsx
├── forms/
│   └── ContactForm.tsx         (→ Supabase contacts)
├── cursor/
│   └── CustomCursor.tsx        (estilo cambia según timeOfDay: dorado en día, plateado en noche)
└── providers/
    ├── LenisProvider.tsx
    ├── SupabaseProvider.tsx
    └── TimeOfDayProvider.tsx   (contexto global con timeOfDay para que otros componentes lo consuman)
```

---

## 10. HOOKS CUSTOM

- `useSupabaseQuery<T>(table, query)` → fetching tipado con cache
- `useScrollProgress()` → porcentaje de scroll para indicadores y barras de progreso
- `useParallax(speed)` → valor de translateY para parallax diferencial
- `useMousePosition()` → coordenadas del mouse para tilt/parallax
- `useMediaQuery(query)` → responsive conditional rendering
- `useLobbyPmsUrl()` → obtener y cachear URL de redirecci&oacute;n de reservas
- `useTimeOfDay()` → retorna `'day' | 'night'` bas&aacute;ndose en la hora local del cliente. Solo ejecuta en el cliente (useEffect), retorna `null` en SSR para evitar hydration mismatch. Acepta override opcional `forceTimeOfDay?: 'day' | 'night'` para testing. Signature: `useTimeOfDay(force?: 'day' | 'night'): TimeOfDay | null`

---

## 11. OPTIMIZACIONES DE PERFORMANCE

- Todas las im&aacute;genes en formato `.webp` o `.avif` (Next/Image lo convierte)
- Lazy loading nativo en todas las im&aacute;genes fuera del viewport inicial
- Video hero cargado como `<video>` con `preload="metadata"` y lazy loading
- GSAP y Framer Motion importados con tree-shaking (importar solo lo usado)
- Supabase queries cacheadas con `stale-while-revalidate`
- Fuentes tipogr&aacute;ficas con `next/font` (sin flash de fuente sin estilo)
- Prioridad de carga: Logo → Hero video poster image → Texto hero → Resto de secciones

---

## 12. ESTRUCTURA DE ARCHIVOS DEL PROYECTO

```
holistic-web/
├── public/
│   ├── assets/
│   │   └── (todas las imágenes y video copiados de Holistic Assets)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── components/        (ver sección 9)
│   ├── hooks/             (ver sección 10)
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── gsap/
│   │   │   ├── config.ts
│   │   │   └── animations.ts
│   │   └── constants.ts
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       └── supabase.ts     (tipos autogenerados)
├── tailwind.config.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── CLAUDE_DESIGN_PROMPT.md (este archivo)
```

---

## 13. NOTAS PARA CLAUDE DESIGN

1. **Primero analizar visualmente TODAS las im&aacute;genes de la carpeta** para entender la paleta de colores real, el estilo arquitect&oacute;nico, y el mood del resort. Prestar especial atenci&oacute;n a las diferencias visuales entre las im&aacute;genes diurnas (Hero.jpg, Hero2.jpg, DroneHero.jpg) y nocturnas (HeroNight.jpg, HeroNight2.jpg) para extraer dos paletas diferenciadas.

2. **El hero es el asset m&aacute;s importante y tiene comportamiento din&aacute;mico.** Antes de las 18:00 usa `HolisticVideoHero.mp4` con poster `Hero.jpg` y paleta dorada/diurna. Desde las 18:00 usa `HolisticVideoHeroNight.mp4` (o el video diurno con filter CSS nocturno como fallback) con poster `HeroNight.jpg` y paleta azul/nocturna. El componente `HeroSection.tsx` debe aceptar y renderizar ambos modos de forma limpia y sin duplicar l&oacute;gica innecesaria.

3. **El ritmo narrativo es clave:** el scroll debe sentirse como un viaje. No secciones independientes sino una l&iacute;nea de tiempo continua donde cada secci&oacute;n se disuelve en la siguiente.

4. **GSAP para lo &eacute;pico (scroll-driven), Framer Motion para lo delicado (micro-interacciones).** No mezclar ambas librer&iacute;as en un mismo elemento.

5. **Mobile-first pero con show-off en desktop.** En m&oacute;vil las animaciones deben ser m&aacute;s simples y r&aacute;pidas. En desktop es donde debe brillar el parallax multi-capa y los efectos 3D.

6. **Los botones de reservar NUNCA deben abrir formularios.** Siempre redireccionan a LobbyPMS. El &uacute;nico formulario en la p&aacute;gina es el de contacto.

7. **La carga de datos desde Supabase debe ser invisible para el usuario.** Usar server components + streaming donde sea posible, con skeletons elegantes mientras carga.

8. **El dise&ntilde;o debe transmitir lujo sin ser pretencioso.** La naturaleza es la protagonista, la arquitectura y las instalaciones son el complemento. Tipograf&iacute;a org&aacute;nica, espaciado generoso, im&aacute;genes grandes que respiran.

---

## 14. ENTREGABLES ESPERADOS

- [x] Next.js 15 App Router project fully configured
- [x] Tailwind CSS v4 config
- [x] GSAP con ScrollTrigger registrado e inicializado
- [x] Framer Motion integrado (AnimatePresence a nivel layout)
- [x] Lenis smooth scroll global
- [x] Conexi&oacute;n a Supabase (client + server)
- [x] Esquema SQL listo para ejecutar en Supabase
- [x] Todos los components enlistados en secci&oacute;n 9
- [x] Todos los hooks custom de secci&oacute;n 10
- [x] Animaciones completas por secci&oacute;n
- [x] Redirecci&oacute;n a LobbyPMS funcional
- [x] Formulario de contacto → Supabase
- [x] Dise&ntilde;o 100% responsive
- [x] Performance optimizada (Lighthouse 90+)
- [x] Hook `useTimeOfDay()` implementado (client-only, sin hydration mismatch)
- [x] Hero diurno completo: video + poster + paleta dorada + subt&iacute;tulo diurno + badge ☀️
- [x] Hero nocturno completo: video/fallback nocturno + poster + paleta azul + subt&iacute;tulo nocturno + badge 🌙 + part&iacute;culas
- [x] `TimeOfDayProvider.tsx` para compartir el contexto en toda la app
- [x] Prop `forceTimeOfDay` en HeroSection para testing en desarrollo
- [x] `TimeBadge.tsx` con animaci&oacute;n de desaparici&oacute;n al hacer scroll
