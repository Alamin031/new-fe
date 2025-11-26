import { apiClient } from "../client"
import { Review, CreateReviewRequest, ReviewListResponse } from "../types"

export const reviewsService = {
  /**
   * Create review (Authenticated users only)
   */
  create: async (data: CreateReviewRequest): Promise<Review> => {
    const response = await apiClient.post<Review>("/api/reviews", data)
    return response.data
  },

  /**
   * Get reviews by product
   */
  getByProduct: async (productId: string, page = 1, limit = 10): Promise<ReviewListResponse> => {
    const response = await apiClient.get<ReviewListResponse>(`/api/reviews/${productId}`, {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get review by ID
   */
  getById: async (id: string): Promise<Review> => {
    const response = await apiClient.get<Review>(`/api/reviews/${id}`)
    return response.data
  },

  /**
   * Update review
   */
  update: async (id: string, data: Partial<CreateReviewRequest>): Promise<Review> => {
    const response = await apiClient.patch<Review>(`/api/reviews/${id}`, data)
    return response.data
  },

  /**
   * Delete review (Admin only)
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/reviews/${id}`)
  },

  /**
   * Mark review as helpful
   */
  markHelpful: async (id: string): Promise<Review> => {
    const response = await apiClient.post<Review>(`/api/reviews/${id}/helpful`)
    return response.data
  },

  /**
   * Mark review as unhelpful
   */
  markUnhelpful: async (id: string): Promise<Review> => {
    const response = await apiClient.post<Review>(`/api/reviews/${id}/unhelpful`)
    return response.data
  },

  /**
   * Get user reviews
   */
  getByUser: async (userId: string, page = 1, limit = 10): Promise<{ data: Review[]; pagination: any }> => {
    const response = await apiClient.get<{ data: Review[]; pagination: any }>("/api/reviews/user", {
      params: { userId, page, limit },
    })
    return response.data
  },

  /**
   * Get verified reviews only
   */
  getVerified: async (productId: string, page = 1, limit = 10): Promise<ReviewListResponse> => {
    const response = await apiClient.get<ReviewListResponse>("/api/reviews/verified", {
      params: { productId, page, limit },
    })
    return response.data
  },
}

export default reviewsService
