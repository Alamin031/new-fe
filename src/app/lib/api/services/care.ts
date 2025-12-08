import {apiClient} from '../client';
import {API_ENDPOINTS} from '../config';

// Types for Product Care Plan
export interface ProductCarePlan {
  id: string;
  productIds: string[]; // Now supports multiple products
  categoryIds?: string[]; // Now supports multiple categories
  planName: string;
  price: number;
  duration?: string;
  description?: string;
  features?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductCarePlanRequest {
  productIds: string[]; // Array of product IDs
  categoryIds?: string[]; // Array of category IDs (optional)
  planName: string;
  price: number;
  duration?: string;
  description?: string;
  features?: string[];
}

export interface UpdateProductCarePlanRequest {
  productIds?: string[]; // Optional for update
  categoryIds?: string[]; // Optional for update
  planName?: string;
  price?: number;
  duration?: string;
  description?: string;
  features?: string[];
}
export const careService = {
  // Create a care plan
  create: async (
    data: CreateProductCarePlanRequest,
  ): Promise<ProductCarePlan> => {
    const endpoint = API_ENDPOINTS.PRODUCT_CARE_CREATE;
    const response = await apiClient.post(endpoint, data);
    return response.data;
  },

  // Get all care plans
  getAll: async (): Promise<ProductCarePlan[]> => {
    const endpoint = API_ENDPOINTS.PRODUCT_CARE_GET_ALL;
    const response = await apiClient.get(endpoint);
    return response.data;
  },

  // Update a care plan by id
  update: async (
    id: string,
    data: UpdateProductCarePlanRequest,
  ): Promise<ProductCarePlan> => {
    const endpoint = API_ENDPOINTS.PRODUCT_CARE_UPDATE.replace('{id}', id);
    const response = await apiClient.patch(endpoint, data);
    return response.data;
  },

  // Get a care plan by id
  get: async (id: string): Promise<ProductCarePlan> => {
    const endpoint = API_ENDPOINTS.PRODUCT_CARE_GET.replace('{id}', id);
    const response = await apiClient.get(endpoint);
    return response.data;
  },

  // Delete a care plan by id
  delete: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS.PRODUCT_CARE_DELETE.replace('{id}', id);
    await apiClient.delete(endpoint);
  },

  // Get care plans for a specific product
  getByProduct: async (productId: string): Promise<ProductCarePlan[]> => {
    const endpoint = API_ENDPOINTS.PRODUCT_CARE_BY_PRODUCT.replace(
      '{productId}',
      productId,
    );
    const response = await apiClient.get(endpoint);
    return response.data;
  },
};

export default careService;
