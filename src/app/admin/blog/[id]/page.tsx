'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BlogForm } from '../../../components/admin/blog-form';
import { withProtectedRoute } from '../../../lib/auth/protected-route';
import { Loader2 } from 'lucide-react';
import blogsService, { BlogPost } from '../../../lib/api/services/blogs';
import { Card, CardContent } from '../../../components/ui/card';

function EditBlogPage() {
  const params = useParams();
  // Normalize id to string for API compatibility
  const id = params?.id ? String(params.id) : '';
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await blogsService.getById(id);
        // Normalize id and _id to string for consistency
        setBlog({
          ...data,
          id: data.id ? String(data.id) : '',
          publishedAt: data.publishedAt ? String(data.publishedAt) : undefined,
          readTime: typeof data.readTime === 'number' ? data.readTime : data.readTime ? Number(data.readTime) : undefined,
        });
      } catch (err: unknown) {
        type ErrorWithResponse = { response?: { data?: { error?: string } } };
        if (
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          (err as ErrorWithResponse).response?.data?.error
        ) {
          setError((err as ErrorWithResponse).response!.data!.error!);
        } else {
          setError('Failed to load blog');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground mt-4">Loading blog...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!blog) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">Blog not found</p>
        </CardContent>
      </Card>
    );
  }

  if (blog) {
    console.log('Blog data:', blog);
  }

  return <BlogForm initialData={blog} isEditing={true} />;
}

export default withProtectedRoute(EditBlogPage, {
  requiredRoles: ['admin'],
  fallbackTo: '/login',
  showLoader: true,
});
