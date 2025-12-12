import { apiClient } from "../client"
import { User, UpdateUserRequest, UserListResponse, Address, Product, Order } from "../types"
import { API_ENDPOINTS } from "../config"

export const usersService = {
  /**
   * Get all users (Admin/Management only)
   */
  getAll: async (page = 1, limit = 10): Promise<UserListResponse> => {
    const response = await apiClient.get<UserListResponse>(API_ENDPOINTS.USERS_GET_ALL, {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get paginated users list
   */
  list: async (page = 1, limit = 10): Promise<UserListResponse> => {
    const response = await apiClient.get<UserListResponse>(API_ENDPOINTS.USERS_GET_ALL, {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>(API_ENDPOINTS.USERS_ME)
    return response.data
  },

  /**
   * Get user by ID
   */
  getById: async (id: string): Promise<User> => {
    const endpoint = API_ENDPOINTS.USERS_GET.replace("{id}", id)
    const response = await apiClient.get<User>(endpoint)
    return response.data
  },

  /**
   * Update user profile
   */
  update: async (id: string, data: UpdateUserRequest | FormData): Promise<User> => {
    const endpoint = API_ENDPOINTS.USERS_UPDATE.replace("{id}", id);
    let response;
    if (data instanceof FormData) {
      response = await apiClient.patch<User>(endpoint, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      response = await apiClient.patch<User>(endpoint, data);
    }
    return response.data;
  },

  /**
   * Delete user account
   */
  delete: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS.USERS_DELETE.replace("{id}", id)
    await apiClient.delete(endpoint)
  },

  // ==================== Wishlist ====================

  /**
   * Get user wishlist
   */
  getWishlist: async (userId: string): Promise<Product[]> => {
    const endpoint = API_ENDPOINTS.USERS_WISHLIST_GET.replace("{id}", userId)
    const response = await apiClient.get<Product[]>(endpoint)
    return response.data
  },

  /**
   * Add product to wishlist
   */
  addToWishlist: async (userId: string, productId: string): Promise<Product[]> => {
    const endpoint = API_ENDPOINTS.USERS_WISHLIST_ADD.replace("{id}", userId)
    const response = await apiClient.post<Product[]>(endpoint, { productId })
    return response.data
  },

  /**
   * Remove product from wishlist
   */
  removeFromWishlist: async (userId: string, productId: string): Promise<Product[]> => {
    const endpoint = API_ENDPOINTS.USERS_WISHLIST_DELETE.replace("{id}", userId).replace("{productId}", productId)
    const response = await apiClient.delete<Product[]>(endpoint)
    return response.data
  },

  // ==================== Compare ====================

  /**
   * Get user compare list
   */
  getCompareList: async (userId: string): Promise<Product[]> => {
    const endpoint = API_ENDPOINTS.USERS_COMPARE_GET.replace("{id}", userId)
    const response = await apiClient.get<Product[]>(endpoint)
    return response.data
  },

  /**
   * Add product to compare list
   */
  addToCompare: async (userId: string, productId: string): Promise<Product[]> => {
    const endpoint = API_ENDPOINTS.USERS_COMPARE_ADD.replace("{id}", userId)
    const response = await apiClient.post<Product[]>(endpoint, { productId })
    return response.data
  },

  /**
   * Remove product from compare list
   */
  removeFromCompare: async (userId: string, productId: string): Promise<Product[]> => {
    const endpoint = API_ENDPOINTS.USERS_COMPARE_DELETE.replace("{id}", userId).replace("{productId}", productId)
    const response = await apiClient.delete<Product[]>(endpoint)
    return response.data
  },

  // ==================== Orders ====================

  /**
   * Get user orders
   */
  getOrders: async (userId: string, page = 1, limit = 10): Promise<{ data: Order[]; pagination: unknown }> => {
    const endpoint = API_ENDPOINTS.USERS_ORDERS.replace("{id}", userId)
    const response = await apiClient.get<{ data: Order[]; pagination: unknown }>(endpoint, {
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
