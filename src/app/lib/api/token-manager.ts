import { STORAGE_KEYS } from "./config"

export class TokenManager {
  /**
   * Get the current access token
   */
  static getToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(STORAGE_KEYS.TOKEN)
  }

  /**
   * Get the refresh token
   */
  static getRefreshToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
  }

  /**
   * Set tokens in localStorage
   */
  static setTokens(token: string, refreshToken?: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.TOKEN, token)
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
    }
      // Set cookies
      document.cookie = `access_token=${token}; path=/;`;
      if (refreshToken) {
        document.cookie = `refresh_token=${refreshToken}; path=/;`;
      }
  }

  /**
   * Clear all tokens
   */
  static clearTokens(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
      // Remove cookies by setting expiry in past
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  /**
   * Check if token exists
   */
  static hasToken(): boolean {
    return !!this.getToken()
  }

  /**
   * Decode JWT token (without verification - frontend only)
   */
  static decodeToken(token?: string): Record<string, unknown> | null {
    try {
      const jwtToken = token || this.getToken()
      if (!jwtToken) return null

      const parts = jwtToken.split(".")
      if (parts.length !== 3) return null

      const payload = JSON.parse(atob(parts[1]))
      return payload
    } catch (error) {
      console.error("Failed to decode token:", error)
      return null
    }
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(token?: string): boolean {
    try {
      const payload = this.decodeToken(token)
      if (!payload || !payload.exp) return true

      const expirationTime = (payload.exp as number) * 1000
      return Date.now() >= expirationTime
    } catch (error) {
      return true
    }
  }

  /**
   * Get time until token expiration (in seconds)
   */
  static getTimeUntilExpiration(token?: string): number {
    try {
      const payload = this.decodeToken(token)
      if (!payload || !payload.exp) return -1

      const expirationTime = (payload.exp as number) * 1000
      const timeUntilExpiration = Math.floor((expirationTime - Date.now()) / 1000)
      return Math.max(0, timeUntilExpiration)
    } catch (error) {
      return -1
    }
  }

  /**
   * Get user ID from token
   */
  static getUserId(token?: string): string | null {
    try {
      const payload = this.decodeToken(token)
      return (payload?.sub || payload?.userId || payload?.id) as string | null
    } catch (error) {
      return null
    }
  }

  /**
   * Get user role from token
   */
  static getUserRole(token?: string): string | null {
    try {
      const payload = this.decodeToken(token)
      if (!payload) return null

      const role = payload.role
      if (typeof role === "string" && role) return role

      const roles = payload.roles
      if (Array.isArray(roles) && roles.length > 0) {
        const first = roles[0]
        if (typeof first === "string") return first
      }

      return null
    } catch (error) {
      return null
    }
  }

  /**
   * Check if token should be refreshed (if less than 5 minutes left)
   */
  static shouldRefreshToken(token?: string): boolean {
    const timeUntilExpiration = this.getTimeUntilExpiration(token)
    return timeUntilExpiration > 0 && timeUntilExpiration < 300 // 5 minutes
  }
}
