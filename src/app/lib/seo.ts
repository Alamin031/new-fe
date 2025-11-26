import type { Metadata } from "next"

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: "website" | "article"
  keywords?: string[]
}

export function generateSEO({
  title,
  description,
  image = "/og-image.jpg",
  url,
  type = "website",
  keywords = [],
}: SEOProps): Metadata {
  const siteName = "TechStore"
  const baseUrl = "https://techstore.com"

  return {
    title,
    description,
    keywords: ["electronics", "gadgets", "smartphones", "laptops", ...keywords],
    openGraph: {
      title,
      description,
      url: url ? `${baseUrl}${url}` : baseUrl,
      siteName,
      images: [
        {
          url: image.startsWith("http") ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("http") ? image : `${baseUrl}${image}`],
    },
  }
}

export function generateProductSchema(product: {
  name: string
  description: string
  image: string
  price: number
  originalPrice?: number
  sku: string
  brand: string
  rating: number
  reviewCount: number
  inStock: boolean
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://techstore.com${item.url}`,
    })),
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TechStore",
    url: "https://techstore.com",
    logo: "https://techstore.com/logo.png",
    sameAs: ["https://facebook.com/techstore", "https://twitter.com/techstore", "https://instagram.com/techstore"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-1800-123-4567",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  }
}
