import type { Metadata } from "next"
import { generateSEO } from "../../lib/seo"
import { FAQsClient } from "./faqs-client"

export const metadata: Metadata = generateSEO({
  title: "FAQs - Frequently Asked Questions | TechStore",
  description: "Find answers to common questions about TechStore products, ordering, shipping, payments, EMI, warranty, returns and refunds. Get help fast with our comprehensive FAQ guide.",
  url: "/faqs",
  keywords: ["FAQ", "frequently asked questions", "help", "support", "shipping", "returns", "warranty", "payment"],
})

export default function FAQsPage() {
  return <FAQsClient />
}
