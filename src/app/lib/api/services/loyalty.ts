import { apiClient } from "../client"
import { LoyaltyPoints, LoyaltyTransaction, RedeemLoyaltyRequest, RedeemLoyaltyResponse } from "../types"

export const loyaltyService = {
  /**
   * Get user loyalty points
   */
  getUserPoints: async (userId: string): Promise<LoyaltyPoints> => {
    const response = await apiClient.get<LoyaltyPoints>(`/api/loyalty/${userId}/points`)
    return response.data
  },

  /**
   * Get loyalty points history
   */
  getHistory: async (userId: string, page = 1, limit = 20): Promise<{ data: LoyaltyTransaction[]; pagination: any }> => {
    const response = await apiClient.get<{ data: LoyaltyTransaction[]; pagination: any }>(
      `/api/loyalty/${userId}/history`,
      {
        params: { page, limit },
      },
    )
    return response.data
  },

  /**
   * Redeem loyalty points
   */
  redeem: async (userId: string, data: RedeemLoyaltyRequest): Promise<RedeemLoyaltyResponse> => {
    const response = await apiClient.post<RedeemLoyaltyResponse>(`/api/loyalty/${userId}/redeem`, data)
    return response.data
  },

  /**
   * Get redemption options
   */
  getRedemptionOptions: async (userId: string): Promise<Array<{ points: number; reward: string; description: string }>> => {
    const response = await apiClient.get<Array<{ points: number; reward: string; description: string }>>(
      `/api/loyalty/${userId}/options`,
    )
    return response.data
  },

  /**
   * Check available balance
   */
  getBalance: async (userId: string): Promise<{ availablePoints: number; pendingPoints: number; totalPoints: number }> => {
    const response = await apiClient.get<{ availablePoints: number; pendingPoints: number; totalPoints: number }>(
      `/api/loyalty/${userId}/balance`,
    )
    return response.data
  },

  /**
   * Get tier information
   */
  getTier: async (userId: string): Promise<{ tier: string; earnRate: number; redeemRate: number; benefits: string[] }> => {
    const response = await apiClient.get<{ tier: string; earnRate: number; redeemRate: number; benefits: string[] }>(
      `/api/loyalty/${userId}/tier`,
    )
    return response.data
  },

  /**
   * Manually add points (Admin only)
   */
  addPoints: async (userId: string, points: number, reason: string): Promise<LoyaltyTransaction> => {
    const response = await apiClient.post<LoyaltyTransaction>(`/api/loyalty/${userId}/add-points`, {
      points,
      reason,
    })
    return response.data
  },
}

export default loyaltyService
