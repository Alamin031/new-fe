"use client"

import Link from "next/link"
import Image from "next/image"

const categories = [
  { name: "Smartphones", slug: "smartphones", image: "/smartphone-icon-minimal.jpg" },
  { name: "Laptops", slug: "laptops", image: "/laptop-icon-minimal.jpg" },
  { name: "Tablets", slug: "tablets", image: "/tablet-icon-minimal.jpg" },
  { name: "Smartwatches", slug: "smartwatches", image: "/smartwatch-icon-minimal.jpg" },
  { name: "Headphones", slug: "headphones", image: "/headphones-icon-minimal.jpg" },
  { name: "Cameras", slug: "cameras", image: "/minimal-camera-icon.png" },
  { name: "Gaming", slug: "gaming", image: "/gaming-controller-icon-minimal.jpg" },
  { name: "Accessories", slug: "accessories", image: "/tech-accessories-icon-minimal.jpg" },
]

export function CategorySlider() {
  return (
    <div className="overflow-x-auto scrollbar-thin pb-4">
      <div className="flex gap-4 min-w-max md:justify-center">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group flex flex-col items-center gap-3"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-muted transition-all duration-300 group-hover:bg-accent group-hover:shadow-md md:h-24 md:w-24">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover p-3 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
