import apiClient from "../client"
import { API_ENDPOINTS } from "../config"
import type {
  User,
  UserProfile,
  WishlistItem,
  CompareItem,
  Order,
  PaginatedResponse,
} from "../types"

export class UsersService {
  /**
   * Get all users (Admin only)
   */
  static async getAllUsers(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<PaginatedResponse<User>>(
      API_ENDPOINTS.USERS_GET_ALL,
      {
        params: { page, limit, search },
      }
    )
    return response.data
  }

  /**
   * Get current user profile
   */
  static async getMe(): Promise<UserProfile> {
    const response = await apiClient.get<{ data: UserProfile }>(API_ENDPOINTS.USERS_ME)
    return response.data.data!
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string): Promise<User> {
    const response = await apiClient.get<{ data: User }>(
      API_ENDPOINTS.USERS_GET.replace("{id}", userId)
    )
    return response.data.data!
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    userId: string,
    data: Partial<UserProfile>
  ): Promise<UserProfile> {
    const response = await apiClient.patch<{ data: UserProfile }>(
      API_ENDPOINTS.USERS_UPDATE.replace("{id}", userId),
      data
    )
    return response.data.data!
  }

  /**
   * Delete user account
   */
  static async deleteAccount(userId: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.USERS_DELETE.replace("{id}", userId))
  }

  /**
   * Get user's wishlist
   */
  static async getWishlist(userId: string): Promise<WishlistItem[]> {
    const response = await apiClient.get<{ data: WishlistItem[] }>(
      API_ENDPOINTS.USERS_WISHLIST_GET.replace("{id}", userId)
    )
    return response.data.data!
  }

  /**
   * Add product to wishlist
   */
  static async addToWishlist(
    userId: string,
    productId: string
  ): Promise<WishlistItem> {
    const response = await apiClient.post<{ data: WishlistItem }>(
      API_ENDPOINTS.USERS_WISHLIST_ADD.replace("{id}", userId),
      { productId }
    )
    return response.data.data!
  }

  /**
   * Remove product from wishlist
   */
  static async removeFromWishlist(
    userId: string,
    productId: string
  ): Promise<void> {
    await apiClient.delete(
      API_ENDPOINTS.USERS_WISHLIST_DELETE.replace("{id}", userId).replace(
        "{productId}",
        productId
      )
    )
  }

  /**
   * Get user's comparison list
   */
  static async getCompareList(userId: string): Promise<CompareItem[]> {
    const response = await apiClient.get<{ data: CompareItem[] }>(
      API_ENDPOINTS.USERS_COMPARE_GET.replace("{id}", userId)
    )
    return response.data.data!
  }

  /**
   * Add product to comparison
   */
  static async addToCompare(
    userId: string,
    productId: string
  ): Promise<CompareItem> {
    const response = await apiClient.post<{ data: CompareItem }>(
      API_ENDPOINTS.USERS_COMPARE_ADD.replace("{id}", userId),
      { productId }
    )
    return response.data.data!
  }

  /**
   * Remove product from comparison
   */
  static async removeFromCompare(
    userId: string,
    productId: string
  ): Promise<void> {
    await apiClient.delete(
      API_ENDPOINTS.USERS_COMPARE_DELETE.replace("{id}", userId).replace(
        "{productId}",
        productId
      )
    )
  }

  /**
   * Get user's orders
   */
  static async getUserOrders(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Order>> {
    const response = await apiClient.get<PaginatedResponse<Order>>(
      API_ENDPOINTS.USERS_ORDERS.replace("{id}", userId),
      {
        params: { page, limit },
      }
    )
    return response.data
  }

  /**
   * Create user (Admin only)
   */
  static async createUser(data: Partial<User>): Promise<User> {
    const response = await apiClient.post<{ data: User }>(
      API_ENDPOINTS.USERS_CREATE,
      data
    )
    return response.data.data!
  }
}

export default UsersService
