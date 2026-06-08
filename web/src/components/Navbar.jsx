import { useState, useEffect } from 'react'
import { ShoppingBag, X, Menu } from 'lucide-react'
import { useCart } from '../context/CartContext'

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div
        className="sticky top-3 z-50 px-4"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <nav
          className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2.5 rounded-full transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(226,232,240,0.7)',
            boxShadow: scrolled
              ? '0 8px 32px -8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.04)'
              : '0 2px 12px -4px rgba(0,0,0,0.06)',
          }}
        >
          {/* Logo */}
          <a href="#inicio" className="flex items-center shrink-0">
            <img
              src="/images/Front_Page/Logo_frontpage.webp"
              alt="Promueve tu Negocio"
              className="object-contain"
              style={{ height: '40px', width: 'auto', maxWidth: '160px' }}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200"
                style={{ color: 'var(--color-ink-2)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-ink)'
                  e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--color-ink-2)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — CTA + hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full text-white transition-all duration-200 active:scale-[0.97]"
              style={{ background: 'var(--color-brand)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-brand-dk)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-brand)'}
            >
              <ShoppingBag size={15} />
              <span className="hidden sm:inline">Cotización</span>
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--color-ink)', width: 18, height: 18 }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full transition-colors"
              style={{ color: 'var(--color-ink-2)' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col"
          style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-bold py-3 w-full text-center rounded-2xl transition-colors duration-150"
                style={{
                  color: 'var(--color-ink)',
                  transitionDelay: `${i * 50}ms`,
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-brand)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-ink)'}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pb-12 flex justify-center">
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.06)' }}
              onClick={() => setMenuOpen(false)}
            >
              <X size={20} style={{ color: 'var(--color-ink)' }} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
