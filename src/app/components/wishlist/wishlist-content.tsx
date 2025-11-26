"use client"

import Link from "next/link"
import { Heart, ArrowRight } from "lucide-react"
import { Button } from "../../components/ui/button"
import { ProductCard } from "../../components/product/product-card"
import { useWishlistStore } from "../../store/wishlist-store"

export function WishlistContent() {
  const { items, clearWishlist } = useWishlistStore()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Heart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
        <p className="mt-2 text-muted-foreground">Save items you love by clicking the heart icon on any product.</p>
        <Link href="/">
          <Button className="mt-6 gap-2">
            Start Shopping
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"} saved
        </p>
        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={clearWishlist}>
          Clear All
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
