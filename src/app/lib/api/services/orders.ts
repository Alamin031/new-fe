import { apiClient } from "../client"
import {
  Order,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
  OrderInvoiceResponse,
  CalculateEMIRequest,
  CalculateEMIResponse,
} from "../types"

export const ordersService = {
  /**
   * Create a new order
   */
  create: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await apiClient.post<Order>("/api/orders", data)
    return response.data
  },

  /**
   * Get all orders (Admin/Management only)
   */
  getAll: async (page = 1, limit = 20): Promise<{ data: Order[]; pagination: any }> => {
    const response = await apiClient.get<{ data: Order[]; pagination: any }>("/api/orders", {
      params: { page, limit },
    })
    return response.data
  },

  /**
   * Get order by ID
   */
  getById: async (id: string): Promise<Order> => {
    const response = await apiClient.get<Order>(`/api/orders/${id}`)
    return response.data
  },

  /**
   * Update order status (Admin/Management only)
   */
  updateStatus: async (id: string, data: UpdateOrderStatusRequest): Promise<Order> => {
    const response = await apiClient.patch<Order>(`/api/orders/${id}/status`, data)
    return response.data
  },

  /**
   * Get order by order number
   */
  getByOrderNumber: async (orderNumber: string): Promise<Order> => {
    const response = await apiClient.get<Order>("/api/orders/search", {
      params: { orderNumber },
    })
    return response.data
  },

  /**
   * Cancel order
   */
  cancel: async (id: string, reason?: string): Promise<Order> => {
    const response = await apiClient.post<Order>(`/api/orders/${id}/cancel`, { reason })
    return response.data
  },

  /**
   * Generate invoice for order
   */
  generateInvoice: async (id: string): Promise<OrderInvoiceResponse> => {
    const response = await apiClient.get<OrderInvoiceResponse>(`/api/orders/${id}/invoice`)
    return response.data
  },

  /**
   * Calculate EMI for amount
   */
  calculateEMI: async (data: CalculateEMIRequest): Promise<CalculateEMIResponse> => {
    const response = await apiClient.post<CalculateEMIResponse>("/api/orders/calculate-emi", data)
    return response.data
  },

  /**
   * Track order
   */
  track: async (orderNumber: string): Promise<{
    order: Order
    status: string
    estimatedDelivery: string
    trackingUpdates: Array<{ date: string; status: string; location: string }>
  }> => {
    const response = await apiClient.get("/api/orders/track", {
      params: { orderNumber },
    })
    return response.data
  },
}

export default ordersService
