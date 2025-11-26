import apiClient from "../client"
import { API_ENDPOINTS } from "../config"
import type { Product, ProductFilters, PaginatedResponse } from "../types"

export class ProductsService {
  /**
   * Create product (Admin/Management only)
   */
  static async createProduct(data: Partial<Product>): Promise<Product> {
    const response = await apiClient.post<{ data: Product }>(
      API_ENDPOINTS.PRODUCTS_CREATE,
      data
    )
    return response.data.data!
  }

  /**
   * Get all products with optional filters
   */
  static async getProducts(
    filters?: ProductFilters
  ): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<{ data: PaginatedResponse<Product> }>(
      API_ENDPOINTS.PRODUCTS_GET,
      { params: filters }
    )
    return response.data.data!
  }

  /**
   * Get featured products
   */
  static async getFeaturedProducts(): Promise<Product[]> {
    const response = await apiClient.get<{ data: Product[] }>(
      API_ENDPOINTS.PRODUCTS_FEATURED
    )
    return response.data.data!
  }

  /**
   * Get new products
   */
  static async getNewProducts(): Promise<Product[]> {
    const response = await apiClient.get<{ data: Product[] }>(
      API_ENDPOINTS.PRODUCTS_NEW
    )
    return response.data.data!
  }

  /**
   * Get hot/trending products
   */
  static async getHotProducts(): Promise<Product[]> {
    const response = await apiClient.get<{ data: Product[] }>(
      API_ENDPOINTS.PRODUCTS_HOT
    )
    return response.data.data!
  }

  /**
   * Search products
   */
  static async searchProducts(
    query: string,
    filters?: ProductFilters
  ): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<{ data: PaginatedResponse<Product> }>(
      API_ENDPOINTS.PRODUCTS_SEARCH,
      { params: { ...filters, search: query } }
    )
    return response.data.data!
  }

  /**
   * Get product by slug
   */
  static async getProductBySlug(slug: string): Promise<Product> {
    const response = await apiClient.get<{ data: Product }>(
      API_ENDPOINTS.PRODUCTS_SLUG.replace("{slug}", slug)
    )
    return response.data.data!
  }

  /**
   * Update product (Admin/Management only)
   */
  static async updateProduct(
    id: string,
    data: Partial<Product>
  ): Promise<Product> {
    const response = await apiClient.patch<{ data: Product }>(
      API_ENDPOINTS.PRODUCTS_UPDATE.replace("{id}", id),
      data
    )
    return response.data.data!
  }

  /**
   * Delete product (Admin only)
   */
  static async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(
      API_ENDPOINTS.PRODUCTS_DELETE.replace("{id}", id)
    )
  }
}

export default ProductsService
