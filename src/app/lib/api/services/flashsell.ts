import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";

export interface Flashsell {
  id: string;
  title: string;
  bannerImg: string;
  productIds: string[];
  startTime: string;
  endTime: string;
  discountpercentage: number;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFlashsellRequest {
  title: string;
  bannerImg?: File | string;
  productIds: string[];
  startTime: string;
  endTime: string;
  discountpercentage: number;
  stock: number;
}

export interface UpdateFlashsellRequest {
  title?: string;
  bannerImg?: File | string;
  productIds?: string[];
  startTime?: string;
  endTime?: string;
  discountpercentage?: number;
  stock?: number;
}

const normalizeFlashsell = (data: any): Flashsell => {
  return {
    ...data,
    productIds: typeof data.productIds === "string" ? JSON.parse(data.productIds) : (Array.isArray(data.productIds) ? data.productIds : []),
  };
};

const normalizeFlashsellArray = (data: any[]): Flashsell[] => {
  return data.map(normalizeFlashsell);
};

export const flashsellService = {
  create: async (data: CreateFlashsellRequest): Promise<Flashsell> => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.bannerImg instanceof File) {
      formData.append("bannerImg", data.bannerImg);
    } else if (typeof data.bannerImg === "string") {
      formData.append("bannerImg", data.bannerImg);
    }
    formData.append("productIds", JSON.stringify(data.productIds));
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);
    formData.append("discountpercentage", data.discountpercentage.toString());
    formData.append("stock", data.stock.toString());

    const response = await apiClient.post<Flashsell>(API_ENDPOINTS.FLASHSELL_CREATE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return normalizeFlashsell(response.data);
  },
  findAll: async (): Promise<Flashsell[]> => {
    const response = await apiClient.get<any[]>(API_ENDPOINTS.FLASHSELL_GET_ALL);
    return normalizeFlashsellArray(response.data);
  },
  findOne: async (id: string): Promise<Flashsell> => {
    const endpoint = API_ENDPOINTS.FLASHSELL_GET_ONE.replace("{id}", id);
    const response = await apiClient.get<any>(endpoint);
    return normalizeFlashsell(response.data);
  },
  update: async (id: string, data: UpdateFlashsellRequest): Promise<Flashsell> => {
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.bannerImg instanceof File) {
      formData.append("bannerImg", data.bannerImg);
    } else if (typeof data.bannerImg === "string") {
      formData.append("bannerImg", data.bannerImg);
    }
    if (data.productIds) formData.append("productIds", JSON.stringify(data.productIds));
    if (data.startTime) formData.append("startTime", data.startTime);
    if (data.endTime) formData.append("endTime", data.endTime);
    if (data.discountpercentage !== undefined) formData.append("discountpercentage", data.discountpercentage.toString());
    if (data.stock !== undefined) formData.append("stock", data.stock.toString());

    const endpoint = API_ENDPOINTS.FLASHSELL_UPDATE.replace("{id}", id);
    const response = await apiClient.patch<any>(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return normalizeFlashsell(response.data);
  },
  remove: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS.FLASHSELL_DELETE.replace("{id}", id);
    await apiClient.delete(endpoint);
  },
};

export default flashsellService;
