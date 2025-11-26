import { apiClient } from "../client"
import { AuthResponse, LoginRequest, RegisterRequest, SocialLoginRequest } from "../types"

export const authService = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/api/auth/register", data)
    return response.data
  },

  /**
   * Login with email and password
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/api/auth/login", data)
    return response.data
  },

  /**
   * Login with social provider (Google/Facebook)
   */
  socialLogin: async (data: SocialLoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/api/auth/social-login", data)
    return response.data
  },
}

export default authService
