/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { ChevronDown, X, SlidersHorizontal } from "lucide-react"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { cn } from "@/app/lib/utils"
import { formatPrice } from "@/app/lib/utils/format"
import { mockBrands } from "@/app/lib/mock-data"
import { Slider } from "../ui/slider"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"


const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"]
const ramOptions = ["4GB", "6GB", "8GB", "12GB", "16GB"]

export function CategoryFilters() {
  const [priceRange, setPriceRange] = useState([0, 300000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedStorage, setSelectedStorage] = useState<string[]>([])
  const [selectedRam, setSelectedRam] = useState<string[]>([])
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    price: true,
    storage: true,
    ram: false,
  })

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const toggleStorage = (storage: string) => {
    setSelectedStorage((prev) => (prev.includes(storage) ? prev.filter((s) => s !== storage) : [...prev, storage]))
  }

  const toggleRam = (ram: string) => {
    setSelectedRam((prev) => (prev.includes(ram) ? prev.filter((r) => r !== ram) : [...prev, ram]))
  }

  const clearAllFilters = () => {
    setPriceRange([0, 300000])
    setSelectedBrands([])
    setSelectedStorage([])
    setSelectedRam([])
  }

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedStorage.length > 0 ||
    selectedRam.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 300000

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Active Filters:</span>
          {selectedBrands.map((brand) => (
            <Button
              key={brand}
              variant="secondary"
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={() => toggleBrand(brand)}
            >
              {brand}
              <X className="h-3 w-3" />
            </Button>
          ))}
          <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>
      )}

      {/* Brands */}
      <div>
        <button
          onClick={() => toggleSection("brands")}
          className="flex w-full items-center justify-between py-2 font-semibold"
        >
          Brands
          <ChevronDown className={cn("h-4 w-4 transition-transform", expandedSections.brands && "rotate-180")} />
        </button>
        {expandedSections.brands && (
          <div className="mt-2 space-y-2">
            {mockBrands.map((brand) => (
              <label key={brand.id} className="flex cursor-pointer items-center gap-3">
                <Checkbox
                  checked={selectedBrands.includes(brand.name)}
                  onCheckedChange={() => toggleBrand(brand.name)}
                />
                <span className="text-sm">{brand.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between py-2 font-semibold"
        >
          Price Range
          <ChevronDown className={cn("h-4 w-4 transition-transform", expandedSections.price && "rotate-180")} />
        </button>
        {expandedSections.price && (
          <div className="mt-4 space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={300000}
              step={5000}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        )}
      </div>

      {/* Storage */}
      <div>
        <button
          onClick={() => toggleSection("storage")}
          className="flex w-full items-center justify-between py-2 font-semibold"
        >
          Storage
          <ChevronDown className={cn("h-4 w-4 transition-transform", expandedSections.storage && "rotate-180")} />
        </button>
        {expandedSections.storage && (
          <div className="mt-2 flex flex-wrap gap-2">
            {storageOptions.map((storage) => (
              <button
                key={storage}
                onClick={() => toggleStorage(storage)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                  selectedStorage.includes(storage)
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground/50",
                )}
              >
                {storage}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RAM */}
      <div>
        <button
          onClick={() => toggleSection("ram")}
          className="flex w-full items-center justify-between py-2 font-semibold"
        >
          RAM
          <ChevronDown className={cn("h-4 w-4 transition-transform", expandedSections.ram && "rotate-180")} />
        </button>
        {expandedSections.ram && (
          <div className="mt-2 flex flex-wrap gap-2">
            {ramOptions.map((ram) => (
              <button
                key={ram}
                onClick={() => toggleRam(ram)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                  selectedRam.includes(ram)
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground/50",
                )}
              >
                {ram}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-semibold">Filters</h2>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="rounded-full bg-foreground px-2 py-0.5 text-xs text-background">
                  {selectedBrands.length + selectedStorage.length + selectedRam.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
