"use client"

import { useRef, useEffect } from "react"
import { ProductCard } from "../product/product-card"
import type { Product } from "@/app/types"

interface ProductSectionProps {
  title: string
  subtitle?: string
  products: Product[]
  badge?: string
  badgeColor?: string
  isLoading?: boolean
}

const CARD_WIDTH = 240 + 16 // card width + gap (px), adjust gap if needed

export function ProductSection({
  title,
  subtitle,
  products,
  badge,
  badgeColor = "bg-foreground",
  isLoading = false,
}: ProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (products.length <= 4) return // Disable auto-scroll if 4 or fewer
    const container = scrollRef.current
    if (!container) return

    let direction = 1
    let currentIndex = 0
    const visibleCards = 4
    const cardWidth = CARD_WIDTH // px
    const interval = 2500 // ms between scrolls

    const scrollToCard = (index: number) => {
      if (!container) return
      container.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      })
    }

    const autoScroll = () => {
      if (!container) return
      const maxIndex = Math.max(0, products.length - visibleCards)
      if (currentIndex >= maxIndex) {
        direction = -1
      } else if (currentIndex <= 0) {
        direction = 1
      }
      currentIndex += direction
      scrollToCard(currentIndex)
    }

    const scrollInterval = setInterval(autoScroll, interval)
    return () => clearInterval(scrollInterval)
  }, [isLoading, products.length])

  return (
    <section>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            {badge && (
              <span className={`rounded-full ${badgeColor} px-3 py-1 text-xs font-medium text-background`}>
                {badge}
              </span>
            )}
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          </div>
          {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div
        ref={scrollRef}
        className={`flex gap-4 pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/30 w-full ${
          products.length > 4 ? "overflow-x-auto" : ""
        }`}
      >
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-[240px] min-h-[320px] bg-muted animate-pulse rounded-[2rem] flex-shrink-0"
            />
          ))
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="w-[240px] min-h-[320px] flex-shrink-0 flex"
            >
              <ProductCard product={product} className="w-full h-full" />
            </div>
          ))
        )}
      </div>
    </section>
  )
}
