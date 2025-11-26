"use client"

import { Shield, Check } from "lucide-react"
import { formatPrice } from "@/app/lib/utils/format"
import { cn } from "@/app/lib/utils"

interface CarePlusAddonProps {
  basePrice: number
  selected: boolean
  onToggle: () => void
}

export function CarePlusAddon({ basePrice, selected, onToggle }: CarePlusAddonProps) {
  const carePlusPrice = Math.round(basePrice * 0.08)

  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all",
        selected ? "border-foreground bg-foreground/5" : "border-border hover:border-foreground/30",
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected ? "border-foreground bg-foreground" : "border-muted-foreground",
        )}
      >
        {selected && <Check className="h-3 w-3 text-background" />}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-foreground" />
          <span className="font-semibold">Care+ Protection Plan</span>
          <span className="text-sm font-medium text-muted-foreground">+{formatPrice(carePlusPrice)}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          2 years of extended warranty with accidental damage coverage, priority support, and express repair service.
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <li className="flex items-center gap-1">
            <Check className="h-3 w-3 text-[oklch(0.45_0.2_145)]" /> Accidental damage
          </li>
          <li className="flex items-center gap-1">
            <Check className="h-3 w-3 text-[oklch(0.45_0.2_145)]" /> Battery replacement
          </li>
          <li className="flex items-center gap-1">
            <Check className="h-3 w-3 text-[oklch(0.45_0.2_145)]" /> Express repair
          </li>
        </ul>
      </div>
    </button>
  )
}
