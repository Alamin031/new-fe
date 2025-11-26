# API Client Setup

Complete Axios-based API client with full authentication, token management, TypeScript types, and all services.

## Directory Structure

```
lib/api/
├── client.ts              # Axios client with interceptors and token management
├── types.ts               # TypeScript types for all API responses
├── index.ts               # Main export file
├── services/
│   ├── auth.ts           # Authentication service
│   ├── users.ts          # User management service
│   ├── categories.ts     # Categories service
│   ├── brands.ts         # Brands service
│   ├── products.ts       # Products service
│   ├── orders.ts         # Orders service
│   ├── warranty.ts       # Warranty service
│   ├── giveaways.ts      # Giveaways service
│   ├── policies.ts       # Policies service
│   ├── faqs.ts           # FAQs service
│   ├── reviews.ts        # Reviews service
│   ├── loyalty.ts        # Loyalty service
│   ├── seo.ts            # SEO service
│   ├── marketing.ts      # Marketing service
│   ├── admin.ts          # Admin service
│   └── index.ts          # Services export file
└── README.md             # This file
```

## Quick Start

### 1. Import Services

```typescript
import {
  authService,
  usersService,
  productsService,
  ordersService,
  // ... other services
} from "@/lib/api"
```

### 2. Environment Configuration

Add to your `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## API Services

### Auth Service

Handle user authentication:

```typescript
import { authService } from "@/lib/api"

// Register
const response = await authService.register({
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  phone: "+1234567890"
})

// Login
const response = await authService.login({
  email: "john@example.com",
  password: "password123"
})

// Social Login
const response = await authService.socialLogin({
  provider: "google",
  accessToken: "google_token"
})
```

### Users Service

Manage user profile and related operations:

```typescript
import { usersService } from "@/lib/api"

// Get current user
const user = await usersService.getCurrentUser()

// Update profile
const updated = await usersService.update(userId, {
  name: "Jane Doe",
  phone: "+1234567890"
})

// Wishlist operations
const wishlist = await usersService.getWishlist(userId)
await usersService.addToWishlist(userId, productId)
await usersService.removeFromWishlist(userId, productId)

// Compare operations
const compareList = await usersService.getCompareList(userId)
await usersService.addToCompare(userId, productId)
await usersService.removeFromCompare(userId, productId)

// Address management
const addresses = await usersService.getAddresses(userId)
const newAddress = await usersService.addAddress(userId, addressData)
await usersService.updateAddress(userId, addressId, updatedData)
await usersService.deleteAddress(userId, addressId)
```

### Categories Service

Manage product categories:

```typescript
import { categoriesService } from "@/lib/api"

// Get all categories
const { data, pagination } = await categoriesService.getAll()

// Get featured categories
const featured = await categoriesService.getFeatured()

// Get category by slug
const category = await categoriesService.getBySlug("smartphones")

// Get products in category
const { data: products, filters } = await categoriesService.getProducts(
  "smartphones",
  { minPrice: 100, maxPrice: 1000, brandId: "brand-1" },
  1,
  20
)

// Admin operations
const newCategory = await categoriesService.create(categoryData)
const updated = await categoriesService.update(categoryId, updates)
await categoriesService.delete(categoryId)
```

### Brands Service

Manage brands:

```typescript
import { brandsService } from "@/lib/api"

// Get all brands
const { data, pagination } = await brandsService.getAll()

// Get featured brands
const featured = await brandsService.getFeatured()

// Get brand by slug
const brand = await brandsService.getBySlug("apple")

// Get products by brand
const { data: products } = await brandsService.getProducts("apple", 1, 20)

// Admin operations
const newBrand = await brandsService.create(brandData)
const updated = await brandsService.update(brandId, updates)
await brandsService.delete(brandId)
```

### Products Service

Manage products:

```typescript
import { productsService } from "@/lib/api"

// Get all products
const { data, pagination } = await productsService.getAll(
  { categoryId: "cat-1", minPrice: 100 },
  1,
  20
)

// Get featured products
const featured = await productsService.getFeatured(10)

// Get new/hot products
const newProducts = await productsService.getNew(10)
const hotProducts = await productsService.getHot(10)

// Search products
const results = await productsService.search("iPhone", 1, 20)

// Get product by slug
const product = await productsService.getBySlug("iphone-15-pro-max")

// Admin operations
const newProduct = await productsService.create(productData)
const updated = await productsService.update(productId, updates)
await productsService.delete(productId)
```

### Orders Service

Manage orders:

```typescript
import { ordersService } from "@/lib/api"

// Create order
const order = await ordersService.create({
  items: [
    {
      productId: "prod-1",
      quantity: 2,
      selectedVariants: { color: "red", storage: "256gb" }
    }
  ],
  shippingAddressId: "addr-1",
  paymentMethod: "credit_card"
})

// Get user orders
const userOrders = await usersService.getOrders(userId, 1, 10)

// Get order by ID
const order = await ordersService.getById(orderId)

// Track order
const tracking = await ordersService.track("ORDER-12345")

// Generate invoice
const invoice = await ordersService.generateInvoice(orderId)

// Calculate EMI
const emi = await ordersService.calculateEMI({
  amount: 50000,
  months: 12
})

// Admin operations
const updated = await ordersService.updateStatus(orderId, {
  status: "shipped",
  trackingNumber: "TRACK123"
})
```

### Warranty Service

Manage warranties:

```typescript
import { warrantyService } from "@/lib/api"

// Lookup warranty
const warranty = await warrantyService.lookup("IMEI12345")

// Get warranty by ID
const warranty = await warrantyService.getById(warrantyId)

// Get warranty logs
const logs = await warrantyService.getLogs(warrantyId, 1, 10)

// Claim warranty
const claimed = await warrantyService.claim(warrantyId, "Device not working")

// Admin operations
const activated = await warrantyService.activate({
  orderId: "order-1",
  productId: "prod-1",
  imei: "IMEI12345"
})
```

### Giveaways Service

Manage giveaways:

```typescript
import { giveawaysService } from "@/lib/api"

// Create giveaway entry
const entry = await giveawaysService.create({
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  productId: "prod-1",
  message: "I want to win!"
})

// Get all entries (Admin only)
const { data, pagination } = await giveawaysService.getAll(1, 20)

// Export entries (Admin only)
const csvBlob = await giveawaysService.export("csv")
```

### Policies Service

Manage policies:

```typescript
import { policiesService } from "@/lib/api"

// Get all policies
const { data } = await policiesService.getAll()

// Get policy by slug
const policy = await policiesService.getBySlug("privacy-policy")

// Get published policies
const published = await policiesService.getPublished()

// Admin operations
const newPolicy = await policiesService.create({
  title: "Privacy Policy",
  content: "...",
  type: "privacy"
})

const updated = await policiesService.update("privacy-policy", updates)
await policiesService.delete("privacy-policy")
```

### FAQs Service

Manage FAQs:

```typescript
import { faqsService } from "@/lib/api"

// Get all FAQs
const { data } = await faqsService.getAll()

// Get FAQs by category
const categoryFAQs = await faqsService.getByCategory("shipping")

// Get FAQs by product
const productFAQs = await faqsService.getByProduct(productId)

// Search FAQs
const results = await faqsService.search("shipping", 1, 20)

// Get published FAQs
const published = await faqsService.getPublished()

// Admin operations
const newFAQ = await faqsService.create({
  question: "How to return?",
  answer: "...",
  category: "returns"
})

const updated = await faqsService.update(faqId, updates)
await faqsService.delete(faqId)
```

### Reviews Service

Manage reviews:

```typescript
import { reviewsService } from "@/lib/api"

// Create review
const review = await reviewsService.create({
  productId: "prod-1",
  rating: 5,
  title: "Great product!",
  content: "Very happy with this purchase..."
})

// Get reviews by product
const { data, averageRating, totalReviews } = await reviewsService.getByProduct(productId)

// Get verified reviews
const verified = await reviewsService.getVerified(productId)

// Mark helpful/unhelpful
await reviewsService.markHelpful(reviewId)
await reviewsService.markUnhelpful(reviewId)

// Admin operations
await reviewsService.delete(reviewId)
```

### Loyalty Service

Manage loyalty points:

```typescript
import { loyaltyService } from "@/lib/api"

// Get user points
const points = await loyaltyService.getUserPoints(userId)

// Get points history
const history = await loyaltyService.getHistory(userId, 1, 20)

// Get balance
const balance = await loyaltyService.getBalance(userId)

// Get tier info
const tier = await loyaltyService.getTier(userId)

// Redeem points
const result = await loyaltyService.redeem(userId, {
  points: 1000
})

// Admin operations
const transaction = await loyaltyService.addPoints(userId, 500, "Referral bonus")
```

### SEO Service

Manage SEO metadata:

```typescript
import { seoService } from "@/lib/api"

// Get product SEO
const seo = await seoService.getProductSEO(productId)

// Get category SEO
const seo = await seoService.getCategorySEO(categoryId)

// Generate sitemap
const sitemap = await seoService.generateSitemap()

// Get schema markup
const schema = await seoService.getSchemaMarkup("product", productId)

// Admin operations
const updated = await seoService.updateProductSEO(productId, seoData)
const regenerated = await seoService.regenerateSitemap()
```

### Marketing Service

Manage marketing campaigns:

```typescript
import { marketingService } from "@/lib/api"

// Send marketing email
const result = await marketingService.sendEmail({
  emails: [
    {
      to: ["user@example.com"],
      subject: "Special Offer",
      template: "promotional",
      templateVariables: { discount: "20%" }
    }
  ]
})

// Get campaigns
const { data } = await marketingService.getAllCampaigns(1, 20)

// Get active banners
const banners = await marketingService.getActiveBanners()

// Schedule campaign
const scheduled = await marketingService.scheduleEmailCampaign({
  name: "Summer Sale",
  recipientSegment: "premium-users",
  subject: "Exclusive Summer Deals",
  template: "summer-sale",
  scheduledAt: "2024-06-01T00:00:00Z"
})
```

### Admin Service

Admin dashboard and analytics:

```typescript
import { adminService } from "@/lib/api"

// Get dashboard stats
const stats = await adminService.getDashboard()

// Get analytics
const analytics = await adminService.getAnalytics("month")

// Get stock alerts
const alerts = await adminService.getStockAlerts("low", 1, 20)

// Get system health
const health = await adminService.getSystemHealth()

// Get revenue report
const report = await adminService.getRevenueReport("month")

// Get activity logs
const logs = await adminService.getActivityLogs(1, 20)

// Get customer insights
const insights = await adminService.getCustomerInsights()

// Get order insights
const orderInsights = await adminService.getOrderInsights("month")

// Get trending products
const trending = await adminService.getTrendingProducts(10)

// Generate report
const report = await adminService.generateReport({
  type: "sales",
  format: "pdf",
  dateRange: { start: "2024-01-01", end: "2024-01-31" }
})
```

## Authentication Flow

The API client automatically handles token management:

1. **Login**: Call `authService.login()` to get a token
2. **Token Storage**: Token is stored in Zustand auth store
3. **Request Interceptor**: Automatically adds token to request headers
4. **Response Interceptor**: 
   - Handles 401 errors by clearing auth state
   - Redirects to login page on unauthorized access
   - Handles other error status codes

## Error Handling

All services return API responses. Handle errors appropriately:

```typescript
try {
  const product = await productsService.getBySlug("iphone-15")
} catch (error) {
  // Handle error
  if (error.response?.status === 404) {
    // Product not found
  } else if (error.response?.status === 401) {
    // Unauthorized
  } else {
    // Other error
  }
}
```

## TypeScript Support

All services are fully typed with TypeScript:

```typescript
import type { Product, Order, User, AuthResponse } from "@/lib/api"

// Full type support for responses
const product: Product = await productsService.getBySlug("iphone-15")
const order: Order = await ordersService.getById("order-1")
```

## Integration with Auth Store

The API client integrates with the existing Zustand auth store:

```typescript
import { useAuthStore } from "@/store/auth-store"

// In your component
const { user, token, login, logout } = useAuthStore()

// After authentication
login(user, token)

// Logout
logout()
```

## Notes

- All endpoints are typed with full request and response types
- Pagination support with page and limit parameters
- Admin-only endpoints are clearly marked in the service functions
- Error handling is built into the client with automatic redirects for auth errors
- Token is automatically added to all requests
- The API base URL is configurable via environment variables
