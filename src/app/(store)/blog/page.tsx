"use client";
import { Card, CardContent } from "@/app/components/ui/card"
import blogsService, { BlogPost } from "@/app/lib/api/services/blogs"
import { ArrowRight, Calendar } from "lucide-react"
import { useEffect, useState } from "react"
import { BlogSearchClient } from "./blog-search"
import Image from "next/image"

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const postsResponse = await blogsService.getAll()
        const postsWithId = postsResponse.data.map((post: BlogPost) => ({
          ...post,
          id: typeof post.id === "string"
            ? post.id
            : post.id !== undefined
              ? String(post.id)
              : "", // fallback to empty string if id is undefined
        }))
        setBlogPosts(postsWithId)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setBlogPosts([])
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="py-24 text-center text-lg">Loading blog posts...</div>
  }

  if (!blogPosts.length) {
    return <div className="py-24 text-center text-lg">No blog posts found.</div>
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">TechStore Blog</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Stay informed with the latest technology news, expert reviews, buying guides, and industry insights.
        </p>
      </section>

      {/* Search and Filter */}
      <section>
        <BlogSearchClient posts={blogPosts.map(post => ({
          ...post,
          excerpt: post.excerpt ?? "",
          image: post.image ?? "", // Ensure image is always a string
          readTime: post.readTime !== undefined ? String(post.readTime) : "", // Ensure readTime is always a string
        }))} />
      </section>

      {/* Featured Post */}
      {blogPosts[0] && (
        <section className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted lg:aspect-auto">
            <Image
              src={blogPosts[0].image || "/placeholder.svg"}
              alt={blogPosts[0].title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-between rounded-2xl bg-muted/50 p-8">
            <div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">{blogPosts[0].title}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{blogPosts[0].excerpt}</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(blogPosts[0].publishedAt || "").toLocaleDateString()}
              </div>
              {blogPosts[0].readTime && (
                <span className="text-sm text-muted-foreground">{blogPosts[0].readTime}</span>
              )}
              <a 
                href={`/blog/${blogPosts[0].slug}`} 
                className="ml-auto inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                Read More
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Recent Articles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1, 7).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardContent className="flex flex-col flex-1 pt-6">
                <div>
                  <h3 className="mt-2 text-lg font-semibold line-clamp-2">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  {post.readTime && <span>{post.readTime}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section>
        <h2 className="mb-8 text-3xl font-bold tracking-tight">All Articles</h2>
        <div className="space-y-4">
          {blogPosts.slice(7).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-6">
                <div className="relative aspect-video sm:w-32 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 128px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mt-1 text-lg font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.publishedAt || "").toLocaleDateString()}
                    </div>
                    {post.readTime && <span>{post.readTime}</span>}
                    <a 
                      href={`/blog/${post.slug}`} 
                      className="ml-auto text-primary hover:underline font-medium"
                    >
                      Read →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="rounded-2xl bg-primary/5 p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Subscribe to Our Newsletter</h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Get the latest tech news, reviews, and buying guides delivered to your inbox every week.
        </p>
        <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg border border-border bg-background flex-1"
            required
          />
          <button 
            type="submit" 
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  )
}