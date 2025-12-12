"use client"

import { useState } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"


interface BlogPost {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
}

type BlogSearchClientProps = {
  posts: BlogPost[];
}

export function BlogSearchClient({ posts }: BlogSearchClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
    const filteredPosts: BlogPost[] = posts.filter((post: BlogPost) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-lg border border-border p-8 text-center">
          <p className="text-muted-foreground">
            No articles found matching your search. Try different keywords.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Found {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex flex-col justify-between pt-6 flex-1">
                  <div>
                    <h3 className="mt-2 text-lg font-semibold line-clamp-2">{post.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.readTime}</span>
                  </div>
                  <a
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-block text-primary hover:underline font-medium text-sm"
                  >
                    Read Article →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
