import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

// Types for Product Notification Request
export interface ProductNotifyRequest {
  id: string;
  productId: string;
  productName: string;
  email?: string;
  userId?: string;
  phone?: string;
  status: string;
  createdAt: Date;
}

export interface CreateProductNotifyRequest {
  productId: string;
  productName: string;
  email?: string;
  phone?: string;
  userId?: string;
  status: string;
}

export interface UpdateProductNotifyRequest {
  productName?: string;
  email?: string;
  phone?: string;
  status?: string;
}

// NotificationType enum
export enum NotificationType {
  ORDER_UPDATE = 'ORDER_UPDATE',
  PROMOTION = 'PROMOTION',
  GIVEAWAY = 'GIVEAWAY',
  SYSTEM = 'SYSTEM',
  PRODUCT_STOCK_OUT = 'PRODUCT_STOCK_OUT',
}

// Notification entity type
export interface Notification {
  id: string;
  userId?: string;
  type: NotificationType;
  title?: string;
  message?: string;
  productId?: string;
  link?: string;
  read?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Create notification request type
export interface CreateNotificationRequest {
  userId?: string;
  type: NotificationType;
  title?: string;
  message?: string;
  productId?: string;
  link?: string;
}

// Service
export const notificationService = {
  createStockOut: async (productId: string, userId?: string): Promise<Notification> => {
    const response = await apiClient.post(
      API_ENDPOINTS.NOTIFICATIONS_STOCK_OUT,
      { productId, userId }
    );
    return response.data;
  },
};

export const productNotifyService = {
  // Create notification request for a product (guest or user)
  create: async (productId: string, data: CreateProductNotifyRequest): Promise<ProductNotifyRequest> => {
    const endpoint = API_ENDPOINTS.NOTIFICATIONS_STOCK_OUT.replace('{productId}', productId);
    const response = await apiClient.post(endpoint, data);
    return response.data;
  },
};

export default productNotifyService;
