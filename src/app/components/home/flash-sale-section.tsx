"use client"

import { useState, useEffect } from "react"
import { FlashSaleCard } from "./flash-sale-card"
import { flashsellService, type Flashsell } from "@/app/lib/api/services/flashsell"
import { toast } from "sonner"

export function FlashSaleSection() {
  const [flashsales, setFlashsales] = useState<Flashsell[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFlashsales = async () => {
      try {
        setLoading(true)
        const data = await flashsellService.findAll()
        const activeFlashsales = data.filter((fs) => {
          const now = new Date()
          const start = new Date(fs.startTime)
          return now <= new Date(fs.endTime) || now < start
        })
        setFlashsales(activeFlashsales)
      } catch (error) {
        console.error("Failed to load flash sales:", error)
        toast.error("Failed to load flash sales")
      } finally {
        setLoading(false)
      }
    }

    fetchFlashsales()
  }, [])

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="space-y-2 mb-6">
          <div className="h-8 w-40 bg-muted rounded animate-pulse" />
          <div className="h-4 w-60 bg-muted rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-muted rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  if (flashsales.length === 0) {
    return null
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-purple-500 bg-clip-text text-transparent">Flash</span>
          <span className="text-foreground"> Sales</span>
        </h2>
      </div>
      <div className={flashsales.length >= 3
        ? "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        : flashsales.length === 2
        ? "grid grid-cols-1 gap-4 md:grid-cols-2"
        : "grid grid-cols-1 gap-4"}>
        {flashsales.map((flashsale) => (
          <FlashSaleCard key={flashsale.id} flashsale={flashsale} />
        ))}
      </div>
    </section>
  )
}
