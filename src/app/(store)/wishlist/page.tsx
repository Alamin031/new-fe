import { WishlistContent } from "@/app/components/wishlist/wishlist-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved products.",
}

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">My Wishlist</h1>
      <WishlistContent />
    </div>
  )
}
