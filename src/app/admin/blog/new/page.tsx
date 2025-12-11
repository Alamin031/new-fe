import { BlogForm } from '../../../components/admin/blog-form';
import { withProtectedRoute } from '../../../lib/auth/protected-route';

function NewBlogPage() {
  return <BlogForm />;
}

export default withProtectedRoute(NewBlogPage, {
  requiredRoles: ['admin'],
  fallbackTo: '/login',
  showLoader: true,
});
