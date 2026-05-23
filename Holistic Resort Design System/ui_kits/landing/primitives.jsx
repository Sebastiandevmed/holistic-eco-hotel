/* global React */
const { useEffect, useRef, useState } = React;

// ----------------------------------------------------------------------------
// Eyebrow + SectionHeading
// ----------------------------------------------------------------------------
function Eyebrow({ children, color = 'var(--fg-muted)' }) {
  return (
    <div style={{
      fontFamily: 'var(--font-body)',
      fontSize: '11px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color,
      fontWeight: 500,
    }}>{children}</div>
  );
}

function SectionHeading({ eyebrow, title, lead, align = 'left', dark = false, children }) {
  return (
    <div style={{
      textAlign: align,
      maxWidth: align === 'center' ? '780px' : '640px',
      margin: align === 'center' ? '0 auto' : 0,
      color: dark ? 'var(--silver)' : 'var(--fg)',
    }}>
      {eyebrow ? <Eyebrow color={dark ? 'rgba(236,227,207,0.7)' : 'var(--fg-muted)'}>{eyebrow}</Eyebrow> : null}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 300,
        fontSize: 'clamp(2.5rem, 1.6rem + 3.4vw, 4rem)',
        lineHeight: 1.05,
        letterSpacing: '-0.004em',
        margin: '14px 0 18px',
        textWrap: 'balance',
        color: 'inherit',
      }}>{title}</h2>
      {lead ? (
        <p style={{
          fontFamily: 'var(--font-italic)', fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.125rem, 0.95rem + 0.8vw, 1.5rem)',
          lineHeight: 1.45,
          color: dark ? 'rgba(236,227,207,0.85)' : 'var(--fg-muted)',
          margin: 0,
          maxWidth: '52ch',
          ...(align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
        }}>{lead}</p>
      ) : null}
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Buttons
// ----------------------------------------------------------------------------
function Button({ variant = 'primary', children, onClick, href, mode = 'day', arrow = true, ...rest }) {
  const base = {
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '14px',
    letterSpacing: '0.04em',
    padding: '13px 26px',
    borderRadius: '999px',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    transition: 'all 320ms var(--ease-organic)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  };
  const styles = {
    primary: {
      ...base,
      background: 'var(--accent)',
      color: 'var(--fg-on-accent)',
      boxShadow: '0 1px 2px rgba(42,37,32,0.10)',
    },
    secondary: {
      ...base,
      background: 'transparent',
      color: 'var(--fg)',
      border: '1px solid var(--border-strong)',
      padding: '12px 25px',
    },
    night: {
      ...base,
      background: 'transparent',
      color: 'var(--moon)',
      border: '1px solid rgba(242,232,200,0.45)',
      padding: '12px 25px',
    },
    nightFill: {
      ...base,
      background: 'var(--moon)',
      color: 'var(--midnight)',
    },
    ghost: {
      ...base,
      background: 'transparent',
      color: mode === 'night' ? 'var(--silver)' : 'var(--ink)',
      padding: '13px 12px',
    },
  };
  const Comp = href ? 'a' : 'button';
  return (
    <Comp
      href={href}
      onClick={onClick}
      style={styles[variant]}
      onMouseEnter={(e) => {
        if (variant === 'primary') { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(198,138,60,0.35)'; e.currentTarget.style.background = 'var(--accent-hover)'; }
        if (variant === 'secondary') { e.currentTarget.style.background = 'var(--fg)'; e.currentTarget.style.color = 'var(--bg)'; e.currentTarget.style.borderColor = 'var(--fg)'; }
        if (variant === 'night') { e.currentTarget.style.boxShadow = '0 0 32px rgba(242,232,200,0.4)'; e.currentTarget.style.borderColor = 'var(--moon)'; }
        if (variant === 'nightFill') { e.currentTarget.style.boxShadow = '0 0 36px rgba(242,232,200,0.6)'; e.currentTarget.style.transform = 'translateY(-1px)'; }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = variant === 'primary' ? '0 1px 2px rgba(42,37,32,0.10)' : '';
        if (variant === 'primary') { e.currentTarget.style.background = 'var(--accent)'; }
        if (variant === 'secondary') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }
        if (variant === 'night') { e.currentTarget.style.borderColor = 'rgba(242,232,200,0.45)'; }
      }}
      {...rest}
    >
      <span>{children}</span>
      {arrow ? <span style={{ fontFamily: 'var(--font-display)' }}>→</span> : null}
    </Comp>
  );
}

const LOBBYPMS_URL = 'https://holistic.lobbypms.com';
const WHATSAPP_URL = 'https://wa.me/573126565474';

function ReserveButton({ variant = 'primary', children = 'Reservar', ...rest }) {
  return <Button variant={variant} href={LOBBYPMS_URL} {...rest}>{children}</Button>;
}

// ----------------------------------------------------------------------------
// TimeBadge
// ----------------------------------------------------------------------------
function TimeBadge({ mode, scrolled }) {
  const isDay = mode === 'day';
  return (
    <div
      aria-hidden={scrolled}
      style={{
        position: 'fixed',
        bottom: 22,
        right: 22,
        zIndex: 80,
        fontFamily: 'var(--font-body)',
        fontSize: 11,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        fontWeight: 600,
        padding: '8px 14px',
        borderRadius: 999,
        backdropFilter: 'blur(14px) saturate(160%)',
        WebkitBackdropFilter: 'blur(14px) saturate(160%)',
        background: isDay ? 'rgba(246,241,231,0.72)' : 'rgba(5,7,14,0.62)',
        color: isDay ? 'var(--ink)' : 'var(--moon)',
        border: isDay ? '1px solid rgba(42,37,32,0.10)' : '1px solid rgba(242,232,200,0.25)',
        boxShadow: isDay ? '0 4px 16px rgba(42,37,32,0.08)' : '0 4px 16px rgba(0,0,0,0.4)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        opacity: scrolled ? 0 : 1,
        transform: scrolled ? 'translateY(8px)' : 'translateY(0)',
        transition: 'opacity 480ms var(--ease-organic), transform 480ms var(--ease-organic)',
        pointerEvents: scrolled ? 'none' : 'auto',
      }}
    >
      {isDay ? '☀️ Bienvenido de día' : '🌙 Buenas noches'}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Lucide-style icon — inline-SVG fallback if CDN not used
// ----------------------------------------------------------------------------
function IconLucide({ d, size = 20, stroke = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

window.Eyebrow = Eyebrow;
window.SectionHeading = SectionHeading;
window.Button = Button;
window.ReserveButton = ReserveButton;
window.TimeBadge = TimeBadge;
window.IconLucide = IconLucide;
window.LOBBYPMS_URL = LOBBYPMS_URL;
window.WHATSAPP_URL = WHATSAPP_URL;
