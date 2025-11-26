import apiClient from "../client"
import { API_ENDPOINTS } from "../config"
import type { Category, Product } from "../types"

type ApiResponse<T> = {
  data: T
}

type PaginatedResponse<T> = {
  data: T[]
  meta?: {
    total?: number
    page?: number
    limit?: number
    [key: string]: unknown
  }
}

export class CategoriesService {
  /**
   * Create category (Admin only)
   */
  static async createCategory(data: Partial<Category>): Promise<Category> {
    const response = await apiClient.post<ApiResponse<Category>>(
      API_ENDPOINTS.CATEGORIES_CREATE,
      data
    )
    return response.data.data!
  }

  /**
   * Get all categories
   */
  static async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<ApiResponse<Category[]>>(API_ENDPOINTS.CATEGORIES_GET)
    return response.data.data!
  }

  /**
   * Get featured categories
   */
  static async getFeaturedCategories(): Promise<Category[]> {
    const response = await apiClient.get<ApiResponse<Category[]>>(
      API_ENDPOINTS.CATEGORIES_FEATURED
    )
    return response.data.data!
  }

  /**
   * Get category by slug
   */
  static async getCategoryBySlug(slug: string): Promise<Category> {
    const response = await apiClient.get<ApiResponse<Category>>(
      API_ENDPOINTS.CATEGORIES_SLUG.replace("{slug}", slug)
    )
    return response.data.data!
  }

  /**
   * Get products in category
   */
  static async getCategoryProducts(
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
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
      API_ENDPOINTS.CATEGORIES_PRODUCTS.replace("{slug}", slug),
      { params: filters }
    )
    return response.data.data!
  }

  /**
   * Update category (Admin only)
   */
  static async updateCategory(
    id: string,
    data: Partial<Category>
  ): Promise<Category> {
    const response = await apiClient.patch<ApiResponse<Category>>(
      API_ENDPOINTS.CATEGORIES_UPDATE.replace("{id}", id),
      data
    )
    return response.data.data!
  }

  /**
   * Delete category (Admin only)
   */
  static async deleteCategory(id: string): Promise<void> {
    await apiClient.delete(
      API_ENDPOINTS.CATEGORIES_DELETE.replace("{id}", id)
    )
  }
}

export default CategoriesService
