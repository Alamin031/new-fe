import { apiClient } from "../client"
import { SEOMetadata, SitemapEntry } from "../types"

export const seoService = {
  /**
   * Get product SEO metadata
   */
  getProductSEO: async (productId: string): Promise<SEOMetadata> => {
    const response = await apiClient.get<SEOMetadata>(`/api/seo/products/${productId}`)
    return response.data
  },

  /**
   * Update product SEO metadata (Admin only)
   */
  updateProductSEO: async (productId: string, data: Partial<SEOMetadata>): Promise<SEOMetadata> => {
    const response = await apiClient.patch<SEOMetadata>(`/api/seo/products/${productId}`, data)
    return response.data
  },

  /**
   * Get category SEO metadata
   */
  getCategorySEO: async (categoryId: string): Promise<SEOMetadata> => {
    const response = await apiClient.get<SEOMetadata>(`/api/seo/categories/${categoryId}`)
    return response.data
  },

  /**
   * Update category SEO metadata (Admin only)
   */
  updateCategorySEO: async (categoryId: string, data: Partial<SEOMetadata>): Promise<SEOMetadata> => {
    const response = await apiClient.patch<SEOMetadata>(`/api/seo/categories/${categoryId}`, data)
    return response.data
  },

  /**
   * Get brand SEO metadata
   */
  getBrandSEO: async (brandId: string): Promise<SEOMetadata> => {
    const response = await apiClient.get<SEOMetadata>(`/api/seo/brands/${brandId}`)
    return response.data
  },

  /**
   * Update brand SEO metadata (Admin only)
   */
  updateBrandSEO: async (brandId: string, data: Partial<SEOMetadata>): Promise<SEOMetadata> => {
    const response = await apiClient.patch<SEOMetadata>(`/api/seo/brands/${brandId}`, data)
    return response.data
  },

  /**
   * Generate sitemap data
   */
  generateSitemap: async (): Promise<SitemapEntry[]> => {
    const response = await apiClient.get<SitemapEntry[]>("/api/seo/sitemap")
    return response.data
  },

  /**
   * Generate robots.txt
   */
  getRobotsTxt: async (): Promise<string> => {
    const response = await apiClient.get("/api/seo/robots.txt", {
      responseType: "text",
    })
    return response.data
  },

  /**
   * Trigger sitemap regeneration (Admin only)
   */
  regenerateSitemap: async (): Promise<{ status: string; url: string }> => {
    const response = await apiClient.post<{ status: string; url: string }>("/api/seo/regenerate-sitemap")
    return response.data
  },

  /**
   * Get schema markup template
   */
  getSchemaMarkup: async (entityType: "product" | "category" | "brand", entityId: string): Promise<Record<string, unknown>> => {
    const response = await apiClient.get<Record<string, unknown>>("/api/seo/schema", {
      params: { entityType, entityId },
    })
    return response.data
  },
}

export default seoService
