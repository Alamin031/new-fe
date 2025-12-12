
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ShareButton from "./ShareButton";
import { notFound } from "next/navigation";
import blogsService, { BlogPost } from "../../../lib/api/services/blogs";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post: BlogPost = await blogsService.getBySlug(slug);
    return {
      title: post.title,
      description: post.excerpt || post.title,
    };
  } catch {
    return {
      title: "Article Not Found",
      description: "The article you are looking for does not exist",
    };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: BlogPost | null = null;
  try {
    post = await blogsService.getBySlug(slug);
  } catch {
    notFound();
  }
  if (!post) {
    notFound();
  }

  // Related posts logic removed (no category field)
  // Related posts removed

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="space-y-8">
          {/* Title and Meta */}
          <div className="space-y-4">
            {/* Category removed */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
            {post.excerpt && <p className="text-xl text-muted-foreground">{post.excerpt}</p>}

            {/* Author, Date, ReadTime removed */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/40">
              <ShareButton title={post.title} excerpt={post.excerpt} slug={post.slug} />
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Divider */}
          <div className="border-t border-border/40 my-12" />

          {/* Author Bio removed */}

          {/* Divider */}
          <div className="border-t border-border/40 my-12" />

          {/* Related Posts removed */}
        </article>
      </div>
    </div>
  )
}
