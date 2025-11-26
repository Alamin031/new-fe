import { HeroBanner } from "./components/home/hero-banner"
import { CategorySlider } from "./components/home/category-slider"
import { FlashSale } from "./components/home/flash-sale"
import { ProductSection } from "./components/home/product-section"
import { BrandSlider } from "./components/home/brand-slider"
import { Navbar } from "./components/layout/navbar"
import { Footer } from "./components/layout/footer"
import { getFeaturedProducts, getNewArrivals, getFlashSaleProducts, mockProducts } from "./lib/mock-data"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const newArrivals = getNewArrivals()
  const flashSaleProducts = getFlashSaleProducts()

  // Set flash sale end time to 24 hours from now
  const flashSaleEndTime = new Date()
  flashSaleEndTime.setHours(flashSaleEndTime.getHours() + 24)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {/* Hero Banner */}
        <section className="mx-auto w-full max-w-7xl px-4 py-6">
          <HeroBanner />
        </section>

        {/* Categories */}
        <section className="mx-auto w-full max-w-7xl px-4 py-8">
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">Shop by Category</h2>
          <CategorySlider />
        </section>

        {/* Flash Sale */}
        <section className="mx-auto w-full max-w-7xl px-4 py-8">
          <FlashSale products={flashSaleProducts} endTime={flashSaleEndTime} />
        </section>

        {/* Featured Products */}
        <section className="mx-auto w-full max-w-7xl px-4 py-8">
          <ProductSection
            title="Featured Products"
            subtitle="Hand-picked premium gadgets for you"
            products={featuredProducts}
            viewAllLink="/products?featured=true"
          />
        </section>

        {/* New Arrivals */}
        <section className="mx-auto w-full max-w-7xl px-4 py-8">
          <ProductSection
            title="New Arrivals"
            subtitle="The latest and greatest just dropped"
            products={newArrivals}
            viewAllLink="/products?new=true"
            badge="New"
          />
        </section>

        {/* Hot Deals */}
        <section className="mx-auto w-full max-w-7xl px-4 py-8">
          <ProductSection
            title="Hot Deals"
            subtitle="Amazing discounts on popular products"
            products={mockProducts.filter((p) => p.originalPrice).slice(0, 5)}
            viewAllLink="/deals"
            badge="Sale"
            badgeColor="bg-[oklch(0.55_0.2_25)]"
          />
        </section>

        {/* Brands */}
        <section className="mx-auto w-full max-w-7xl px-4 py-12">
          <BrandSlider />
        </section>

        {/* Newsletter / CTA Section */}
        <section className="bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Stay Updated</h2>
            <p className="mt-2 text-muted-foreground">
              Get exclusive deals, new arrivals, and tech news delivered to your inbox.
            </p>
            <form className="mx-auto mt-6 flex max-w-md gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm"
              />
              <button
                type="submit"
                className="rounded-lg bg-foreground px-6 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
