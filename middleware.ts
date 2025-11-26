import { NextRequest, NextResponse } from "next/server"

// Routes that require authentication
const protectedRoutes = [
  "/account",
  "/account/orders",
  "/account/addresses",
  "/account/notifications",
  "/account/settings",
  "/account/wishlist",
  "/account/wallet",
  "/checkout",
  "/orders",
  "/admin",
  "/profile",
  "/wishlist",
  "/compare",
]

// Routes that should redirect to home if already authenticated
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/auth/callback"]

// Routes that don't require authentication
const publicRoutes = [
  "/",
  "/products",
  "/categories",
  "/brands",
  "/terms",
  "/privacy-policy",
  "/shipping-info",
  "/return-policy",
  "/faq",
  "/faqs",
  "/contact",
  "/contact-us",
  "/about",
  "/track-order",
  "/warranty",
  "/returns-refunds",
]

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route))
}

function isAuthRoute(pathname: string): boolean {
  return authRoutes.some((route) => pathname.startsWith(route))
}

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))
}

function getTokenFromRequest(request: NextRequest): string | null {
  // Check Authorization header
  const authHeader = request.headers.get("authorization")
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7)
  }

  // Check cookies
  const token = request.cookies.get("access_token")?.value || request.cookies.get("auth_token")?.value

  return token || null
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = getTokenFromRequest(request)

  // Skip middleware for static assets and API routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.match(/\.(png|jpg|jpeg|gif|ico|svg|webp)$/)) {
    return NextResponse.next()
  }

  const isProtected = isProtectedRoute(pathname)
  const isAuth = isAuthRoute(pathname)
  const isPublic = isPublicRoute(pathname)

  // If route is protected and user is not authenticated
  if (isProtected && !token) {
    // Redirect to login with return URL
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If user is authenticated and tries to access auth routes, redirect to home
  if (isAuth && token && !pathname.startsWith("/auth/callback")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Allow public routes
  if (isPublic) {
    return NextResponse.next()
  }

  // Allow other routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
