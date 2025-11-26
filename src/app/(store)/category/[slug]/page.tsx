/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { mockCategories, getProductsByCategory, mockProducts } from "../../../lib/mock-data"
import { CategoryFilters } from "../../../components/category/category-filters"
import { CategoryProducts } from "../../../components/category/category-products"
import { CategoryFAQ } from "../../../components/category/category-faq"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = mockCategories.find((c) => c.slug === slug)

  if (!category) {
    return { title: "Category Not Found" }
  }

  return {
    title: `${category.name} - Shop Premium ${category.name}`,
    description: `Browse our collection of premium ${category.name.toLowerCase()}. Best prices, official warranty, and fast delivery.`,
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const category = mockCategories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  // Get products for this category (using mock data - in real app would filter on server)
  const products = getProductsByCategory(slug).length > 0 ? getProductsByCategory(slug) : mockProducts.slice(0, 8)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground">
          Home
        </a>
        <span>/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{category.name}</h1>
        <p className="mt-2 text-muted-foreground">
          Explore our premium collection of {category.name.toLowerCase()}. Official products with warranty and
          competitive prices.
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filters - Sidebar */}
        <aside className="w-full shrink-0 lg:w-64">
          <CategoryFilters />
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <CategoryProducts products={products} />
        </main>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <CategoryFAQ categoryName={category.name} />
      </div>
    </div>
  )
}
