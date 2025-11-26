"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"
import { ProductCard } from "../product/product-card"
import { Button } from "../ui/button"
import type { Product } from "@/app/types"
interface FlashSaleProps {
  products: Product[]
  endTime: Date
}

function useCountdown(endTime: Date) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return timeLeft
}

export function FlashSale({ products, endTime }: FlashSaleProps) {
  const { hours, minutes, seconds } = useCountdown(endTime)

  return (
    <section className="rounded-2xl bg-foreground p-6 text-background md:p-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 fill-[oklch(0.75_0.15_85)] text-[oklch(0.75_0.15_85)]" />
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Flash Sale</h2>
          </div>
          <p className="mt-1 text-background/70">Limited time deals on selected items</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-background/70">Ends in:</span>
            <div className="flex items-center gap-1">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-lg font-bold text-foreground">
                {String(hours).padStart(2, "0")}
              </span>
              <span className="text-xl font-bold">:</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-lg font-bold text-foreground">
                {String(minutes).padStart(2, "0")}
              </span>
              <span className="text-xl font-bold">:</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-lg font-bold text-foreground">
                {String(seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
          <Link href="/deals/flash-sale">
            <Button variant="secondary" className="gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
