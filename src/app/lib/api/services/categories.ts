import {apiClient} from '../client';
import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CategoryProductsResponse,
  ProductFilters,
  Subcategory,
} from '../types';
import {API_ENDPOINTS} from '../config';

type CreateCategoryWithFile = Omit<CreateCategoryRequest, 'banner'> & {
  banner?: File | string;
};

type UpdateCategoryWithFile = Omit<UpdateCategoryRequest, 'banner'> & {
  banner?: File | string;
};

export const categoriesService = {
  /**
   * ✅ Create Category (Admin only) — Brand style
   */
  create: async (data: CreateCategoryWithFile): Promise<Category> => {
    const formData = new FormData();

    formData.append('name', data.name);
    if (data.slug !== undefined) {
      formData.append('slug', data.slug);
    }

    if (data.priority !== undefined) {
      formData.append('priority', String(data.priority));
    }

    if (data.banner instanceof File) {
      formData.append('banner', data.banner); // ✅ REAL FILE
    } else if (typeof data.banner === 'string' && data.banner) {
      formData.append('banner', data.banner); // ✅ OLD IMAGE URL
    }

    const response = await apiClient.post<Category>(
      API_ENDPOINTS.CATEGORIES_CREATE,
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );

    return response.data;
  },

  /**
   * ✅ Get all categories
   */
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>(
      API_ENDPOINTS.CATEGORIES_GET,
    );
    return response.data;
  },

  /**
   * ✅ Get featured categories
   */
  getFeatured: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>(
      API_ENDPOINTS.CATEGORIES_FEATURED,
    );
    return response.data;
  },

  /**
   * ✅ Get category by slug
   */
  getBySlug: async (slug: string): Promise<Category> => {
    const endpoint = API_ENDPOINTS.CATEGORIES_SLUG.replace('{slug}', slug);
    const response = await apiClient.get<Category>(endpoint);
    return response.data;
  },

  /**
   * ✅ Get products in category
   */
  getProducts: async (
    slug: string,
    filters?: ProductFilters,
    page = 1,
    limit = 20,
  ): Promise<CategoryProductsResponse> => {
    const endpoint = API_ENDPOINTS.CATEGORIES_PRODUCTS.replace('{slug}', slug);
    const response = await apiClient.get<CategoryProductsResponse>(endpoint, {
      params: {
        page,
        limit,
        ...filters,
      },
    });
    return response.data;
  },

  /**
   * ✅ Update Category (Admin only) — Brand style
   */
  update: async (
    id: string,
    data: UpdateCategoryWithFile,
  ): Promise<Category> => {
    const formData = new FormData();

    if (data.name) formData.append('name', data.name);
    if (data.slug) formData.append('slug', data.slug);
    if (data.priority !== undefined)
      formData.append('priority', String(data.priority));

    if (data.banner instanceof File) {
      formData.append('banner', data.banner);
    } else if (typeof data.banner === 'string' && data.banner) {
      formData.append('banner', data.banner);
    }

    const endpoint = API_ENDPOINTS.CATEGORIES_UPDATE.replace('{id}', id);

    const response = await apiClient.patch<Category>(endpoint, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });

    return response.data;
  },

  /**
   * ✅ Delete category
   */
  delete: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS.CATEGORIES_DELETE.replace('{id}', id);
    await apiClient.delete(endpoint);
  },

  /**
   * ✅ Create Subcategory
   */
  createSubcategory: async (
    categoryId: string,
    data: {name: string; categoryId?: string},
  ): Promise<Subcategory> => {
    const endpoint = API_ENDPOINTS.SUBCATEGORIES_CREATE.replace(
      '{categoryId}',
      categoryId,
    );
    const response = await apiClient.post<Subcategory>(endpoint, data);
    return response.data;
  },

  /**
   * ✅ Get All Subcategories
   */
  getSubcategories: async (categoryId: string): Promise<Subcategory[]> => {
    const endpoint = API_ENDPOINTS.SUBCATEGORIES_GET_ALL.replace(
      '{categoryId}',
      categoryId,
    );
    const response = await apiClient.get<Subcategory[]>(endpoint);
    return response.data;
  },

  /**
   * ✅ Update Subcategory
   */
  updateSubcategory: async (
    id: string,
    data: {name?: string; categoryId?: string},
  ): Promise<Subcategory> => {
    const endpoint = API_ENDPOINTS.SUBCATEGORIES_UPDATE.replace('{id}', id);
    const response = await apiClient.patch<Subcategory>(endpoint, data);
    return response.data;
  },

  /**
   * ✅ Get Subcategory by ID
   */
  getSubcategoryById: async (id: string): Promise<Subcategory> => {
    const endpoint = API_ENDPOINTS.SUBCATEGORIES_GET_ONE.replace('{id}', id);
    const response = await apiClient.get<Subcategory>(endpoint);
    return response.data;
  },
};

export default categoriesService;
