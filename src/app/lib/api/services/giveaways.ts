import { apiClient } from "../client"
import { GiveawayEntry, CreateGiveawayEntryRequest, GiveawayListResponse } from "../types"

export const giveawaysService = {
  /**
   * Create giveaway entry
   */
  create: async (data: CreateGiveawayEntryRequest): Promise<GiveawayEntry> => {
    const response = await apiClient.post<GiveawayEntry>("/api/giveaways", data)
    return response.data
  },

  /**
   * Get all giveaway entries (Admin only)
   */
  getAll: async (page = 1, limit = 20): Promise<GiveawayListResponse> => {
    const response = await apiClient.get<GiveawayListResponse>("/api/giveaways", {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get giveaway entry by ID
   */
  getById: async (id: string): Promise<GiveawayEntry> => {
    const response = await apiClient.get<GiveawayEntry>(`/api/giveaways/${id}`)
    return response.data
  },

  /**
   * Export giveaway entries (Admin only)
   */
  export: async (format: "csv" | "xlsx" = "csv"): Promise<Blob> => {
    const response = await apiClient.get("/api/giveaways/export", {
      params: { format },
      responseType: "blob",
    })
    return response.data
  },

  /**
   * Get giveaway entries by product
   */
  getByProduct: async (productId: string, page = 1, limit = 20): Promise<GiveawayListResponse> => {
    const response = await apiClient.get<GiveawayListResponse>("/api/giveaways/product", {
      params: { productId, page, limit },
    })
    return response.data
  },

  /**
   * Delete giveaway entry (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/giveaways/${id}`)
  },
}

export default giveawaysService
