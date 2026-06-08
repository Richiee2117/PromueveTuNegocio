import { useState, useCallback } from 'react'
import { Printer, Layers, Scissors, Sparkles, Heart } from 'lucide-react'
import { useScrollRevealChildren } from '../hooks/useScrollReveal'
import { CATALOG } from '../data/catalog'
import CategoryGallery from './CategoryGallery'

const ICON_MAP = {
  dtf:        Printer,
  serigrafia: Layers,
  bordado:    Scissors,
  sublimacion:Sparkles,
  costuras:   Heart,
}

const SPAN_MAP = {
  dtf:        'lg:col-span-2',
  serigrafia: '',
  bordado:    '',
  sublimacion:'lg:col-span-2',
  costuras:   '',
}

function ServiceCard({ service, index, onOpen }) {
  const Icon = ICON_MAP[service.id] || Printer
  const span = SPAN_MAP[service.id] || ''

  return (
    <button
      onClick={() => onOpen(service)}
      className={`reveal reveal-delay-${Math.min(index + 1, 5)} group text-left w-full rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${span}`}
      style={{
        background: service.bg,
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        fontFamily: 'var(--font-sans)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 16px 40px -12px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: service.accent + '18' }}
      >
        <Icon size={20} style={{ color: service.accent }} strokeWidth={1.75} />
      </div>

      <h3
        className="font-bold text-base mb-2 leading-snug"
        style={{ color: 'var(--color-ink)' }}
      >
        {service.title}
      </h3>

      <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-ink-2)' }}>
        {service.tagline}
      </p>

      <div className="flex items-center justify-between gap-3">
        <div
          className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 group-hover:gap-2.5"
          style={{ color: service.accent, letterSpacing: '0.08em' }}
        >
          Ver productos →
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
          style={{ background: service.accent + '18', color: service.accent }}
        >
          {service.items.length} artículos
        </span>
      </div>
    </button>
  )
}

export default function ServicesGrid() {
  const gridRef = useScrollRevealChildren()
  const [openCategory, setOpenCategory] = useState(null)
  const handleClose = useCallback(() => setOpenCategory(null), [])

  return (
    <>
      <section
        id="servicios"
        className="py-24 md:py-32"
        style={{ background: 'var(--color-canvas)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-14 max-w-xl">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-brand)', letterSpacing: '0.14em' }}
            >
              Servicios
            </p>
            <h2
              className="font-black leading-tight"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
              }}
            >
              Todo para promover tu marca
            </h2>
            <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--color-ink-2)' }}>
              Selecciona una categoría para ver todos los artículos disponibles y cotizar al instante.
            </p>
          </div>

          {/* Asymmetric bento grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {CATALOG.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                onOpen={setOpenCategory}
              />
            ))}
          </div>
        </div>
      </section>

      <CategoryGallery category={openCategory} onClose={handleClose} />
    </>
  )
}
