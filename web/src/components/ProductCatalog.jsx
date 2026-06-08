import { useState } from 'react'
import { ShoppingBag, CheckCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { PRODUCTS, CATEGORIES } from '../data/products'
import { useScrollReveal, useScrollRevealChildren } from '../hooks/useScrollReveal'

function ImageSlot({ src, alt, accent }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-2"
        style={{ background: accent + '0D' }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: accent + '20' }}
        >
          <ShoppingBag size={22} style={{ color: accent }} strokeWidth={1.5} />
        </div>
        <span className="text-xs font-medium" style={{ color: accent + 'AA' }}>
          Imagen próximamente
        </span>
      </div>
    )
  }

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 img-placeholder" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </>
  )
}

function ProductCard({ product, index }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd(e) {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div
      className={`reveal reveal-delay-${Math.min((index % 4) + 1, 5)} group flex flex-col rounded-3xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1`}
      style={{
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        fontFamily: 'var(--font-sans)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 24px 48px -16px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.04)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)'
      }}
    >
      {/* Image area — outer shell (double-bezel) */}
      <div className="p-2.5 pb-0">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            aspectRatio: '4/3',
            background: product.accent + '0A',
            border: `1px solid ${product.accent}18`,
          }}
        >
          <ImageSlot src={product.image} alt={product.name} accent={product.accent} />
          {product.badge && (
            <div
              className="absolute top-3 left-3 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
              style={{
                background: product.accent,
                letterSpacing: '0.06em',
              }}
            >
              {product.badge}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category */}
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: product.accent, letterSpacing: '0.1em' }}
        >
          {product.category}
        </span>

        {/* Title + desc */}
        <div>
          <h3
            className="font-bold text-base leading-snug mb-1.5"
            style={{ color: 'var(--color-ink)' }}
          >
            {product.name}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-2)' }}>
            {product.description}
          </p>
        </div>

        {/* Specs chips */}
        <div className="flex flex-wrap gap-1.5">
          {product.specs.map(spec => (
            <span
              key={spec}
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                background: 'var(--color-canvas)',
                color: 'var(--color-ink-2)',
                border: '1px solid var(--color-border)',
              }}
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div
          className="flex items-center justify-between gap-3 pt-3 mt-auto"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <span
            className="font-black text-xl"
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-sans)' }}
          >
            {product.price}
          </span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full text-white transition-all duration-200 active:scale-[0.96]"
            style={{
              background: added ? '#10B981' : product.accent,
              minWidth: 110,
              justifyContent: 'center',
            }}
          >
            {added ? (
              <>
                <CheckCircle size={14} />
                Agregado
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                Cotizar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState('Todas')
  const headerRef = useScrollReveal()

  const filtered = activeCategory === 'Todas'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory)

  const gridRef = useScrollRevealChildren([activeCategory])

  return (
    <section
      id="catalogo"
      className="py-24 md:py-32"
      style={{ background: 'var(--color-surface)', fontFamily: 'var(--font-sans)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="reveal mb-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-brand)', letterSpacing: '0.14em' }}
          >
            Catálogo
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className="font-black leading-tight"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
              }}
            >
              Elige y cotiza al instante
            </h2>
            <p className="text-sm max-w-xs text-right hidden sm:block" style={{ color: 'var(--color-ink-3)' }}>
              Agrega los productos que te interesan<br />y te enviamos el precio final por WhatsApp.
            </p>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['Todas', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 active:scale-[0.97]"
              style={
                activeCategory === cat
                  ? {
                      background: 'var(--color-ink)',
                      color: '#fff',
                      border: '1px solid var(--color-ink)',
                    }
                  : {
                      background: 'transparent',
                      color: 'var(--color-ink-2)',
                      border: '1px solid var(--color-border)',
                    }
              }
              onMouseEnter={e => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = 'var(--color-ink-3)'
                  e.currentTarget.style.color = 'var(--color-ink)'
                }
              }}
              onMouseLeave={e => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.color = 'var(--color-ink-2)'
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
