import { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Printer, Layers, Scissors, Sparkles, Heart, Info, X } from 'lucide-react'
import { useScrollRevealChildren } from '../hooks/useScrollReveal'
import { CATALOG } from '../data/catalog'
import CategoryGallery from './CategoryGallery'

function InfoModal({ service, onClose }) {
  useEffect(() => {
    if (!service) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', handleKey)
    }
  }, [service, onClose])

  if (!service) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-5"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(12,12,18,0.78)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full sm:max-w-lg flex flex-col overflow-hidden bg-white rounded-t-[28px] sm:rounded-[28px]"
        style={{
          maxHeight: '85dvh',
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.45)',
        }}
      >
        {/* Drag handle — mobile only */}
        <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-9 h-1 rounded-full" style={{ background: 'rgba(0,0,0,0.18)' }} />
        </div>

        {/* Header */}
        <div
          className="flex items-center gap-4 px-5 sm:px-7 py-5 shrink-0"
          style={{
            background: service.bg,
            borderBottom: `1px solid ${service.accent}28`,
          }}
        >
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: service.accent + '22' }}
          >
            <Info size={20} style={{ color: service.accent }} strokeWidth={1.75} />
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="font-black uppercase"
              style={{ fontSize: '0.625rem', letterSpacing: '0.14em', color: service.accent }}
            >
              Acerca de este servicio
            </p>
            <h2
              className="font-black text-lg sm:text-xl leading-tight"
              style={{ color: 'var(--color-ink)', letterSpacing: '-0.01em' }}
            >
              {service.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-150"
            style={{ background: 'rgba(0,0,0,0.07)', color: 'var(--color-ink-2)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.13)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.07)'}
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Description */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-6">
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-ink-2)' }}>
            {service.description}
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

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

function ServiceCard({ service, index, onOpen, onInfo }) {
  const Icon = ICON_MAP[service.id] || Printer
  const span = SPAN_MAP[service.id] || ''

  return (
    <button
      onClick={() => onOpen(service)}
      className={`reveal reveal-delay-${Math.min(index + 1, 5)} group relative text-left w-full rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${span}`}
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
        className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: service.accent + '18' }}
      >
        <Icon size={20} style={{ color: service.accent }} strokeWidth={1.75} />

        <span
          role="button"
          tabIndex={0}
          onClick={(e) => { e.stopPropagation(); onInfo(service) }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              e.stopPropagation()
              onInfo(service)
            }
          }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-150 z-10"
          style={{ background: '#fff', color: service.accent, boxShadow: '0 2px 6px rgba(0,0,0,0.12)', border: `1px solid ${service.accent}33` }}
          onMouseEnter={e => { e.currentTarget.style.background = service.accent; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = service.accent }}
          onFocus={e => { e.currentTarget.style.background = service.accent; e.currentTarget.style.color = '#fff' }}
          onBlur={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = service.accent }}
          aria-label={`Más información sobre ${service.title}`}
        >
          <Info size={13} strokeWidth={2.25} />
        </span>
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
  const [infoCategory, setInfoCategory] = useState(null)
  const handleClose = useCallback(() => setOpenCategory(null), [])
  const handleInfoClose = useCallback(() => setInfoCategory(null), [])

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
                onInfo={setInfoCategory}
              />
            ))}
          </div>
        </div>
      </section>

      <CategoryGallery category={openCategory} onClose={handleClose} />
      <InfoModal service={infoCategory} onClose={handleInfoClose} />
    </>
  )
}
