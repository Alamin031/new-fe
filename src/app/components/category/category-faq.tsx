"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
// Update the path below if your utils file is located elsewhere
import { cn } from "../../lib/utils"

interface CategoryFAQProps {
  categoryName: string
}

export function CategoryFAQ({ categoryName }: CategoryFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: `What types of ${categoryName.toLowerCase()} do you sell?`,
      answer: `We offer a wide range of ${categoryName.toLowerCase()} from top brands including Apple, Samsung, Google, OnePlus, and more. All products are 100% genuine with official warranty.`,
    },
    {
      question: `Do you offer EMI options for ${categoryName.toLowerCase()}?`,
      answer:
        "Yes, we offer 0% EMI on select bank cards for 3-6 months, and competitive EMI rates for up to 24 months. Check the product page for specific EMI options.",
    },
    {
      question: `What is the warranty period for ${categoryName.toLowerCase()}?`,
      answer:
        "All products come with official manufacturer warranty, typically 1 year. You can also add Care+ for extended protection covering accidental damage.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Standard delivery takes 2-5 business days across Bangladesh. Express delivery is available in Dhaka (same-day or next-day). Free shipping on orders above ৳5,000.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 7-day return policy for unopened products. For defective items, you can claim warranty service at any authorized service center.",
    },
  ]

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="overflow-hidden rounded-xl border border-border">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-muted/50"
            >
              {faq.question}
              <ChevronDown
                className={cn("h-5 w-5 shrink-0 transition-transform", openIndex === index && "rotate-180")}
              />
            </button>
            <div className={cn("overflow-hidden transition-all", openIndex === index ? "max-h-40" : "max-h-0")}>
              <p className="border-t border-border bg-muted/30 p-4 text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
