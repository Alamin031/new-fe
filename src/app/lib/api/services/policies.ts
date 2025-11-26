import { apiClient } from "../client"
import { Policy, CreatePolicyRequest, UpdatePolicyRequest } from "../types"

export const policiesService = {
  /**
   * Create policy (Admin only)
   */
  create: async (data: CreatePolicyRequest): Promise<Policy> => {
    const response = await apiClient.post<Policy>("/api/policies", data)
    return response.data
  },

  /**
   * Get all policies
   */
  getAll: async (page = 1, limit = 20): Promise<{ data: Policy[]; pagination: any }> => {
    const response = await apiClient.get<{ data: Policy[]; pagination: any }>("/api/policies", {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get policy by slug
   */
  getBySlug: async (slug: string): Promise<Policy> => {
    const response = await apiClient.get<Policy>(`/api/policies/${slug}`)
    return response.data
  },

  /**
   * Get policy by ID
   */
  getById: async (id: string): Promise<Policy> => {
    const response = await apiClient.get<Policy>(`/api/policies/${id}`)
    return response.data
  },

  /**
   * Get all published policies
   */
  getPublished: async (): Promise<Policy[]> => {
    const response = await apiClient.get<Policy[]>("/api/policies/published")
    return response.data
  },

  /**
   * Update policy (Admin only)
   */
  update: async (slug: string, data: UpdatePolicyRequest): Promise<Policy> => {
    const response = await apiClient.patch<Policy>(`/api/policies/${slug}`, data)
    return response.data
  },

  /**
   * Delete policy (Admin only)
   */
  delete: async (slug: string): Promise<void> => {
    await apiClient.delete(`/api/policies/${slug}`)
  },
}

export default policiesService
