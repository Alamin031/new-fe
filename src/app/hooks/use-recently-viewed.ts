"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface RecentlyViewedProduct {
  id: string
  name: string
  slug: string
  image: string
  price: number
  viewedAt: number
}

interface RecentlyViewedStore {
  items: RecentlyViewedProduct[]
  addItem: (product: Omit<RecentlyViewedProduct, "viewedAt">) => void
  clearItems: () => void
}

export const useRecentlyViewed = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const filtered = state.items.filter((item) => item.id !== product.id)
          const newItems = [{ ...product, viewedAt: Date.now() }, ...filtered].slice(0, 10) // Keep only last 10 items
          return { items: newItems }
        })
      },
      clearItems: () => set({ items: [] }),
    }),
    {
      name: "recently-viewed",
    },
  ),
)
