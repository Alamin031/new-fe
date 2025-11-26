import apiClient from "../client"
import { API_ENDPOINTS } from "../config"
import { TokenManager } from "../token-manager"
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  SocialLoginRequest,
  User,
  ApiResponse,
} from "../types"

export class AuthService {
  /**
   * Register a new user
   */
  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH_REGISTER,
      data
    )

    if (response.data.data) {
      const { token, refreshToken } = response.data.data
      TokenManager.setTokens(token, refreshToken)
    }

    return response.data.data!
  }

  /**
   * Login with email and password
   */
  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH_LOGIN,
      data
    )

    if (response.data.data) {
      const { token, refreshToken } = response.data.data
      TokenManager.setTokens(token, refreshToken)
    }

    return response.data.data!
  }

  /**
   * Login with social provider
   */
  static async socialLogin(data: SocialLoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH_SOCIAL_LOGIN,
      data
    )

    if (response.data.data) {
      const { token, refreshToken } = response.data.data
      TokenManager.setTokens(token, refreshToken)
    }

    return response.data.data!
  }

  /**
   * Refresh access token
   */
  static async refreshToken(): Promise<string> {
    const refreshToken = TokenManager.getRefreshToken()
    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    const response = await apiClient.post<ApiResponse<{ token: string; refreshToken?: string }>>(
      API_ENDPOINTS.AUTH_REFRESH,
      { refreshToken }
    )

    if (response.data.data) {
      const { token, refreshToken: newRefreshToken } = response.data.data
      TokenManager.setTokens(token, newRefreshToken || refreshToken)
      return token
    }

    throw new Error("Failed to refresh token")
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH_LOGOUT)
    } finally {
      TokenManager.clearTokens()
    }
  }

  /**
   * Get current user info
   */
  static async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.USERS_ME)
    return response.data.data!
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return TokenManager.hasToken() && !TokenManager.isTokenExpired()
  }

  /**
   * Get authentication token
   */
  static getToken(): string | null {
    return TokenManager.getToken()
  }

  /**
   * Get user role from token
   */
  static getUserRole(): string | null {
    return TokenManager.getUserRole()
  }

  /**
   * Check if user is admin
   */
  static isAdmin(): boolean {
    const role = this.getUserRole()
    return role === "admin"
  }

  /**
   * Check if user is manager
   */
  static isManager(): boolean {
    const role = this.getUserRole()
    return role === "manager" || role === "admin"
  }
}

export default AuthService
