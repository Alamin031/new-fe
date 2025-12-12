/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface BlogPost {
  id: string; // ObjectId as string
  title: string;
  slug: string;
  content: string;
  image?: string;
  excerpt?: string;
  publishedAt?: string; // or Date, depending on your API serialization
  readTime?: number;
  status: string;
  tags?: string[];
  createdAt: string; // or Date
  updatedAt: string; // or Date
}

export interface CreateBlogRequest {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  readTime: string;
  status?: 'draft' | 'published';
  tags?: string[];
}



// Use Partial<CreateBlogRequest> directly instead of UpdateBlogRequest

export interface BlogListResponse {
  data: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
}

const blogsService = {
  // Get all blogs with pagination and filters
  getAll: async (filters?: any, page: number = 1, pageSize: number = 20): Promise<BlogListResponse> => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        ...(filters?.search && { search: filters.search }),
        ...(filters?.category && { category: filters.category }),
        ...(filters?.status && { status: filters.status }),
      });
      const response = await apiClient.get(`${API_ENDPOINTS.BLOGS_GET}?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  // Get single blog by ID
  getById: async (id: string): Promise<BlogPost> => {
    try {
      const url = API_ENDPOINTS.BLOGS_GET_BY_ID.replace('{id}', id);
      const response = await apiClient.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  },

  // Get blog by slug
  getBySlug: async (slug: string): Promise<BlogPost> => {
    try {
      const url = API_ENDPOINTS.BLOGS_GET_ONE_SLUG.replace('{slug}', slug);
      const response = await apiClient.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching blog by slug:', error);
      throw error;
    }
  },



  // Create new blog
  create: async (data: CreateBlogRequest | FormData): Promise<BlogPost> => {
    try {
      let response;
      if (data instanceof FormData) {
        response = await apiClient.post(API_ENDPOINTS.BLOGS_CREATE, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await apiClient.post(API_ENDPOINTS.BLOGS_CREATE, data);
      }
      return response.data;
    } catch (error: any) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  // Update blog
  update: async (id: string, data: Partial<CreateBlogRequest> | FormData): Promise<BlogPost> => {
    try {
      const url = API_ENDPOINTS.BLOGS_UPDATE.replace('{id}', id);
      let response;
      if (data instanceof FormData) {
        response = await apiClient.put(url, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await apiClient.put(url, data);
      }
      return response.data;
    } catch (error: any) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  // Delete blog
  delete: async (id: string): Promise<void> => {
    try {
      const url = API_ENDPOINTS.BLOGS_DELETE.replace('{id}', id);
      await apiClient.delete(url);
    } catch (error: any) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },
};

export default blogsService;
