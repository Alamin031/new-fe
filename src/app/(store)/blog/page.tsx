"use client";
import { Card, CardContent } from "@/app/components/ui/card"
import blogsService, { BlogPost } from "@/app/lib/api/services/blogs"
import { ArrowRight, Calendar, Clock, Sparkles, Mail, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { BlogSearchClient } from "./blog-search"
import Image from "next/image"
import { Badge } from "@/app/components/ui/badge"

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
              : "",
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  if (!blogPosts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">No blog posts found yet.</p>
          <p className="text-sm text-muted-foreground mt-2">Check back soon for exciting content!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-purple-950/30 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-200 dark:bg-emerald-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <div className="inline-block mb-4">
            <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
              <Sparkles className="h-3 w-3 mr-1" />
              Technology Insights
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground mb-6">
            TechStore Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest technology news, expert reviews, comprehensive buying guides, and industry insights from our team of specialists.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        {/* Search and Filter */}
        <section className="mb-16">
          <BlogSearchClient posts={blogPosts.map(post => ({
            ...post,
            excerpt: post.excerpt ?? "",
            image: post.image ?? "",
            readTime: post.readTime !== undefined ? String(post.readTime) : "",
          }))} />
        </section>

        {/* Featured Post */}
        {blogPosts[0] && (
          <section className="mb-20">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Featured Article</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-white/80 to-white/60 dark:from-background/80 dark:to-background/60 p-8 md:p-10 hover:shadow-xl transition-shadow">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={blogPosts[0].image || "/placeholder.svg"}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="inline-block mb-4">
                    <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                      Featured
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                    {blogPosts[0].title}
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border/30 pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-emerald-600" />
                    {new Date(blogPosts[0].publishedAt || "").toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  {blogPosts[0].readTime && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  )}
                  <a 
                    href={`/blog/${blogPosts[0].slug}`} 
                    className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recent Posts Grid */}
        <section className="mb-20">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Recent Articles</h2>
            <p className="text-muted-foreground">Handpicked stories from our latest publications</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(1, 7).map((post, index) => (
              <a 
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group h-full"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border-border/50 hover:border-emerald-300 dark:hover:border-emerald-700">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="flex flex-col flex-1 pt-6 pb-6">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                        Article
                      </Badge>
                      <h3 className="text-lg font-bold line-clamp-2 text-foreground group-hover:text-emerald-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/30">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {post.readTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* All Posts Section */}
        {blogPosts.length > 7 && (
          <section className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">All Articles</h2>
              <p className="text-muted-foreground">Browse our complete collection of tech insights and guides</p>
            </div>
            <div className="space-y-4">
              {blogPosts.slice(7).map((post) => (
                <a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-border/50 hover:border-emerald-300 dark:hover:border-emerald-700">
                    <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-6">
                      <div className="relative aspect-video sm:w-40 sm:h-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, 160px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.publishedAt || "").toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          {post.readTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </div>
                          )}
                          <span className="ml-auto font-semibold text-primary group-hover:text-emerald-600 flex items-center gap-1 transition-colors">
                            Read Article
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Newsletter Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-700 dark:to-blue-700 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            <Mail className="h-4 w-4" />
            <span className="text-sm font-semibold">Stay Updated</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Get the latest tech news, exclusive reviews, buying guides, and industry insights delivered to your inbox every week.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              required
            />
            <button 
              type="submit" 
              className="px-6 py-3 rounded-lg bg-white text-emerald-600 font-bold hover:bg-white/90 transition-all duration-200 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-white/80 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}
