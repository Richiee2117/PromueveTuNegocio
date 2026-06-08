import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

function GalleryItem({ item, categoryId, accent, categoryTitle, index }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Use the image path from the catalog item if provided, otherwise fall back to a constructed path
  const imagePath = item.image || `/images/productos/${categoryId}/${item.id}.jpg`

  function handleCotizar() {
    addItem({
      id: `${categoryId}-${item.id}`,
      name: `${item.name} — ${categoryTitle}`,
      price: 'Precio a cotizar',
      accent,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div
      className="gallery-item group flex flex-col rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-0.5"
      style={{
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        animationDelay: `${index * 42}ms`,
        fontFamily: 'var(--font-sans)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 16px 32px -10px rgba(0,0,0,0.14)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)'
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '4/3', background: accent + '0D' }}
      >
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 img-placeholder" />
        )}
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: accent + '20' }}
            >
              <ShoppingBag size={18} style={{ color: accent }} strokeWidth={1.5} />
            </div>
            <span
              className="text-xs font-semibold px-3 text-center leading-snug"
              style={{ color: accent + 'CC' }}
            >
              {item.name}
            </span>
          </div>
        ) : (
          <img
            src={imagePath}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 p-3.5 flex-1">
        <h4
          className="font-bold text-sm leading-snug"
          style={{ color: 'var(--color-ink)' }}
        >
          {item.name}
        </h4>
        <button
          onClick={handleCotizar}
          className="mt-auto flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full text-white transition-all duration-200 active:scale-[0.95]"
          style={{ background: added ? '#10B981' : accent }}
        >
          {added ? (
            <><CheckCircle size={11} />Agregado</>
          ) : (
            <><ShoppingBag size={11} />Cotizar</>
          )}
        </button>
      </div>
    </div>
  )
}

export default function CategoryGallery({ category, onClose }) {
  const { setIsOpen } = useCart()

  useEffect(() => {
    if (!category) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', handleKey)
    }
  }, [category, onClose])

  if (!category) return null

  function handleVerCotizacion() {
    onClose()
    // Small delay so the modal closes first, then the cart opens smoothly
    setTimeout(() => setIsOpen(true), 150)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-5"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Backdrop */}
      <div
        className="gallery-backdrop absolute inset-0"
        style={{
          background: 'rgba(12,12,18,0.78)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="gallery-panel relative w-full sm:max-w-5xl flex flex-col overflow-hidden bg-white rounded-t-[28px] sm:rounded-[28px]"
        style={{
          maxHeight: '92dvh',
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.45)',
        }}
      >
        {/* Drag handle — mobile only */}
        <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div
            className="w-9 h-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.18)' }}
          />
        </div>

        {/* Header */}
        <div
          className="flex items-center gap-4 px-5 sm:px-7 py-5 shrink-0"
          style={{
            background: category.bg,
            borderBottom: `1px solid ${category.accent}28`,
          }}
        >
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: category.accent + '22' }}
          >
            <ShoppingBag size={20} style={{ color: category.accent }} strokeWidth={1.75} />
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="font-black uppercase"
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.14em',
                color: category.accent,
              }}
            >
              Catálogo de Productos
            </p>
            <h2
              className="font-black text-lg sm:text-xl leading-tight"
              style={{ color: 'var(--color-ink)', letterSpacing: '-0.01em' }}
            >
              {category.title}
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

        {/* Tagline bar */}
        <div
          className="px-5 sm:px-7 py-3 flex items-center gap-3 shrink-0"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <p className="text-sm flex-1" style={{ color: 'var(--color-ink-2)' }}>
            {category.tagline}
          </p>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
            style={{ background: category.accent + '18', color: category.accent }}
          >
            {category.items.length} artículos
          </span>
        </div>

        {/* Scrollable product grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {category.items.map((item, i) => (
              <GalleryItem
                key={item.id}
                item={item}
                categoryId={category.id}
                accent={category.accent}
                categoryTitle={category.title}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 shrink-0"
          style={{
            borderTop: '1px solid var(--color-border)',
            background: 'var(--color-canvas)',
          }}
        >
          <p
            className="text-xs leading-relaxed hidden sm:block"
            style={{ color: 'var(--color-ink-3)' }}
          >
            Agrega los artículos que te interesan y te cotizamos por WhatsApp
          </p>
          <button
            onClick={handleVerCotizacion}
            className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full text-white transition-all duration-200 ml-auto active:scale-[0.97]"
            style={{ background: category.accent }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Ver mi cotización
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
