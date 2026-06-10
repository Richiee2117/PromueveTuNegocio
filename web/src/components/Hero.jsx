import { ArrowRight, MapPin } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { CATALOG } from '../data/catalog'

function CategoryChip({ category, index }) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl px-4 py-3"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: `1px solid ${category.accent}30`,
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div
        className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center"
        style={{ background: category.accent + '28', border: `1px solid ${category.accent}40` }}
      >
        <div
          className="w-2.5 h-2.5 rounded-sm"
          style={{ background: category.accent }}
        />
      </div>
      <div className="min-w-0">
        <p
          className="font-bold text-sm text-white leading-none truncate"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {category.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {category.items.length} artículos
        </p>
      </div>
    </div>
  )
}

export default function Hero() {
  const textRef = useScrollReveal()
  const showcaseRef = useScrollReveal()

  return (
    <section
      id="inicio"
      className="relative overflow-hidden"
      style={{ minHeight: '100dvh', background: '#0F0E17' }}
    >
      {/* Background image — blurred and softened so it blends into the page */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/Front_Page/Imagen_fondo_frontpage.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(32px)',
          transform: 'scale(1.15)',
          opacity: 0.65,
        }}
      />
      {/* White wash to unify the image with the rest of the page */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'rgba(255,255,255,0.10)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Multi-layer ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 110% 70% at 90% 0%,  rgba(249,115,22,0.28) 0%, transparent 55%),
            radial-gradient(ellipse 70%  60% at 10% 95%, rgba(139,92,246,0.14) 0%, transparent 55%),
            radial-gradient(ellipse 80%  80% at 50% 50%, rgba(236,72,153,0.06) 0%, transparent 65%)
          `,
        }}
      />

      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 38px, rgba(255,255,255,0.013) 38px, rgba(255,255,255,0.013) 39px)',
        }}
      />

      {/* Noise overlay — adds depth without images */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.022,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="grid lg:grid-cols-[1fr_360px] gap-16 items-center">

          {/* Left: text */}
          <div ref={textRef} className="reveal max-w-3xl">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-8"
              style={{
                background: 'rgba(249,115,22,0.12)',
                border: '1px solid rgba(249,115,22,0.28)',
              }}
            >
              <MapPin size={12} style={{ color: 'var(--color-brand)' }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--color-brand)', letterSpacing: '0.12em' }}
              >
                Hermosillo, Sonora
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-black text-white leading-[1.05] mb-6"
              style={{
                fontSize: 'clamp(2.6rem, 6vw, 5rem)',
                letterSpacing: '-0.025em',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Haz que tu negocio{' '}
              <span style={{ color: 'var(--color-brand)' }}>destaque</span>
              <br />
              <span style={{ color: 'rgba(255,255,255,0.42)' }}>físicamente</span>
            </h1>

            {/* Body */}
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.52)', maxWidth: '52ch' }}
            >
              DTF, sublimación, serigrafía, bordado y costuras a medida.
              Todo para llevar tu marca a la calle.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#servicios"
                className="inline-flex items-center gap-3 font-bold text-white rounded-full transition-all duration-300 active:scale-[0.97] group"
                style={{
                  fontSize: '1rem',
                  padding: '14px 28px',
                  background: 'var(--color-brand)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--color-brand-dk)'
                  e.currentTarget.style.boxShadow = '0 8px 28px -4px rgba(249,115,22,0.55)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--color-brand)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Ver Servicios
                <span
                  className="flex items-center justify-center rounded-full w-7 h-7 transition-transform duration-300 group-hover:translate-x-0.5"
                  style={{ background: 'rgba(0,0,0,0.18)' }}
                >
                  <ArrowRight size={14} />
                </span>
              </a>

              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-200"
                style={{
                  fontSize: '0.9375rem',
                  padding: '14px 24px',
                  color: 'rgba(255,255,255,0.65)',
                  border: '1px solid rgba(255,255,255,0.14)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Ver Catálogo
              </a>
            </div>
          </div>

          {/* Right: service showcase */}
          <div
            ref={showcaseRef}
            className="reveal reveal-delay-2 hidden lg:flex flex-col gap-2.5"
          >
            <p
              className="text-[10px] font-black uppercase tracking-widest mb-1"
              style={{ color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em' }}
            >
              Nuestros servicios
            </p>

            {CATALOG.map((cat, i) => (
              <CategoryChip key={cat.id} category={cat} index={i} />
            ))}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              {[
                { value: '+500', label: 'Clientes atendidos' },
                { value: '+5',   label: 'Técnicas de impresión' },
              ].map(s => (
                <div
                  key={s.label}
                  className="rounded-2xl px-4 py-3"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <p
                    className="font-black text-2xl text-white"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: horizontal category strip */}
        <div className="lg:hidden flex gap-2.5 mt-10 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
          {CATALOG.map(cat => (
            <a
              key={cat.id}
              href="#servicios"
              className="shrink-0 flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-150"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: `1px solid ${cat.accent}30`,
              }}
            >
              <div
                className="w-3.5 h-3.5 rounded-sm shrink-0"
                style={{ background: cat.accent }}
              />
              <p className="text-xs font-bold text-white whitespace-nowrap">
                {cat.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
