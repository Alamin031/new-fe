import apiClient from "../client"
import { API_ENDPOINTS } from "../config"
import type { Brand, Product } from "../types"

type PaginatedResponse<T> = {
  data: T[]
  meta?: {
    total?: number
    page?: number
    limit?: number
  }
}

export class BrandsService {
  /**
   * Create brand (Admin only)
   */
  static async createBrand(data: Partial<Brand>): Promise<Brand> {
    const response = await apiClient.post<{ data: Brand }>(
      API_ENDPOINTS.BRANDS_CREATE,
      data
    )
    return response.data.data!
  }

  /**
   * Get all brands
   */
  static async getBrands(): Promise<Brand[]> {
    const response = await apiClient.get<{ data: Brand[] }>(API_ENDPOINTS.BRANDS_GET)
    return response.data.data!
  }

  /**
   * Get featured brands
   */
  static async getFeaturedBrands(): Promise<Brand[]> {
    const response = await apiClient.get<{ data: Brand[] }>(API_ENDPOINTS.BRANDS_FEATURED)
    return response.data.data!
  }

  /**
   * Get brand by slug
   */
  static async getBrandBySlug(slug: string): Promise<Brand> {
    const response = await apiClient.get<{ data: Brand }>(
      API_ENDPOINTS.BRANDS_SLUG.replace("{slug}", slug)
    )
    return response.data.data!
  }

  /**
   * Get products by brand
   */
  static async getBrandProducts(
    slug: string,
    filters?: {
      minPrice?: number
      maxPrice?: number
      rating?: number
      sortBy?: string
      page?: number
      limit?: number
    }
  ): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<{ data: PaginatedResponse<Product> }>(
      API_ENDPOINTS.BRANDS_PRODUCTS.replace("{slug}", slug),
      { params: filters }
    )
    return response.data.data!
  }

  /**
   * Update brand (Admin only)
   */
  static async updateBrand(id: string, data: Partial<Brand>): Promise<Brand> {
    const response = await apiClient.patch<{ data: Brand }>(
      API_ENDPOINTS.BRANDS_UPDATE.replace("{id}", id),
      data
    )
    return response.data.data!
  }

  /**
   * Delete brand (Admin only)
   */
  static async deleteBrand(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.BRANDS_DELETE.replace("{id}", id))
  }
}

export default BrandsService
