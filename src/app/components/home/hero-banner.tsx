"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/app/lib/utils"
const banners = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    subtitle: "Titanium. So strong. So light. So Pro.",
    image: "/iphone-15-pro-max-titanium-premium.jpg",
    link: "/product/iphone-15-pro-max",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "Galaxy S24 Ultra",
    subtitle: "The ultimate AI companion for your life.",
    image: "/samsung-galaxy-s24-ultra-premium.jpg",
    link: "/product/samsung-galaxy-s24-ultra",
    cta: "Explore",
  },
  {
    id: 3,
    title: "MacBook Pro M3",
    subtitle: "Mind-blowing. Head-turning.",
    image: "/macbook-pro-m3-premium.jpg",
    link: "/product/macbook-pro-m3",
    cta: "Learn More",
  },
]

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-muted"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <div className="relative aspect-[21/9] w-full md:aspect-[21/8]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <Image
              src={banner.image || "/placeholder.svg"}
              alt={banner.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
                <div className="max-w-lg">
                  <h2 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">{banner.title}</h2>
                  <p className="mt-3 text-lg text-muted-foreground md:text-xl">{banner.subtitle}</p>
                  <Link href={banner.link}>
                    <Button size="lg" className="mt-6">
                      {banner.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === currentSlide ? "w-8 bg-foreground" : "w-2 bg-foreground/30 hover:bg-foreground/50",
            )}
          />
        ))}
      </div>
    </div>
  )
}
