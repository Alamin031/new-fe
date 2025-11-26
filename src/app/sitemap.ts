import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://techstore.com"

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/return-policy",
    "/faq",
    "/login",
    "/register",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Category pages
  const categories = [
    "smartphones",
    "laptops",
    "tablets",
    "audio",
    "wearables",
    "accessories",
    "gaming",
    "cameras",
  ].map((category) => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  // Sample product pages (in real app, fetch from database)
  const products = [
    "iphone-15-pro-max",
    "macbook-air-m3",
    "samsung-galaxy-s24-ultra",
    "sony-wh-1000xm5",
    "ipad-pro-12-9",
    "airpods-pro-2",
  ].map((product) => ({
    url: `${baseUrl}/product/${product}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...categories, ...products]
}
