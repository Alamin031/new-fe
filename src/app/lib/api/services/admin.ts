import { apiClient } from "../client"
import { DashboardStats, AnalyticsData, StockAlert } from "../types"

export const adminService = {
  /**
   * Get dashboard statistics
   */
  getDashboard: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>("/api/admin/dashboard")
    return response.data
  },

  /**
   * Get analytics data
   */
  getAnalytics: async (
    period: "day" | "week" | "month" | "year" = "month",
    startDate?: string,
    endDate?: string,
  ): Promise<AnalyticsData> => {
    const response = await apiClient.get<AnalyticsData>("/api/admin/analytics", {
      params: { period, startDate, endDate },
    })
    return response.data
  },

  /**
   * Get stock alerts
   */
  getStockAlerts: async (status?: "low" | "critical", page = 1, limit = 20): Promise<{ data: StockAlert[]; pagination: any }> => {
    const response = await apiClient.get<{ data: StockAlert[]; pagination: any }>("/api/admin/stock-alerts", {
      params: { status, page, limit },
    })
    return response.data
  },

  /**
   * Get system health status
   */
  getSystemHealth: async (): Promise<{
    status: string
    uptime: number
    database: string
    cache: string
    storage: string
    activeUsers: number
  }> => {
    const response = await apiClient.get("/api/admin/system-health")
    return response.data
  },

  /**
   * Get revenue reports
   */
  getRevenueReport: async (period: "day" | "week" | "month" | "year" = "month"): Promise<{
    totalRevenue: number
    previousPeriodRevenue: number
    growthPercentage: number
    breakdown: Array<{ category: string; amount: number; percentage: number }>
  }> => {
    const response = await apiClient.get("/api/admin/revenue-report", {
      params: { period },
    })
    return response.data
  },

  /**
   * Get user activity logs
   */
  getActivityLogs: async (page = 1, limit = 20): Promise<{
    data: Array<{
      id: string
      userId: string
      user?: { name: string; email: string }
      action: string
      resource: string
      timestamp: string
      details?: Record<string, unknown>
    }>
    pagination: any
  }> => {
    const response = await apiClient.get("/api/admin/activity-logs", {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get customer insights
   */
  getCustomerInsights: async (): Promise<{
    totalCustomers: number
    newCustomersThisMonth: number
    returningCustomers: number
    customerRetentionRate: number
    averageCustomerLifetimeValue: number
    topCustomersByValue: Array<{ name: string; email: string; totalSpent: number }>
  }> => {
    const response = await apiClient.get("/api/admin/customer-insights")
    return response.data
  },

  /**
   * Get inventory status
   */
  getInventoryStatus: async (): Promise<{
    totalProducts: number
    inStockProducts: number
    lowStockProducts: number
    outOfStockProducts: number
    totalInventoryValue: number
    topMovingProducts: Array<{ id: string; name: string; soldCount: number }>
  }> => {
    const response = await apiClient.get("/api/admin/inventory-status")
    return response.data
  },

  /**
   * Get order insights
   */
  getOrderInsights: async (period: "day" | "week" | "month" | "year" = "month"): Promise<{
    totalOrders: number
    completedOrders: number
    cancelledOrders: number
    pendingOrders: number
    averageOrderValue: number
    totalRevenue: number
    paymentMethodBreakdown: Record<string, number>
    statusDistribution: Record<string, number>
  }> => {
    const response = await apiClient.get("/api/admin/order-insights", {
      params: { period },
    })
    return response.data
  },

  /**
   * Get trending products
   */
  getTrendingProducts: async (limit = 10): Promise<Array<{
    id: string
    name: string
    viewCount: number
    purchaseCount: number
    rating: number
    trendScore: number
  }>> => {
    const response = await apiClient.get("/api/admin/trending-products", {
      params: { limit },
    })
    return response.data
  },

  /**
   * Generate custom report
   */
  generateReport: async (data: {
    type: string
    format: "pdf" | "csv" | "xlsx"
    filters?: Record<string, unknown>
    dateRange?: { start: string; end: string }
  }): Promise<{ downloadUrl: string; fileName: string }> => {
    const response = await apiClient.post("/api/admin/generate-report", data)
    return response.data
  },

  /**
   * Get system logs
   */
  getSystemLogs: async (level?: "info" | "warning" | "error", page = 1, limit = 20): Promise<{
    data: Array<{
      id: string
      level: string
      message: string
      timestamp: string
      details?: Record<string, unknown>
    }>
    pagination: any
  }> => {
    const response = await apiClient.get("/api/admin/system-logs", {
      params: { level, page, limit },
    })
    return response.data
  },
}

export default adminService
