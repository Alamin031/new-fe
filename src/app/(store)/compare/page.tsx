import type { Metadata } from "next"
import { CompareContent } from "../../components/compare/compare-content"

export const metadata: Metadata = {
  title: "Compare Products",
  description: "Compare products side by side.",
}

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Compare Products</h1>
      <CompareContent />
    </div>
  )
}
