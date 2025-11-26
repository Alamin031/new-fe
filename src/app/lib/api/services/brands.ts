import { apiClient } from "../client"
import { Brand, CreateBrandRequest, UpdateBrandRequest, BrandProductsResponse } from "../types"

export const brandsService = {
  /**
   * Create a new brand (Admin only)
   */
  create: async (data: CreateBrandRequest): Promise<Brand> => {
    const response = await apiClient.post<Brand>("/api/brands", data)
    return response.data
  },

  /**
   * Get all brands
   */
  getAll: async (page = 1, limit = 50): Promise<{ data: Brand[]; pagination: any }> => {
    const response = await apiClient.get<{ data: Brand[]; pagination: any }>("/api/brands", {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get featured brands
   */
  getFeatured: async (): Promise<Brand[]> => {
    const response = await apiClient.get<Brand[]>("/api/brands/featured")
    return response.data
  },

  /**
   * Get brand by slug
   */
  getBySlug: async (slug: string): Promise<Brand> => {
    const response = await apiClient.get<Brand>(`/api/brands/${slug}`)
    return response.data
  },

  /**
   * Get products by brand
   */
  getProducts: async (slug: string, page = 1, limit = 20): Promise<BrandProductsResponse> => {
    const response = await apiClient.get<BrandProductsResponse>(`/api/brands/${slug}/products`, {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Update brand (Admin only)
   */
  update: async (id: string, data: UpdateBrandRequest): Promise<Brand> => {
    const response = await apiClient.patch<Brand>(`/api/brands/${id}`, data)
    return response.data
  },

  /**
   * Delete brand (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/brands/${id}`)
  },
}

export default brandsService
