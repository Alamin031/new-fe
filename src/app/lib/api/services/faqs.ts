import { apiClient } from "../client"
import { FAQ, CreateFAQRequest, UpdateFAQRequest } from "../types"

export const faqsService = {
  /**
   * Create FAQ (Admin/Management only)
   */
  create: async (data: CreateFAQRequest): Promise<FAQ> => {
    const response = await apiClient.post<FAQ>("/api/faqs", data)
    return response.data
  },

  /**
   * Get all global FAQs
   */
  getAll: async (page = 1, limit = 20): Promise<{ data: FAQ[]; pagination: any }> => {
    const response = await apiClient.get<{ data: FAQ[]; pagination: any }>("/api/faqs", {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get FAQ by ID
   */
  getById: async (id: string): Promise<FAQ> => {
    const response = await apiClient.get<FAQ>(`/api/faqs/${id}`)
    return response.data
  },

  /**
   * Get FAQs by category
   */
  getByCategory: async (category: string, page = 1, limit = 20): Promise<{ data: FAQ[]; pagination: any }> => {
    const response = await apiClient.get<{ data: FAQ[]; pagination: any }>("/api/faqs/category", {
      params: { category, page, limit },
    })
    return response.data
  },

  /**
   * Get FAQs by product
   */
  getByProduct: async (productId: string): Promise<FAQ[]> => {
    const response = await apiClient.get<FAQ[]>("/api/faqs/product", {
      params: { productId },
    })
    return response.data
  },

  /**
   * Get all published FAQs
   */
  getPublished: async (): Promise<FAQ[]> => {
    const response = await apiClient.get<FAQ[]>("/api/faqs/published")
    return response.data
  },

  /**
   * Update FAQ (Admin/Management only)
   */
  update: async (id: string, data: UpdateFAQRequest): Promise<FAQ> => {
    const response = await apiClient.patch<FAQ>(`/api/faqs/${id}`, data)
    return response.data
  },

  /**
   * Delete FAQ (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/faqs/${id}`)
  },

  /**
   * Search FAQs
   */
  search: async (query: string, page = 1, limit = 20): Promise<{ data: FAQ[]; pagination: any }> => {
    const response = await apiClient.get<{ data: FAQ[]; pagination: any }>("/api/faqs/search", {
      params: { query, page, limit },
    })
    return response.data
  },
}

export default faqsService
