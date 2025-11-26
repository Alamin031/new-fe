// API Configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
}

// Storage keys
export const STORAGE_KEYS = {
  TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
}

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: "/auth/register",
  AUTH_LOGIN: "/auth/login",
  AUTH_SOCIAL_LOGIN: "/auth/social-login",
  AUTH_REFRESH: "/auth/refresh",
  AUTH_LOGOUT: "/auth/logout",

  // Users
  USERS_CREATE: "/users",
  USERS_GET_ALL: "/users",
  USERS_GET_LIST: "/users/all",
  USERS_ME: "/users/me",
  USERS_GET: "/users/{id}",
  USERS_UPDATE: "/users/{id}",
  USERS_DELETE: "/users/{id}",
  USERS_WISHLIST_GET: "/users/{id}/wishlist",
  USERS_WISHLIST_ADD: "/users/{id}/wishlist",
  USERS_WISHLIST_DELETE: "/users/{id}/wishlist/{productId}",
  USERS_COMPARE_GET: "/users/{id}/compare",
  USERS_COMPARE_ADD: "/users/{id}/compare",
  USERS_COMPARE_DELETE: "/users/{id}/compare/{productId}",
  USERS_ORDERS: "/users/{id}/orders",

  // Categories
  CATEGORIES_CREATE: "/categories",
  CATEGORIES_GET: "/categories",
  CATEGORIES_FEATURED: "/categories/featured",
  CATEGORIES_SLUG: "/categories/{slug}",
  CATEGORIES_PRODUCTS: "/categories/{slug}/products",
  CATEGORIES_UPDATE: "/categories/{id}",
  CATEGORIES_DELETE: "/categories/{id}",

  // Brands
  BRANDS_CREATE: "/brands",
  BRANDS_GET: "/brands",
  BRANDS_FEATURED: "/brands/featured",
  BRANDS_SLUG: "/brands/{slug}",
  BRANDS_PRODUCTS: "/brands/{slug}/products",
  BRANDS_UPDATE: "/brands/{id}",
  BRANDS_DELETE: "/brands/{id}",

  // Products
  PRODUCTS_CREATE: "/products",
  PRODUCTS_GET: "/products",
  PRODUCTS_FEATURED: "/products/featured",
  PRODUCTS_NEW: "/products/new",
  PRODUCTS_HOT: "/products/hot",
  PRODUCTS_SEARCH: "/products/search",
  PRODUCTS_SLUG: "/products/{slug}",
  PRODUCTS_UPDATE: "/products/{id}",
  PRODUCTS_DELETE: "/products/{id}",

  // Orders
  ORDERS_CREATE: "/orders",
  ORDERS_GET: "/orders",
  ORDERS_GET_ONE: "/orders/{id}",
  ORDERS_UPDATE_STATUS: "/orders/{id}/status",
  ORDERS_INVOICE: "/orders/{id}/invoice",
  ORDERS_CALCULATE_EMI: "/orders/calculate-emi",

  // Warranty
  WARRANTY_ACTIVATE: "/warranty/activate",
  WARRANTY_LOOKUP: "/warranty/lookup",
  WARRANTY_LOGS: "/warranty/{id}/logs",

  // Giveaways
  GIVEAWAYS_CREATE: "/giveaways",
  GIVEAWAYS_GET: "/giveaways",
  GIVEAWAYS_EXPORT: "/giveaways/export",

  // Policies
  POLICIES_CREATE: "/policies",
  POLICIES_GET: "/policies",
  POLICIES_SLUG: "/policies/{slug}",
  POLICIES_UPDATE: "/policies/{slug}",
  POLICIES_DELETE: "/policies/{slug}",

  // FAQs
  FAQS_CREATE: "/faqs",
  FAQS_GET: "/faqs",
  FAQS_GET_ONE: "/faqs/{id}",
  FAQS_UPDATE: "/faqs/{id}",
  FAQS_DELETE: "/faqs/{id}",

  // Reviews
  REVIEWS_CREATE: "/reviews",
  REVIEWS_GET: "/reviews/{productId}",
  REVIEWS_DELETE: "/reviews/{id}",

  // Loyalty
  LOYALTY_POINTS: "/loyalty/{userId}/points",
  LOYALTY_REDEEM: "/loyalty/{userId}/redeem",

  // SEO
  SEO_PRODUCT: "/seo/products/{id}",
  SEO_CATEGORY: "/seo/categories/{id}",
  SEO_BRAND: "/seo/brands/{id}",
  SEO_SITEMAP: "/seo/sitemap",

  // Marketing
  MARKETING_EMAIL: "/marketing/email",

  // Admin
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_ANALYTICS: "/admin/analytics",
  ADMIN_STOCK_ALERTS: "/admin/stock-alerts",
}
