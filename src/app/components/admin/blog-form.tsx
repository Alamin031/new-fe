'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { AlertCircle, Loader2 } from 'lucide-react';
import blogsService, { BlogPost } from '../../lib/api/services/blogs';

interface BlogFormProps {
  initialData?: BlogPost;
  isEditing?: boolean;
}

const categories = [
  'Smartphones',
  'Laptops',
  'Tablets',
  'Technology',
  'Comparison',
  'Gaming',
  'Tips',
  'Reviews',
];

export function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    author: initialData?.author || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    category: initialData?.category || '',
    image: initialData?.image || '',
    readTime: initialData?.readTime || '',
    status: (initialData?.status as 'draft' | 'published') || 'draft',
    tags: initialData?.tags?.join(', ') || '',
  });

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'title' && !initialData) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !formData.title ||
      !formData.slug ||
      !formData.author ||
      !formData.excerpt ||
      !formData.content ||
      !formData.category
    ) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.content.length < 100) {
      setError('Content must be at least 100 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      if (isEditing && initialData?._id) {
        await blogsService.update(initialData._id, payload);
      } else {
        await blogsService.create(payload);
      }

      router.push('/admin/blog');
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isEditing
            ? 'Update the blog post details and content'
            : 'Create a new blog post with rich content'}
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title and Slug */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter blog post title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                name="slug"
                placeholder="url-friendly-slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                className="mt-1"
                disabled={isEditing}
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL-friendly identifier. Auto-generated from title.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author">
                  Author <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Author name"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="readTime">Read Time</Label>
                <Input
                  id="readTime"
                  name="readTime"
                  placeholder="e.g., 5 min read"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category and Status */}
        <Card>
          <CardHeader>
            <CardTitle>Classification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(val) => handleSelectChange('category', val)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(val) => handleSelectChange('status', val as 'draft' | 'published')}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="Separate tags with commas (e.g., tech, guide, review)"
                value={formData.tags}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Image and Excerpt */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="image">Featured Image URL</Label>
              <Input
                id="image"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="excerpt">
                Excerpt <span className="text-red-500">*</span>
              </Label>
              <textarea
                id="excerpt"
                name="excerpt"
                placeholder="Brief summary of the blog post (shown in listings)"
                value={formData.excerpt}
                onChange={handleInputChange}
                required
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="content">
              Full Content <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="content"
              name="content"
              placeholder="Write your blog post content here. Supports markdown formatting."
              value={formData.content}
              onChange={handleInputChange}
              required
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              rows={15}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Supports markdown: # Headings, ## Subheadings, - Lists, etc.
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEditing ? 'Update Blog' : 'Create Blog'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
