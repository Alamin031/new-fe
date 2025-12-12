import { apiClient } from "../client"
import { GiveawayEntry, CreateGiveawayEntryRequest, GiveawayListResponse } from "../types"
import { API_ENDPOINTS } from "../config"

export const giveawaysService = {
  /**
   * Create giveaway entry
   */
  create: async (data: CreateGiveawayEntryRequest): Promise<GiveawayEntry> => {
    // Only send name, phone, email, facebook (no productId/message)
    const payload: CreateGiveawayEntryRequest = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      facebook: data.facebook,
    };
    const response = await apiClient.post<GiveawayEntry>(API_ENDPOINTS.GIVEAWAYS_CREATE, payload);
    return response.data;
  },

  /**
   * Get all giveaway entries (Admin only)
   */
  getAll: async (page = 1, limit = 20): Promise<GiveawayListResponse> => {
    const response = await apiClient.get<GiveawayListResponse>(API_ENDPOINTS.GIVEAWAYS_GET, {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Get giveaway entry by ID
   */
  getById: async (id: string): Promise<GiveawayEntry> => {
    const endpoint = API_ENDPOINTS.GIVEAWAYS_GET_ONE?.replace("{id}", id) || `/giveaways/${id}`;
    const response = await apiClient.get<GiveawayEntry>(endpoint);
    return response.data;
  },

  /**
   * Export giveaway entries (Admin only)
   */
  export: async (format: "csv" | "xlsx" = "csv"): Promise<Blob> => {
    const response = await apiClient.get(API_ENDPOINTS.GIVEAWAYS_EXPORT, {
      params: { format },
      responseType: "blob",
    });
    return response.data;
  },



  /**
   * Delete giveaway entry (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS.GIVEAWAYS_DELETE?.replace("{id}", id) || `/giveaways/${id}`;
    await apiClient.delete(endpoint);
  },
}

export default giveawaysService
