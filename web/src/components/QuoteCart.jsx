import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

const WHATSAPP_NUMBER = '526313033296'

function buildWhatsAppMessage(items) {
  const lines = items.map(i => `  • ${i.qty}x ${i.name} (${i.price})`)
  const body = [
    'Hola, me gustaría cotizar los siguientes productos:',
    '',
    ...lines,
    '',
    '¿Me pueden dar más información y precio final?',
  ].join('\n')
  return encodeURIComponent(body)
}

export default function QuoteCart() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, clearCart } = useCart()

  function handleWhatsApp() {
    const msg = buildWhatsAppMessage(items)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 transition-all duration-300"
        style={{
          background: 'rgba(24,24,27,0.55)',
          backdropFilter: isOpen ? 'blur(3px)' : 'none',
          WebkitBackdropFilter: isOpen ? 'blur(3px)' : 'none',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s cubic-bezier(0.32,0.72,0,1)',
        }}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 flex flex-col bg-white"
        style={{
          boxShadow: '-24px 0 64px -16px rgba(0,0,0,0.16)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.32,0.72,0,1)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--color-brand-bg)' }}
            >
              <ShoppingBag size={16} style={{ color: 'var(--color-brand)' }} />
            </div>
            <div>
              <h2
                className="font-bold text-sm leading-none"
                style={{ color: 'var(--color-ink)' }}
              >
                Mi Cotización
              </h2>
              {items.length > 0 && (
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-3)' }}>
                  {items.length} producto{items.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150"
            style={{ color: 'var(--color-ink-3)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-canvas)'
              e.currentTarget.style.color = 'var(--color-ink)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-ink-3)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-12">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{ background: 'var(--color-canvas)', border: '1px solid var(--color-border)' }}
              >
                <ShoppingBag size={32} style={{ color: 'var(--color-ink-3)' }} strokeWidth={1.25} />
              </div>
              <div>
                <p
                  className="font-bold text-base mb-1"
                  style={{ color: 'var(--color-ink)' }}
                >
                  Tu cotización está vacía
                </p>
                <p className="text-sm" style={{ color: 'var(--color-ink-3)' }}>
                  Agrega productos del catálogo para comenzar
                </p>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(() => {
                    const el = document.getElementById('catalogo')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }, 300)
                }}
                className="text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-150"
                style={{
                  background: 'var(--color-canvas)',
                  color: 'var(--color-ink)',
                  border: '1px solid var(--color-border)',
                }}
              >
                Ver catálogo
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map(item => (
                <li
                  key={item.id}
                  className="flex gap-4 p-4 rounded-2xl"
                  style={{
                    background: 'var(--color-canvas)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {/* Color accent dot */}
                  <div
                    className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center"
                    style={{ background: (item.accent || 'var(--color-brand)') + '18' }}
                  >
                    <ShoppingBag size={18} style={{ color: item.accent || 'var(--color-brand)' }} strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-sm leading-snug truncate mb-0.5"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="font-bold text-sm"
                      style={{ color: item.accent || 'var(--color-brand)' }}
                    >
                      {item.price}
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2.5">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-150"
                        style={{
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-ink-2)',
                        }}
                      >
                        <Minus size={10} />
                      </button>
                      <span
                        className="text-sm font-bold w-5 text-center"
                        style={{ color: 'var(--color-ink)' }}
                      >
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-150"
                        style={{
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-ink-2)',
                        }}
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start p-1.5 rounded-lg transition-colors duration-150"
                    style={{ color: 'var(--color-ink-3)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#EF4444'
                      e.currentTarget.style.background = '#FEF2F2'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--color-ink-3)'
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-5 flex flex-col gap-3"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <p className="text-xs text-center" style={{ color: 'var(--color-ink-3)' }}>
              Te contactaremos con precios finales y disponibilidad.
            </p>
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2.5 font-bold text-white py-4 rounded-2xl transition-all duration-200 active:scale-[0.98]"
              style={{
                background: '#25D366',
                fontSize: '0.9375rem',
                boxShadow: '0 4px 16px -4px rgba(37,211,102,0.5)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#1db954'}
              onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
            >
              <MessageCircle size={19} />
              Enviar por WhatsApp
            </button>
            <button
              onClick={clearCart}
              className="text-sm text-center py-1.5 rounded-xl transition-colors duration-150"
              style={{ color: 'var(--color-ink-3)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-ink-2)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-ink-3)'}
            >
              Vaciar cotización
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
