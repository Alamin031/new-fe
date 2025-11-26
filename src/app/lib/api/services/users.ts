import { apiClient } from "../client"
import { User, UpdateUserRequest, UserListResponse, Address, Product, Order } from "../types"

export const usersService = {
  /**
   * Get all users (Admin/Management only)
   */
  getAll: async (page = 1, limit = 10): Promise<UserListResponse> => {
    const response = await apiClient.get<UserListResponse>("/api/users/all", {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get paginated users list
   */
  list: async (page = 1, limit = 10): Promise<UserListResponse> => {
    const response = await apiClient.get<UserListResponse>("/api/users", {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>("/api/users/me")
    return response.data
  },

  /**
   * Get user by ID
   */
  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/api/users/${id}`)
    return response.data
  },

  /**
   * Update user profile
   */
  update: async (id: string, data: UpdateUserRequest): Promise<User> => {
    const response = await apiClient.patch<User>(`/api/users/${id}`, data)
    return response.data
  },

  /**
   * Delete user account
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/users/${id}`)
  },

  // ==================== Wishlist ====================

  /**
   * Get user wishlist
   */
  getWishlist: async (userId: string): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(`/api/users/${userId}/wishlist`)
    return response.data
  },

  /**
   * Add product to wishlist
   */
  addToWishlist: async (userId: string, productId: string): Promise<Product[]> => {
    const response = await apiClient.post<Product[]>(`/api/users/${userId}/wishlist`, { productId })
    return response.data
  },

  /**
   * Remove product from wishlist
   */
  removeFromWishlist: async (userId: string, productId: string): Promise<Product[]> => {
    const response = await apiClient.delete<Product[]>(`/api/users/${userId}/wishlist/${productId}`)
    return response.data
  },

  // ==================== Compare ====================

  /**
   * Get user compare list
   */
  getCompareList: async (userId: string): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(`/api/users/${userId}/compare`)
    return response.data
  },

  /**
   * Add product to compare list
   */
  addToCompare: async (userId: string, productId: string): Promise<Product[]> => {
    const response = await apiClient.post<Product[]>(`/api/users/${userId}/compare`, { productId })
    return response.data
  },

  /**
   * Remove product from compare list
   */
  removeFromCompare: async (userId: string, productId: string): Promise<Product[]> => {
    const response = await apiClient.delete<Product[]>(`/api/users/${userId}/compare/${productId}`)
    return response.data
  },

  // ==================== Orders ====================

  /**
   * Get user orders
   */
  getOrders: async (userId: string, page = 1, limit = 10): Promise<{ data: Order[]; pagination: any }> => {
    const response = await apiClient.get<{ data: Order[]; pagination: any }>(`/api/users/${userId}/orders`, {
      params: { page, limit },
    })
    return response.data
  },

  // ==================== Addresses ====================

  /**
   * Get user addresses
   */
  getAddresses: async (userId: string): Promise<Address[]> => {
    const response = await apiClient.get<Address[]>(`/api/users/${userId}/addresses`)
    return response.data
  },

  /**
   * Add new address
   */
  addAddress: async (
    userId: string,
    data: Omit<Address, "id" | "userId" | "createdAt">,
  ): Promise<Address> => {
    const response = await apiClient.post<Address>(`/api/users/${userId}/addresses`, data)
    return response.data
  },

  /**
   * Update address
   */
  updateAddress: async (
    userId: string,
    addressId: string,
    data: Partial<Omit<Address, "id" | "userId">>,
  ): Promise<Address> => {
    const response = await apiClient.patch<Address>(`/api/users/${userId}/addresses/${addressId}`, data)
    return response.data
  },

  /**
   * Delete address
   */
  deleteAddress: async (userId: string, addressId: string): Promise<void> => {
    await apiClient.delete(`/api/users/${userId}/addresses/${addressId}`)
  },
}

export default usersService
