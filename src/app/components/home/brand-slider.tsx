"use client"

import Link from "next/link"
import Image from "next/image"

const brands = [
  { name: "Apple", slug: "apple", logo: "/apple-logo-minimal.jpg" },
  { name: "Samsung", slug: "samsung", logo: "/samsung-logo-minimal.jpg" },
  { name: "Google", slug: "google", logo: "/google-logo-minimal.jpg" },
  { name: "OnePlus", slug: "oneplus", logo: "/oneplus-logo-minimal.jpg" },
  { name: "Sony", slug: "sony", logo: "/sony-logo-minimal.jpg" },
  { name: "Xiaomi", slug: "xiaomi", logo: "/xiaomi-logo-minimal.jpg" },
  { name: "Oppo", slug: "oppo", logo: "/oppo-logo-minimal.jpg" },
  { name: "Vivo", slug: "vivo", logo: "/vivo-logo-minimal.jpg" },
]

export function BrandSlider() {
  return (
    <section>
      <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">Shop by Brand</h2>
      <div className="overflow-x-auto scrollbar-thin pb-4">
        <div className="flex gap-4 min-w-max justify-center">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brand/${brand.slug}`}
              className="group flex h-20 w-40 items-center justify-center rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-foreground/20 hover:shadow-md"
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={120}
                height={40}
                className="object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
