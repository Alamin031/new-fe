import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import { notFound } from "next/navigation"


interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The article you are looking for does not exist",
    }
  }

  return generateSEO({
    title: post.title,
    description: post.excerpt,
    url: `/blog/${post.slug}`,
    keywords: [post.category.toLowerCase(), "blog", "article", ...post.title.split(" ").slice(0, 5)],
    type: "article",
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  // Get related posts from same category (excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

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
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-primary">{post.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
            <p className="text-xl text-muted-foreground">{post.excerpt}</p>

            {/* Author and Date */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/40">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <span className="text-sm text-muted-foreground">{post.readTime}</span>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: `/blog/${post.slug}`,
                    })
                  }
                }}
                className="ml-auto text-primary hover:underline"
              >
                <Share2 className="h-4 w-4" />
              </button>
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
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="space-y-6 text-base leading-relaxed">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("##")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {paragraph.replace(/^##\s*/, "")}
                    </h2>
                  )
                }
                if (paragraph.startsWith("###")) {
                  return (
                    <h3 key={index} className="text-xl font-semibold mt-6 mb-2">
                      {paragraph.replace(/^###\s*/, "")}
                    </h3>
                  )
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                      {paragraph.split("\n").map((item, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {item.replace(/^-\s*/, "")}
                        </li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={index} className="text-muted-foreground">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/40 my-12" />

          {/* Author Bio */}
          <div className="rounded-lg bg-muted/50 p-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Tech writer and product reviewer with over 5 years of experience in the tech industry.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/40 my-12" />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex flex-col justify-between pt-6 flex-1">
                      <div>
                        <p className="text-xs font-medium text-primary">{relatedPost.category}</p>
                        <h3 className="mt-2 text-lg font-semibold line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </div>
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="mt-4 inline-block text-primary hover:underline font-medium text-sm"
                      >
                        Read Article →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
