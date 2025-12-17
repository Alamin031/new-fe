/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useMemo, useState, useEffect } from "react"
import { useSWRCache } from "@/app/hooks/use-swr-cache"
import { productsService } from "@/app/lib/api/services/products"
import { CategoryProducts } from "@/app/components/category/category-products"
import { Button } from "@/app/components/ui/button"
import type { Product } from "@/app/types"
import { ProductListResponse } from "@/app/lib/api"

interface ProductsListClientProps {
  initialProducts?: Product[]
  totalProducts?: number
  selectedCategories?: string[]
  selectedBrands?: string[]
  allProducts?: Product[]
  categories?: any[]
  brands?: any[]
}

interface BrandLookup {
  [slug: string]: string // slug -> id mapping
}

const PAGE_SIZE = 20

function getLocalFilteredProducts(
  products: Product[],
  categoryIds: string[],
  brandIds: string[],
  page: number
): ProductListResponse {
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  // Filter by categories
  const filteredByCategory = products.filter((product: any) => {
    if (categoryIds.length === 0) return true
    const productCategoryId = product.categoryId
    const productCategoryIds = product.categoryIds as string[] | undefined
    return categoryIds.some(id =>
      productCategoryId === id || productCategoryIds?.includes(id)
    )
  })

  // Filter by brands
  const filteredByBrand = filteredByCategory.filter((product: any) => {
    if (brandIds.length === 0) return true
    const productBrandId = product.brandId
    const productBrandIds = product.brandIds as string[] | undefined
    return brandIds.some(id =>
      productBrandId === id || productBrandIds?.includes(id)
    )
  })

  // Ensure each product has basePrice for compatibility
  const mappedProducts = filteredByBrand.slice(start, end).map((product: any) => ({
    ...product,
    basePrice: product.basePrice ?? product.price ?? 0,
  }))

  return {
    data: mappedProducts,
    pagination: {
      total: filteredByBrand.length,
      page,
      limit: PAGE_SIZE,
      pages: Math.ceil(filteredByBrand.length / PAGE_SIZE),
    },
  } as ProductListResponse
}

export function ProductsListClient({
  initialProducts = [],
  totalProducts = 0,
  selectedCategories = [],
  selectedBrands = [],
  allProducts = [],
  categories = [],
  brands = [],
}: ProductsListClientProps) {
  // Create lookups for faster searching
  const categoryLookup = categories.reduce((acc: any, c: any) => {
    if (c.slug && c.id) acc[c.slug] = c.id
    return acc
  }, {} as Record<string, string>)

  const brandLookup = brands.reduce((acc: BrandLookup, b: any) => {
    if (b.slug && b.id) acc[b.slug] = b.id
    return acc
  }, {} as BrandLookup)

  // Convert slugs to IDs
  const selectedCategoryIds = selectedCategories
    .map(slug => categoryLookup[slug])
    .filter(Boolean) as string[]

  const selectedBrandIds = selectedBrands
    .map(slug => brandLookup[slug])
    .filter(Boolean) as string[]

  // Debug: log if brand/category lookups found matches
  const debugInfo = {
    selectedBrands,
    foundBrandIds: selectedBrandIds,
    selectedCategories,
    foundCategoryIds: selectedCategoryIds,
    totalBrandsAvailable: brands.length,
    totalCategoriesAvailable: categories.length,
  }
  if (selectedBrandIds.length === 0 && selectedBrands.length > 0) {
    console.warn('Brand filter warning: No brand IDs found for slugs:', debugInfo)
  }

  const [currentPage, setCurrentPage] = useState(1)

  // Generate cache key based on current page and filters
  const filterKey = useMemo(
    () => `${selectedCategoryIds.sort().join('_')}_${selectedBrandIds.sort().join('_')}`,
    [selectedCategoryIds, selectedBrandIds]
  )
  const cacheKey = `products_list_${filterKey}_page_${currentPage}`

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filterKey])

  // Fetch products for current page with filters
  const { data: paginatedData, isLoading, error } = useSWRCache<ProductListResponse>(
    cacheKey,
    async () => {
      // When filters are applied, use local filtering instead of API
      // because the API may not support multiple brand/category filtering
      if (selectedBrandIds.length > 0 || selectedCategoryIds.length > 0) {
        return getLocalFilteredProducts(
          allProducts,
          selectedCategoryIds,
          selectedBrandIds,
          currentPage
        )
      }

      // For unfiltered results, try API first
      const filters: any = {}

      try {
        const response = await productsService.getAll(filters, currentPage, PAGE_SIZE)
        return response
      } catch (err) {
        // Fallback to local filtering if API fails
        console.warn('API call failed, using local filtering:', err)
        return getLocalFilteredProducts(
          allProducts,
          selectedCategoryIds,
          selectedBrandIds,
          currentPage
        )
      }
    },
    {
      ttl: 300000, // 5 minutes
      revalidateOnMount: true,
      dedupingInterval: 2000,
    }
  )

  // Get total products from API response, fallback to prop value for initial hydration match
  const displayTotalProducts = paginatedData?.pagination?.total ?? totalProducts ?? 0

  // Calculate pagination values
  const totalPages = displayTotalProducts > 0 ? Math.ceil(displayTotalProducts / PAGE_SIZE) : 0
  const offset = (currentPage - 1) * PAGE_SIZE
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  // Use either fetched data or initial data
  const products = useMemo(() => {
    const mapToAppProduct = (product: any): Product => ({
      ...product,
      images: product.images ?? [],
    })

    // Use fetched data if available and has items
    if (paginatedData?.data && paginatedData.data.length > 0) {
      return paginatedData.data.map(mapToAppProduct)
    }

    // Fallback to initial products on first page
    if (currentPage === 1 && initialProducts.length > 0) {
      return initialProducts.map(mapToAppProduct)
    }

    return []
  }, [paginatedData, initialProducts, currentPage])

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Unable to Load Products</h3>
          <p className="text-red-700 mb-6">We encountered an issue while loading products. Please try again.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700"
            >
              Retry
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-red-300"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Product Count Info */}
      <div className="text-sm text-muted-foreground" suppressHydrationWarning>
        Showing {displayTotalProducts > 0 ? offset + 1 : 0}-{Math.min(offset + PAGE_SIZE, displayTotalProducts)} of{" "}
        {displayTotalProducts} products
      </div>

      {/* Products Grid */}
      <CategoryProducts products={products} isLoading={isLoading} />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={!hasPrevPage || isLoading}
              onClick={handlePrevPage}
            >
              Previous
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(pageNum)}
                    disabled={isLoading}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              disabled={!hasNextPage || isLoading}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  )
}
