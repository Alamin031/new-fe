"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/app/lib/utils"
import type { Product } from "@/app/types"

interface ProductTabsProps {
  product: Product
}

const faqs = [
  {
    question: "What is the warranty period?",
    answer: "This product comes with 1 year official warranty. You can also add Care+ for extended 2-year coverage.",
  },
  {
    question: "Is this product original?",
    answer: "Yes, all our products are 100% genuine and sourced directly from authorized distributors.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept bKash, Nagad, bank cards, bank transfer, and cash on delivery.",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery typically takes 2-5 business days within Bangladesh. Express delivery is available in Dhaka.",
  },
]

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("specifications")
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const tabs = [
    { id: "specifications", label: "Specifications" },
    { id: "description", label: "Description" },
    { id: "warranty", label: "Warranty" },
    { id: "faq", label: "FAQ" },
  ]

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex gap-1 border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "shrink-0 border-b-2 px-6 py-3 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === "specifications" && (
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <tr
                    key={key}
                    className={cn("border-b border-border last:border-0", index % 2 === 0 ? "bg-muted/50" : "bg-card")}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-muted-foreground w-1/3">{key}</td>
                    <td className="px-6 py-4 text-sm">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "description" && (
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            <h3 className="mt-6 text-lg font-semibold">Key Features</h3>
            <ul className="mt-3 space-y-2">
              {product.highlights.map((highlight, index) => (
                <li key={index} className="text-muted-foreground">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "warranty" && (
          <div className="space-y-6">
            <div className="rounded-xl bg-muted p-6">
              <h3 className="text-lg font-semibold">Warranty Information</h3>
              <p className="mt-2 text-muted-foreground">{product.warranty}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border p-6">
                <h4 className="font-semibold">What&apos;s Covered</h4>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>• Manufacturing defects</li>
                  <li>• Hardware malfunctions</li>
                  <li>• Software issues (factory reset)</li>
                  <li>• Battery performance issues</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border p-6">
                <h4 className="font-semibold">What&apos;s Not Covered</h4>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>• Physical damage</li>
                  <li>• Water damage</li>
                  <li>• Unauthorized modifications</li>
                  <li>• Normal wear and tear</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden rounded-xl border border-border">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-muted/50"
                >
                  {faq.question}
                  <ChevronDown
                    className={cn("h-5 w-5 shrink-0 transition-transform", openFAQ === index && "rotate-180")}
                  />
                </button>
                <div className={cn("overflow-hidden transition-all", openFAQ === index ? "max-h-40" : "max-h-0")}>
                  <p className="border-t border-border bg-muted/30 p-4 text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
