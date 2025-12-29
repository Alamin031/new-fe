/* eslint-disable @typescript-eslint/no-explicit-any */
import {apiClient} from '../client';
import {
  Order,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
  CalculateEMIRequest,
  CalculateEMIResponse,
} from '../types';
import {API_ENDPOINTS} from '../config';

export const ordersService = {
  /**
   * Get orders by customer email
   */
  getByCustomerEmail: async (email: string): Promise<Order[]> => {
    const endpoint = API_ENDPOINTS.ORDERS_BY_CUSTOMER_EMAIL.replace(
      '{email}',
      encodeURIComponent(email),
    );
    const response = await apiClient.get<Order[]>(endpoint);
    return response.data;
  },

  /**
   * Create a new order
   * ❌ NO IMEI / SERIAL HERE
   */
  create: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await apiClient.post<Order>(
      API_ENDPOINTS.ORDERS_CREATE,
      data,
    );
    return response.data;
  },

  /**
   * Get all orders (Admin)
   */
  getAll: async (
    page = 1,
    limit = 20,
  ): Promise<{data: Order[]; pagination: unknown}> => {
    const response = await apiClient.get(API_ENDPOINTS.ORDERS_GET, {
      params: {page, limit},
    });
    return response.data;
  },

  /**
   * Get order by ID
   */
  getById: async (id: string): Promise<Order> => {
    const endpoint = API_ENDPOINTS.ORDERS_GET_ONE.replace('{id}', id);
    const response = await apiClient.get<Order>(endpoint);
    return response.data;
  },

  /**
   * Update order status
   * ❌ NO IMEI / SERIAL
   */
  updateStatus: async (
    id: string,
    data: UpdateOrderStatusRequest,
  ): Promise<Order> => {
    const endpoint = API_ENDPOINTS.ORDERS_UPDATE_STATUS.replace('{id}', id);
    const response = await apiClient.patch<Order>(endpoint, data);
    return response.data;
  },

  /**
   * Track order by order number
   */
  getByOrderNumber: async (orderNumber: string): Promise<Order> => {
    const endpoint = API_ENDPOINTS.ORDERS_TRACKING.replace(
      '{orderNumber}',
      orderNumber,
    );
    const response = await apiClient.get<Order>(endpoint);
    return response.data;
  },

  /**
   * Cancel order
   */
  cancel: async (id: string, reason?: string): Promise<Order> => {
    const response = await apiClient.post<Order>(`/orders/${id}/cancel`, {
      reason,
    });
    return response.data;
  },

  /**
   * Generate invoice
   */
  generateInvoice: async (id: string): Promise<any> => {
    const endpoint = API_ENDPOINTS.ORDERS_INVOICE.replace('{id}', id);
    const response = await apiClient.get(endpoint);
    return response.data;
  },

  /**
   * Calculate EMI
   */
  calculateEMI: async (
    data: CalculateEMIRequest,
  ): Promise<CalculateEMIResponse> => {
    const response = await apiClient.post(
      API_ENDPOINTS.ORDERS_CALCULATE_EMI,
      data,
    );
    return response.data;
  },

  /**
   * Track order (detail page)
   */
  track: async (id: string): Promise<any> => {
    const endpoint = API_ENDPOINTS.ORDERS_GET_ONE.replace('{id}', id);
    const response = await apiClient.get(endpoint);
    const data = response.data;

    return {
      id: data.id,
      orderNumber: data.orderNumber,
      status: data.status,
      paymentStatus: data.paymentStatus,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,

      customer: data.customer,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      division: data.division,
      district: data.district,
      upzila: data.upzila,
      postCode: data.postCode,
      address: data.address,

      paymentMethod: data.paymentMethod,
      deliveryMethod: data.deliveryMethod,
      total: data.total,

      orderItems: data.orderItems, // ❌ no imei here
      orderItemUnits: data.orderItemUnits || [], // ✅ read-only

      statusHistory: data.statusHistory,
      trackingNumber: data.trackingNumber || data.orderNumber,
    };
  },

  /**
   * ✅ Assign IMEI / Serial (ADMIN ONLY)
   */
  assignUnitsAdmin: async (
    orderId: string,
    data: AssignOrderItemUnitsRequest[],
  ): Promise<any> => {
    const endpoint = API_ENDPOINTS.ORDERS_ADMIN_ASSIGN_UNITS.replace(
      '{id}',
      orderId,
    );
    const response = await apiClient.post(endpoint, data);
    return response.data;
  },
};

export default ordersService;

/* ================= TYPES ================= */

export type AssignOrderItemUnitsRequest = {
  orderItemId: string;
  units: {
    imei?: string;
    serial?: string;
  }[];
};
