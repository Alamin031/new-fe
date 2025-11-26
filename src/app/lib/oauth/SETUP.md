# OAuth 2.0 and Route Protection Setup Guide

Complete OAuth 2.0 authentication with Google and Facebook, plus protected routes.

## Project Structure

```
src/app/lib/
├── auth/
│   ├── index.ts                 # Auth utilities exports
│   ├── protected-route.tsx       # Protected route HOC and hooks
│   └── SETUP.md                 # This file
├── oauth/
│   ├── index.ts                 # OAuth utilities exports
│   ├── oauth-context.tsx        # OAuth provider and hooks
│   └── SETUP.md                 # This file
src/app/api/auth/
└── oauth-callback/
    └── route.ts                 # OAuth callback API handler
src/app/(auth)/
├── login/page.tsx               # Login page with OAuth buttons
├���─ register/page.tsx            # Register page
└── auth/callback/[provider]/
    └── page.tsx                 # OAuth callback handler page
middleware.ts                     # Route protection middleware
.env.local                        # Environment variables (local)
.env.example                      # Environment variables (example)
```

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and update with your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

### 2. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "OAuth 2.0 Consent Screen"
4. Create OAuth 2.0 Client ID:
   - Application type: Web Application
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/auth/callback/google`
5. Copy Client ID and Client Secret to `.env.local`

### 3. Get Facebook OAuth Credentials

1. Go to [Facebook Developers](https://developers.facebook.com/apps/)
2. Create a new app (Consumer type)
3. Add "Facebook Login" product
4. Configure Settings:
   - Valid OAuth Redirect URIs: `http://localhost:3000/auth/callback/facebook`
5. Go to Settings > Basic and copy App ID and App Secret to `.env.local`

### 4. Backend Integration

The OAuth callback handler (`src/app/api/auth/oauth-callback/route.ts`) expects your backend API to have this endpoint:

```
POST /api/auth/oauth-sync
```

**Expected Request:**
```json
{
  "provider": "google|facebook",
  "profile": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "picture|avatar": "profile_image_url"
  },
  "accessToken": "oauth_access_token"
}
```

**Expected Response:**
```json
{
  "user": {
    "id": "db_user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "user|admin|management",
    "avatar": "profile_image_url"
  },
  "token": "session_jwt_token"
}
```

## Usage

### Using Protected Routes

#### With HOC
```tsx
import { withProtectedRoute } from '@/lib/auth'

function Dashboard() {
  return <div>Dashboard</div>
}

export default withProtectedRoute(Dashboard, {
  requiredRoles: ['admin'],
  fallbackTo: '/login',
  showLoader: true
})
```

#### With Hook
```tsx
import { useProtectedRoute } from '@/lib/auth'

export default function Account() {
  const { isLoading, isAuthorized, user, requireAuth } = useProtectedRoute(['admin'])

  useEffect(() => {
    requireAuth('/login')
  }, [requireAuth])

  if (isLoading) return <div>Loading...</div>
  if (!isAuthorized) return <div>Access Denied</div>

  return <div>Welcome, {user?.name}</div>
}
```

#### With Component
```tsx
import { ProtectedContent } from '@/lib/auth'

export default function Page() {
  return (
    <ProtectedContent requiredRoles={['admin']}>
      <AdminPanel />
    </ProtectedContent>
  )
}
```

### Using OAuth

OAuth is automatically available in login page. To use it in other components:

```tsx
import { useOAuth } from '@/lib/oauth'

export default function MyComponent() {
  const { initiateOAuth, isOAuthLoading, oauthError } = useOAuth()

  const handleGoogleLogin = () => {
    initiateOAuth('google')
  }

  return (
    <button onClick={handleGoogleLogin} disabled={isOAuthLoading}>
      {isOAuthLoading ? 'Loading...' : 'Login with Google'}
    </button>
  )
}
```

## Route Protection

The middleware automatically protects these routes:

**Protected Routes (Require Authentication):**
- `/account/*` - User account pages
- `/admin/*` - Admin dashboard
- `/checkout/*` - Checkout pages
- `/orders/*` - Order pages
- `/profile/*` - Profile pages
- `/wishlist/*` - Wishlist pages
- `/compare/*` - Compare pages

**Auth Routes (Redirect if Authenticated):**
- `/login` - Login page
- `/register` - Register page
- `/forgot-password` - Forgot password
- `/reset-password` - Reset password
- `/auth/callback` - OAuth callbacks

**Public Routes (No Protection):**
- `/` - Home
- `/products` - Products
- `/categories` - Categories
- `/brands` - Brands
- And other public pages

## Security Features

✅ **PKCE Flow** - For Google OAuth (authorization code with code verifier)
✅ **CSRF Protection** - State parameter verification
✅ **Token Management** - Secure token storage and refresh
✅ **Auto Token Injection** - Automatic Bearer token in all API requests
✅ **Route Protection** - Middleware-based server-side protection
✅ **Role-based Access** - User roles (user, admin, management)
✅ **Session Management** - Cross-tab synchronization
✅ **Logout Handling** - Automatic redirect on session expiry

## OAuth Flow

```
1. User clicks "Login with Google/Facebook"
   ↓
2. Frontend redirects to OAuth provider
   ↓
3. User grants permission
   ↓
4. Provider redirects to /auth/callback/[provider]?code=...
   ↓
5. Frontend calls /api/auth/oauth-callback (POST)
   ↓
6. Backend exchanges code for token and fetches user profile
   ↓
7. Backend calls your API's /api/auth/oauth-sync
   ↓
8. Your API creates/updates user and returns session token
   ↓
9. Frontend stores token and redirects to home/dashboard
```

## Troubleshooting

### "Missing OAuth credentials"
- Check `.env.local` has all required variables
- Restart dev server after updating env vars
- Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side usage

### "Invalid redirect URI"
- Verify redirect URI matches exactly in OAuth app settings
- Format: `http://localhost:3000/auth/callback/google`
- For production, use your actual domain

### "OAuth callback fails silently"
- Check browser console for error messages
- Verify backend `/api/auth/oauth-sync` endpoint is working
- Check API response format matches expected schema

### "Session expires immediately"
- Ensure `AUTH_SECRET` is set in `.env.local`
- Check token is being stored correctly in auth store
- Verify API returns `token` in response

## Production Deployment

Before deploying to production:

1. **Update environment variables:**
   ```
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
   ```

2. **Register OAuth apps:**
   - Add production redirect URIs to Google and Facebook app settings
   - URIs: `https://yourdomain.com/auth/callback/google`
   - URIs: `https://yourdomain.com/auth/callback/facebook`

3. **Set secure secrets:**
   ```
   AUTH_SECRET=generate_a_strong_random_secret
   GOOGLE_CLIENT_SECRET=prod_secret
   FACEBOOK_APP_SECRET=prod_secret
   ```

4. **Enable HTTPS:**
   - OAuth requires HTTPS in production
   - Update all URLs to use `https://`

5. **Database Setup:**
   - Implement proper user persistence
   - Update `/api/auth/oauth-sync` to use your database

6. **Testing:**
   - Test OAuth flow end-to-end
   - Verify protected routes redirect properly
   - Check token refresh works

## API Integration

The auth system uses your existing API client. When a user logs in:

1. Token is stored in Zustand auth store
2. Token is automatically added to all API requests via axios interceptor
3. On 401 error, user is redirected to login
4. Session events trigger auth updates across tabs

See `src/app/lib/api/client.ts` for implementation details.

## Additional Features

### Custom OAuth Providers

To add more providers (GitHub, Microsoft, etc.):

1. Add to `OAuthConfig` in `oauth-context.tsx`
2. Implement OAuth flow in `initiateOAuth()`
3. Add callback handler in API route
4. Update routes in OAuth callback page

### Email Verification

After OAuth login, you can:
- Send verification email
- Require email confirmation
- Update user profile

Implement in `/api/auth/oauth-sync` endpoint.

### Multi-Tab Synchronization

The auth system automatically syncs across tabs:
- Login in one tab updates all tabs
- Logout in one tab affects all tabs
- Session expiry triggers logout everywhere

## Support

For issues or questions:
1. Check browser console for errors
2. Check server logs for API errors
3. Verify environment variables are set
4. Verify OAuth credentials are correct
5. Check OAuth provider settings

## References

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
- [PKCE Specification](https://tools.ietf.org/html/rfc7636)
