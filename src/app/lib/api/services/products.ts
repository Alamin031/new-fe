import { apiClient } from "../client"
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductListResponse,
  ProductSearchResponse,
  ProductFilters,
} from "../types"

export const productsService = {
  /**
   * Create a new product (Admin/Management only)
   */
  create: async (data: CreateProductRequest): Promise<Product> => {
    const response = await apiClient.post<Product>("/api/products", data)
    return response.data
  },

  /**
   * Get all products with optional filters
   */
  getAll: async (filters?: ProductFilters, page = 1, limit = 20): Promise<ProductListResponse> => {
    const response = await apiClient.get<ProductListResponse>("/api/products", {
      params: {
        page,
        limit,
        ...filters,
      },
    })
    return response.data
  },

  /**
   * Get featured products
   */
  getFeatured: async (limit = 10): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>("/api/products/featured", {
      params: { limit },
    })
    return response.data
  },

  /**
   * Get new products
   */
  getNew: async (limit = 10): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>("/api/products/new", {
      params: { limit },
    })
    return response.data
  },

  /**
   * Get hot products
   */
  getHot: async (limit = 10): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>("/api/products/hot", {
      params: { limit },
    })
    return response.data
  },

  /**
   * Search products
   */
  search: async (query: string, page = 1, limit = 20): Promise<ProductSearchResponse> => {
    const response = await apiClient.get<ProductSearchResponse>("/api/products/search", {
      params: { query, page, limit },
    })
    return response.data
  },

  /**
   * Get product by slug
   */
  getBySlug: async (slug: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/api/products/${slug}`)
    return response.data
  },

  /**
   * Get product by ID
   */
  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/api/products/${id}`)
    return response.data
  },

  /**
   * Update product (Admin/Management only)
   */
  update: async (id: string, data: UpdateProductRequest): Promise<Product> => {
    const response = await apiClient.patch<Product>(`/api/products/${id}`, data)
    return response.data
  },

  /**
   * Delete product (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/products/${id}`)
  },
}

export default productsService
