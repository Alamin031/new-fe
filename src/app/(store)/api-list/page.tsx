import type { Metadata } from "next"
import { Code2, Package, Database, Zap, Layers, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { generateSEO } from "../../lib/seo"

export const metadata: Metadata = generateSEO({
  title: "API List & Modules - TechStore Developer Documentation",
  description: "Complete API documentation and module list for TechStore. Explore all pages, stores, hooks, utilities, and components used in the project.",
  url: "/api-list",
  keywords: ["API", "documentation", "modules", "developer", "technical", "reference"],
})

const modules = {
  utilities: [
    {
      name: "seo.ts",
      path: "src/app/lib/seo.ts",
      description: "SEO utilities for generating metadata and JSON-LD schemas",
      exports: [
        "generateSEO(props) - Generate Metadata for pages",
        "generateProductSchema(product) - Product structured data",
        "generateBreadcrumbSchema(items) - Breadcrumb navigation schema",
        "generateOrganizationSchema() - Organization structured data",
      ],
    },
    {
      name: "utils.ts",
      path: "src/app/lib/utils.ts",
      description: "Common utility functions and className helpers",
      exports: [
        "cn(...inputs) - Merge clsx and tailwind-merge",
      ],
    },
    {
      name: "format.ts",
      path: "src/app/lib/utils/format.ts",
      description: "Data formatting utilities",
      exports: [
        "formatPrice(price) - Format currency",
        "formatEMI(amount, months) - Format EMI details",
        "calculateDiscount(original, current) - Calculate discount percentage",
        "formatDate(date) - Format date string",
        "formatDateTime(dateTime) - Format date and time",
      ],
    },
    {
      name: "imagekit.ts",
      path: "src/app/lib/imagekit.ts",
      description: "ImageKit URL generation and transformation",
      exports: [
        "getImageKitUrl(path, options) - Build ImageKit transformation URL",
        "getPlaceholderUrl(path) - Get placeholder image URL",
      ],
    },
    {
      name: "mock-data.ts",
      path: "src/app/lib/mock-data.ts",
      description: "Mock data for development and testing",
      exports: [
        "mockBrands - Brand data",
        "mockCategories - Category data",
        "mockProducts - Product data",
      ],
    },
  ],
  hooks: [
    {
      name: "use-recently-viewed.ts",
      path: "src/app/hooks/use-recently-viewed.ts",
      description: "Persist and manage recently viewed products",
      exports: [
        "useRecentlyViewed() - Hook for recent products",
        "items - Recently viewed product list (max 10)",
        "addItem(product) - Add product to history",
        "clearItems() - Clear all history",
      ],
    },
    {
      name: "use-search-history.ts",
      path: "src/app/hooks/use-search-history.ts",
      description: "Persist and manage search history",
      exports: [
        "useSearchHistory() - Hook for search history",
        "searches - Search query list (max 10)",
        "addSearch(query) - Add search query",
        "removeSearch(query) - Remove specific query",
        "clearHistory() - Clear all search history",
      ],
    },
  ],
  stores: [
    {
      name: "auth-store.ts",
      path: "src/app/store/auth-store.ts",
      description: "Authentication state management",
      exports: [
        "useAuthStore() - Auth hook",
        "user - Current user object",
        "token - Auth token",
        "isAuthenticated - Authentication status",
        "login(user, token) - Login user",
        "logout() - Logout user",
        "updateUser(updates) - Update user profile",
      ],
    },
    {
      name: "cart-store.ts",
      path: "src/app/store/cart-store.ts",
      description: "Shopping cart state management",
      exports: [
        "useCartStore() - Cart hook",
        "items - Cart items array",
        "addItem(product, qty, variants) - Add to cart",
        "removeItem(productId) - Remove from cart",
        "updateQuantity(productId, qty) - Update item quantity",
        "clearCart() - Empty cart",
        "getTotal() - Calculate total price",
        "getItemCount() - Get total items",
      ],
    },
    {
      name: "wishlist-store.ts",
      path: "src/app/store/wishlist-store.ts",
      description: "Wishlist state management",
      exports: [
        "useWishlistStore() - Wishlist hook",
        "items - Wishlist items array",
        "addItem(product) - Add to wishlist",
        "removeItem(productId) - Remove from wishlist",
        "isInWishlist(productId) - Check if in wishlist",
        "clearWishlist() - Clear wishlist",
      ],
    },
    {
      name: "compare-store.ts",
      path: "src/app/store/compare-store.ts",
      description: "Product comparison state management",
      exports: [
        "useCompareStore() - Compare hook",
        "items - Comparison items array",
        "addItem(product) - Add to compare",
        "removeItem(productId) - Remove from compare",
        "isInCompare(productId) - Check if in compare",
        "clearCompare() - Clear comparison",
      ],
    },
    {
      name: "notification-store.ts",
      path: "src/app/store/notification-store.ts",
      description: "Notification management",
      exports: [
        "useNotificationStore() - Notification hook",
        "notifications - Notifications array",
        "unreadCount - Unread notification count",
        "addNotification(...) - Add notification",
        "markAsRead(id) - Mark as read",
        "markAllAsRead() - Mark all as read",
        "removeNotification(id) - Remove notification",
        "clearAll() - Clear all notifications",
      ],
    },
    {
      name: "order-tracking-store.ts",
      path: "src/app/store/order-tracking-store.ts",
      description: "Order tracking state management",
      exports: [
        "useOrderTrackingStore() - Order tracking hook",
        "orders - Orders map",
        "addOrder(tracking) - Add order",
        "updateOrderStatus(orderId, status) - Update status",
        "getOrderTracking(orderId) - Get order details",
      ],
    },
    {
      name: "emi-store.ts",
      path: "src/app/store/emi-store.ts",
      description: "EMI configuration state management",
      exports: [
        "useEMIStore() - EMI hook",
        "config - EMI configuration",
        "updateConfig() - Update config",
        "addPlan() - Add EMI plan",
        "removePlan() - Remove EMI plan",
        "updatePlan() - Update EMI plan",
      ],
    },
    {
      name: "loyalty-points-store.ts",
      path: "src/app/store/loyalty-points-store.ts",
      description: "Loyalty points system state management",
      exports: [
        "useLoyaltyPointsStore() - Loyalty hook",
        "config - Loyalty configuration",
        "users - Users map with points",
        "updateConfig() - Update config",
        "updateUserPoints() - Update user points",
        "getUserPoints() - Get user points",
        "addTier() - Add loyalty tier",
        "removeTier() - Remove tier",
        "updateTier() - Update tier",
      ],
    },
    {
      name: "review-store.ts",
      path: "src/app/store/review-store.ts",
      description: "Product review state management",
      exports: [
        "useReviewStore() - Review hook",
        "reviews - Reviews array",
        "addReview(...) - Add new review",
        "updateReview(id, updates) - Update review",
        "deleteReview(id) - Delete review",
        "getProductReviews(productId) - Get product reviews",
        "getOrderReviews(orderId) - Get order reviews",
        "markHelpful(reviewId, helpful) - Mark helpful",
      ],
    },
  ],
  pages: {
    public: [
      { route: "/", file: "src/app/page.tsx", name: "Home" },
      { route: "/about-us", file: "src/app/(store)/about-us/page.tsx", name: "About Us" },
      { route: "/careers", file: "src/app/(store)/careers/page.tsx", name: "Careers" },
      { route: "/blog", file: "src/app/(store)/blog/page.tsx", name: "Blog" },
      { route: "/contact-us", file: "src/app/(store)/contact-us/page.tsx", name: "Contact Us" },
      { route: "/faqs", file: "src/app/(store)/faqs/page.tsx", name: "FAQs" },
      { route: "/shipping-info", file: "src/app/(store)/shipping-info/page.tsx", name: "Shipping Info" },
      { route: "/track-order", file: "src/app/(store)/track-order/page.tsx", name: "Track Order" },
      { route: "/returns-refunds", file: "src/app/(store)/returns-refunds/page.tsx", name: "Returns & Refunds" },
      { route: "/warranty", file: "src/app/(store)/warranty/page.tsx", name: "Warranty" },
      { route: "/store-locator", file: "src/app/(store)/store-locator/page.tsx", name: "Store Locator" },
      { route: "/cart", file: "src/app/(store)/cart/page.tsx", name: "Shopping Cart" },
      { route: "/checkout", file: "src/app/(store)/checkout/page.tsx", name: "Checkout" },
      { route: "/compare", file: "src/app/(store)/compare/page.tsx", name: "Compare Products" },
      { route: "/wishlist", file: "src/app/(store)/wishlist/page.tsx", name: "Wishlist" },
      { route: "/category/[slug]", file: "src/app/(store)/category/[slug]/page.tsx", name: "Category (Dynamic)" },
      { route: "/product/[slug]", file: "src/app/(store)/product/[slug]/page.tsx", name: "Product Detail (Dynamic)" },
    ],
    account: [
      { route: "/account", file: "src/app/(store)/account/page.tsx", name: "Account Dashboard" },
      { route: "/account/orders", file: "src/app/(store)/account/orders/page.tsx", name: "My Orders" },
      { route: "/account/orders/[id]", file: "src/app/(store)/account/orders/[id]/page.tsx", name: "Order Details (Dynamic)" },
      { route: "/account/addresses", file: "src/app/(store)/account/addresses/page.tsx", name: "Addresses" },
      { route: "/account/settings", file: "src/app/(store)/account/settings/page.tsx", name: "Account Settings" },
      { route: "/account/wallet", file: "src/app/(store)/account/wallet/page.tsx", name: "Wallet" },
      { route: "/account/notifications", file: "src/app/(store)/account/notifications/page.tsx", name: "Notifications" },
      { route: "/account/wishlist", file: "src/app/(store)/account/wishlist/page.tsx", name: "My Wishlist" },
    ],
    auth: [
      { route: "/login", file: "src/app/(auth)/login/page.tsx", name: "Login" },
      { route: "/register", file: "src/app/(auth)/register/page.tsx", name: "Register" },
      { route: "/forgot-password", file: "src/app/(auth)/forgot-password/page.tsx", name: "Forgot Password" },
      { route: "/reset-password", file: "src/app/(auth)/reset-password/page.tsx", name: "Reset Password" },
    ],
    admin: [
      { route: "/admin", file: "src/app/admin/page.tsx", name: "Admin Dashboard" },
      { route: "/admin/products", file: "src/app/admin/products/page.tsx", name: "Products Management" },
      { route: "/admin/products/new", file: "src/app/admin/products/new/page.tsx", name: "Add New Product" },
      { route: "/admin/categories", file: "src/app/admin/categories/page.tsx", name: "Categories" },
      { route: "/admin/orders", file: "src/app/admin/orders/page.tsx", name: "Orders" },
      { route: "/admin/customers", file: "src/app/admin/customers/page.tsx", name: "Customers" },
      { route: "/admin/reviews", file: "src/app/admin/reviews/page.tsx", name: "Reviews" },
      { route: "/admin/coupons", file: "src/app/admin/coupons/page.tsx", name: "Coupons" },
      { route: "/admin/banners", file: "src/app/admin/banners/page.tsx", name: "Banners" },
      { route: "/admin/emi", file: "src/app/admin/emi/page.tsx", name: "EMI Settings" },
      { route: "/admin/settings", file: "src/app/admin/settings/page.tsx", name: "Settings" },
    ],
  },
  components: [
    { name: "Navbar", path: "src/app/components/layout/navbar.tsx", description: "Top navigation bar" },
    { name: "Footer", path: "src/app/components/layout/footer.tsx", description: "Footer section" },
    { name: "MegaMenu", path: "src/app/components/layout/mega-menu.tsx", description: "Mega menu navigation" },
    { name: "SearchModal", path: "src/app/components/layout/search-modal.tsx", description: "Product search modal" },
    { name: "ProductCard", path: "src/app/components/product/product-card.tsx", description: "Product card component" },
    { name: "ProductGallery", path: "src/app/components/product/product-gallery.tsx", description: "Product image gallery" },
    { name: "ProductInfo", path: "src/app/components/product/product-info.tsx", description: "Product information" },
    { name: "ProductTabs", path: "src/app/components/product/product-tabs.tsx", description: "Product details tabs" },
    { name: "EMICalculator", path: "src/app/components/product/emi-calculator.tsx", description: "EMI calculation tool" },
    { name: "CarePlusAddon", path: "src/app/components/product/care-plus-addon.tsx", description: "Extended warranty addon" },
    { name: "CartContent", path: "src/app/components/cart/cart-content.tsx", description: "Shopping cart content" },
    { name: "CategoryFilters", path: "src/app/components/category/category-filters.tsx", description: "Category filters" },
    { name: "CategoryProducts", path: "src/app/components/category/category-products.tsx", description: "Category products list" },
    { name: "CategoryFAQ", path: "src/app/components/category/category-faq.tsx", description: "Category FAQ" },
    { name: "CompareContent", path: "src/app/components/compare/compare-content.tsx", description: "Product comparison" },
    { name: "WishlistContent", path: "src/app/components/wishlist/wishlist-content.tsx", description: "Wishlist content" },
    { name: "OrderTrackingTimeline", path: "src/app/components/order/order-tracking-timeline.tsx", description: "Order tracking timeline" },
    { name: "ReviewCard", path: "src/app/components/order/review-card.tsx", description: "Product review card" },
    { name: "WriteReviewModal", path: "src/app/components/order/write-review-modal.tsx", description: "Write review form" },
    { name: "HeroBanner", path: "src/app/components/home/hero-banner.tsx", description: "Homepage hero banner" },
    { name: "FlashSale", path: "src/app/components/home/flash-sale.tsx", description: "Flash sale section" },
    { name: "BrandSlider", path: "src/app/components/home/brand-slider.tsx", description: "Brand carousel" },
    { name: "CategorySlider", path: "src/app/components/home/category-slider.tsx", description: "Category carousel" },
    { name: "ProductSection", path: "src/app/components/home/product-section.tsx", description: "Product showcase section" },
  ],
}

export default function APIListPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">API & Module Documentation</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Complete reference of all modules, stores, hooks, pages, and components in the TechStore project.
        </p>
      </section>

      {/* Quick Stats */}
      <section className="grid gap-6 md:grid-cols-5">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-primary">{modules.utilities.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">Utility Modules</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-primary">{modules.hooks.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">Custom Hooks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-primary">{modules.stores.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">Zustand Stores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-primary">40+</p>
            <p className="mt-2 text-sm text-muted-foreground">Pages & Routes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-primary">{modules.components.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">React Components</p>
          </CardContent>
        </Card>
      </section>

      {/* Utility Modules */}
      <section>
        <div className="mb-8 flex items-center gap-3">
          <Package className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Utility Modules</h2>
        </div>
        <div className="space-y-4">
          {modules.utilities.map((module) => (
            <Card key={module.name}>
              <CardHeader>
                <CardTitle className="text-lg">{module.name}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">{module.path}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{module.description}</p>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Exports:</h4>
                  <ul className="space-y-1">
                    {module.exports.map((exp, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">→</span>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Custom Hooks */}
      <section>
        <div className="mb-8 flex items-center gap-3">
          <Zap className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Custom Hooks</h2>
        </div>
        <div className="space-y-4">
          {modules.hooks.map((hook) => (
            <Card key={hook.name}>
              <CardHeader>
                <CardTitle className="text-lg">{hook.name}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">{hook.path}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{hook.description}</p>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Exports:</h4>
                  <ul className="space-y-1">
                    {hook.exports.map((exp, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">→</span>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Zustand Stores */}
      <section>
        <div className="mb-8 flex items-center gap-3">
          <Database className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Zustand State Stores</h2>
        </div>
        <div className="space-y-4">
          {modules.stores.map((store) => (
            <Card key={store.name}>
              <CardHeader>
                <CardTitle className="text-lg">{store.name}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">{store.path}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{store.description}</p>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Exports:</h4>
                  <ul className="space-y-1">
                    {store.exports.map((exp, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">→</span>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pages & Routes */}
      <section>
        <div className="mb-8 flex items-center gap-3">
          <Code2 className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Pages & Routes</h2>
        </div>

        {/* Public Store Routes */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Public Store Routes ({modules.pages.public.length})</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.pages.public.map((page, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <p className="font-mono text-sm font-semibold text-primary">{page.route}</p>
                  <p className="text-sm font-medium mt-2">{page.name}</p>
                  <p className="text-xs text-muted-foreground mt-2">{page.file}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Account Routes */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Account Routes ({modules.pages.account.length})</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.pages.account.map((page, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <p className="font-mono text-sm font-semibold text-primary">{page.route}</p>
                  <p className="text-sm font-medium mt-2">{page.name}</p>
                  <p className="text-xs text-muted-foreground mt-2">{page.file}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Auth Routes */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Authentication Routes ({modules.pages.auth.length})</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.pages.auth.map((page, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <p className="font-mono text-sm font-semibold text-primary">{page.route}</p>
                  <p className="text-sm font-medium mt-2">{page.name}</p>
                  <p className="text-xs text-muted-foreground mt-2">{page.file}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Admin Routes */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Admin Routes ({modules.pages.admin.length})</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.pages.admin.map((page, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <p className="font-mono text-sm font-semibold text-primary">{page.route}</p>
                  <p className="text-sm font-medium mt-2">{page.name}</p>
                  <p className="text-xs text-muted-foreground mt-2">{page.file}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Components */}
      <section>
        <div className="mb-8 flex items-center gap-3">
          <Layers className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">React Components</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.components.map((component, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <p className="font-semibold text-sm">{component.name}</p>
                <p className="text-xs text-muted-foreground mt-2">{component.path}</p>
                <p className="text-xs text-muted-foreground mt-2">{component.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Project Statistics */}
      <section className="rounded-2xl bg-muted/50 p-8 md:p-12">
        <h2 className="text-center text-3xl font-bold tracking-tight mb-8">Project Statistics</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">5</p>
            <p className="mt-2 text-muted-foreground">Utility Modules</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">2</p>
            <p className="mt-2 text-muted-foreground">Custom Hooks</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">9</p>
            <p className="mt-2 text-muted-foreground">State Stores</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">40+</p>
            <p className="mt-2 text-muted-foreground">Pages & Routes</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">24</p>
            <p className="mt-2 text-muted-foreground">React Components</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">18</p>
            <p className="mt-2 text-muted-foreground">UI Primitives</p>
          </div>
        </div>
      </section>

      {/* API Usage Guide */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight mb-8">Quick Start Guide</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Using Stores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">All stores are Zustand hooks. Import and use in client components:</p>
              <pre className="bg-muted p-3 rounded text-xs overflow-auto">
{`import { useCartStore } from '@/store/cart-store'

export function MyComponent() {
  const { items, addItem } = useCartStore()
  return <div>{items.length} items</div>
}`}
              </pre>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>SEO on Pages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Use generateSEO for page metadata:</p>
              <pre className="bg-muted p-3 rounded text-xs overflow-auto">
{`import { generateSEO } from '@/lib/seo'

export const metadata = generateSEO({
  title: 'Page Title',
  description: 'Page description',
  url: '/page-path',
})`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Need More Information?</h2>
        <p className="mt-4 text-muted-foreground">
          Explore the source code or contact our development team for detailed documentation.
        </p>
        <a href="/contact-us" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
          Get in Touch
          <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </div>
  )
}
