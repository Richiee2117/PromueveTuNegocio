import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

function IconInstagram({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconFacebook({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const NAV = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Catálogo', href: '#catalogo' },
]

const SERVICES = [
  'DTF Textil y UV',
  'Serigrafía',
  'Bordado',
  'Sublimación',
  'Costuras para Guarderías',
]

export default function Footer() {
  const ref = useScrollReveal()

  return (
    <footer
      id="contacto"
      style={{ background: 'var(--color-ink)', fontFamily: 'var(--font-sans)' }}
    >
      <div ref={ref} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">

        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <div
                className="inline-flex items-center px-3 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.96)' }}
              >
                <img
                  src="/images/Front_Page/Logo_frontpage.webp"
                  alt="Promueve tu Negocio"
                  className="object-contain"
                  style={{ height: '36px', width: 'auto', maxWidth: '150px' }}
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Artículos promocionales y publicidad exterior en Hermosillo, Sonora.
              Tu marca a la calle.
            </p>
            <div className="flex gap-2">
              {[
                { icon: <MessageCircle size={16} />, href: 'https://wa.me/526313033296', accent: '#25D366' },
                { icon: <IconInstagram size={16} />, href: 'https://instagram.com/promuevenegocios', accent: 'rgba(255,255,255,0.7)' },
                { icon: <IconFacebook size={16} />, href: 'https://facebook.com/promuevenegocios', accent: 'rgba(255,255,255,0.7)' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    color: social.accent,
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4
              className="font-bold text-xs uppercase tracking-widest mb-5"
              style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}
            >
              Navegación
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-brand)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-bold text-xs uppercase tracking-widest mb-5"
              style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}
            >
              Servicios
            </h4>
            <ul className="flex flex-col gap-3">
              {SERVICES.map(s => (
                <li key={s}>
                  <a
                    href="#servicios"
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold text-xs uppercase tracking-widest mb-5"
              style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}
            >
              Contacto
            </h4>
            <ul className="flex flex-col gap-4 mb-7">
              <li className="flex gap-3 items-start">
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--color-brand)' }} />
                <span className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Hermosillo, Sonora, México
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <Phone size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--color-brand)' }} />
                <a
                  href="https://wa.me/526313033296"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors duration-150"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-brand)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >
                  631 303 3296
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <Mail size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--color-brand)' }} />
                <a
                  href="mailto:contacto@promuevenegocios.com"
                  className="text-sm transition-colors duration-150"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >
                  contacto@promuevenegocios.com
                </a>
              </li>
            </ul>

            <a
              href="https://wa.me/526313033296?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full text-white transition-all duration-200"
              style={{ background: '#25D366' }}
              onMouseEnter={e => e.currentTarget.style.background = '#1db954'}
              onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
            >
              <MessageCircle size={14} />
              Escríbenos
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} Promueve tu Negocio. Todos los derechos reservados.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Hermosillo, Sonora, México
          </p>
        </div>
      </div>
    </footer>
  )
}
