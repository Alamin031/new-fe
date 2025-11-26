import { apiClient } from "../client"
import { Warranty, ActivateWarrantyRequest, WarrantyLookupResponse, WarrantyLog } from "../types"

export const warrantyService = {
  /**
   * Activate warranty (Admin/Management only)
   */
  activate: async (data: ActivateWarrantyRequest): Promise<Warranty> => {
    const response = await apiClient.post<Warranty>("/api/warranty/activate", data)
    return response.data
  },

  /**
   * Lookup warranty by IMEI
   */
  lookup: async (imei: string): Promise<WarrantyLookupResponse> => {
    const response = await apiClient.post<WarrantyLookupResponse>("/api/warranty/lookup", { imei })
    return response.data
  },

  /**
   * Get warranty by ID
   */
  getById: async (id: string): Promise<Warranty> => {
    const response = await apiClient.get<Warranty>(`/api/warranty/${id}`)
    return response.data
  },

  /**
   * Get warranty logs (Admin/Management only)
   */
  getLogs: async (id: string, page = 1, limit = 10): Promise<{ data: WarrantyLog[]; pagination: any }> => {
    const response = await apiClient.get<{ data: WarrantyLog[]; pagination: any }>(`/api/warranty/${id}/logs`, {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Claim warranty
   */
  claim: async (id: string, description: string): Promise<Warranty> => {
    const response = await apiClient.post<Warranty>(`/api/warranty/${id}/claim`, { description })
    return response.data
  },

  /**
   * Get user warranties
   */
  getUserWarranties: async (userId: string): Promise<Warranty[]> => {
    const response = await apiClient.get<Warranty[]>(`/api/warranty/user/${userId}`)
    return response.data
  },

  /**
   * Get order warranties
   */
  getOrderWarranties: async (orderId: string): Promise<Warranty[]> => {
    const response = await apiClient.get<Warranty[]>(`/api/warranty/order/${orderId}`)
    return response.data
  },
}

export default warrantyService
