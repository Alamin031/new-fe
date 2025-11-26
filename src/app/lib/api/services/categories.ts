import { apiClient } from "../client"
import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CategoryProductsResponse,
  ProductFilters,
} from "../types"

export const categoriesService = {
  /**
   * Create a new category (Admin only)
   */
  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiClient.post<Category>("/api/categories", data)
    return response.data
  },

  /**
   * Get all categories
   */
  getAll: async (page = 1, limit = 50): Promise<{ data: Category[]; pagination: any }> => {
    const response = await apiClient.get<{ data: Category[]; pagination: any }>("/api/categories", {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get featured categories
   */
  getFeatured: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>("/api/categories/featured")
    return response.data
  },

  /**
   * Get category by slug
   */
  getBySlug: async (slug: string): Promise<Category> => {
    const response = await apiClient.get<Category>(`/api/categories/${slug}`)
    return response.data
  },

  /**
   * Get products in category with filters
   */
  getProducts: async (
    slug: string,
    filters?: ProductFilters,
    page = 1,
    limit = 20,
  ): Promise<CategoryProductsResponse> => {
    const response = await apiClient.get<CategoryProductsResponse>(`/api/categories/${slug}/products`, {
      params: {
        page,
        limit,
        ...filters,
      },
    })
    return response.data
  },

  /**
   * Update category (Admin only)
   */
  update: async (id: string, data: UpdateCategoryRequest): Promise<Category> => {
    const response = await apiClient.patch<Category>(`/api/categories/${id}`, data)
    return response.data
  },

  /**
   * Delete category (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/categories/${id}`)
  },
}

export default categoriesService
