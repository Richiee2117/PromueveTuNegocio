import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicesGrid from './components/ServicesGrid'
import ProductCatalog from './components/ProductCatalog'
import QuoteCart from './components/QuoteCart'
import Footer from './components/Footer'
import './index.css'

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main>
          <Hero />
          <ServicesGrid />
          <ProductCatalog />
        </main>
        <Footer />
        <QuoteCart />
      </div>
    </CartProvider>
  )
}
