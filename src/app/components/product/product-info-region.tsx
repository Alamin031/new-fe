"use client"

import {useState, useMemo} from "react"
import {useRouter} from "next/navigation"
import {Heart, BarChart3, ShoppingCart, Share2, Shield, Truck, RotateCcw, Check, AlertCircle, ChevronDown} from "lucide-react"
import {Button} from "../ui/button"
import {Badge} from "../ui/badge"
import {Separator} from "../ui/separator"
import {useCartStore} from "@/app/store/cart-store"
import {useWishlistStore} from "@/app/store/wishlist-store"
import {useCompareStore} from "@/app/store/compare-store"
import {formatPrice} from "@/app/lib/utils/format"
import {cn} from "@/app/lib/utils"
import {CarePlusAddon} from "./care-plus-addon"
import {NotifyProductDialog} from "./notify-product-dialog"
import type {Product} from "@/app/types"
import Image from "next/image"

interface ProductInfoRegionProps {
  product: Product & {rawProduct?: any; productType?: string}
}

export function ProductInfoRegion({product}: ProductInfoRegionProps) {
  const router = useRouter()
  const rawProduct = product.rawProduct
  const productType = product.productType || 'basic'

  const [quantity, setQuantity] = useState(1)
  const [carePlusSelected, setCarePlusSelected] = useState(false)
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false)

  // Region-based state
  const [selectedRegionId, setSelectedRegionId] = useState<string>('')
  const [selectedColorId, setSelectedColorId] = useState<string>('')
  const [selectedStorageId, setSelectedStorageId] = useState<string>('')
  const [showRegionDropdown, setShowRegionDropdown] = useState(false)

  const addToCart = useCartStore((state) => state.addItem)
  const {addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist} = useWishlistStore()
  const {addItem: addToCompare, isInCompare} = useCompareStore()

  const inWishlist = isInWishlist(product.id)
  const inCompare = isInCompare(product.id)

  // Region-based logic
  const regions = rawProduct?.regions || []
  const selectedRegion = selectedRegionId
    ? regions.find((r: any) => r.id === selectedRegionId)
    : regions[0]

  const colors = selectedRegion?.colors || []
  const selectedColor = selectedColorId
    ? colors.find((c: any) => c.id === selectedColorId)
    : colors[0]

  const storages = selectedRegion?.defaultStorages || []
  const selectedStorage = selectedStorageId
    ? storages.find((s: any) => s.id === selectedStorageId)
    : storages[0]

  // Price and stock calculation
  const priceData = useMemo(() => {
    if (!selectedStorage?.price) {
      return {
        regularPrice: 0,
        discountPrice: 0,
        hasDiscount: false,
        discount: 0,
        stock: 0,
        inStock: false,
      }
    }

    const price = selectedStorage.price
    const regular = Number(price.regular || price.regularPrice) || 0
    const discount = Number(price.discount || price.discountPrice || price.final) || 0
    const stock = Number(selectedStorage.stock) || 0

    const hasDiscount = regular > 0 && discount > 0 && discount < regular
    const discountPercent = hasDiscount ? Math.round(((regular - discount) / regular) * 100) : 0

    return {
      regularPrice: regular,
      discountPrice: discount,
      hasDiscount,
      discount: discountPercent,
      stock,
      inStock: stock > 0,
    }
  }, [selectedStorage])

  const carePlusPrice = carePlusSelected ? Math.round(priceData.discountPrice * 0.08) : 0
  const totalPrice = priceData.discountPrice + carePlusPrice
  const isOutOfStock = !priceData.inStock

  // Initialize selections
  if (!selectedRegionId && regions.length > 0) {
    setSelectedRegionId(regions[0].id)
  }

  if (!selectedColorId && colors.length > 0) {
    setSelectedColorId(colors[0].id)
  }

  if (!selectedStorageId && storages.length > 0) {
    setSelectedStorageId(storages[0].id)
  }

  const handleAddToCart = () => {
    if (!isOutOfStock && selectedRegion && selectedColor && selectedStorage) {
      const cartItem = {
        ...product,
        selectedVariants: {
          region: selectedRegion.name,
          color: selectedColor.name,
          storage: selectedStorage.size,
        },
      }
      addToCart(product, quantity, {
        region: selectedRegion.id,
        regionName: selectedRegion.name,
        color: selectedColor.id,
        colorName: selectedColor.name,
        storage: selectedStorage.id,
        storageName: selectedStorage.size,
      })
    }
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCompareAndNavigate = () => {
    addToCompare(product)
    router.push("/compare")
  }

  return (
    <div className="flex flex-col">
      {/* Add to Compare Button */}
      <div className="mb-4 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground"
          onClick={handleAddToCompareAndNavigate}
        >
          <BarChart3 className="h-4 w-4" />
          Compare
        </Button>
      </div>

      {/* Brand & Title */}
      {product.brand && (
        <a
          href={`/brand/${product.brand.slug}`}
          className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          {product.brand.name}
        </a>
      )}

      <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{product.name}</h1>

      {/* Rating & SKU */}
      <div className="mt-3 flex flex-wrap items-center gap-4">
        {product.rating > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({length: 5}).map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating)
                      ? "fill-[oklch(0.75_0.15_85)] text-[oklch(0.75_0.15_85)]"
                      : "fill-muted text-muted",
                  )}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>
        )}
      </div>

      <Separator className="my-6" />

      {/* Price Section */}
      <div className="space-y-3 mb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold">{formatPrice(totalPrice)}</span>
          {priceData.hasDiscount && (
            <>
              <span className="text-lg text-muted-foreground line-through">{formatPrice(priceData.regularPrice)}</span>
              <Badge className="bg-[oklch(0.55_0.2_25)] text-[oklch(1_0_0)] hover:bg-[oklch(0.55_0.2_25)]">
                Save {priceData.discount}%
              </Badge>
            </>
          )}
        </div>

        {/* Stock Status */}
        <div>
          {isOutOfStock ? (
            <Badge variant="secondary" className="bg-muted-foreground/10 text-muted-foreground">
              Out of Stock
            </Badge>
          ) : priceData.stock <= 10 ? (
            <Badge className="bg-[oklch(0.55_0.2_25)]/10 text-[oklch(0.55_0.2_25)] hover:bg-[oklch(0.55_0.2_25)]/10">
              Only {priceData.stock} left in stock
            </Badge>
          ) : (
            <Badge className="bg-[oklch(0.55_0.2_145)]/10 text-[oklch(0.45_0.2_145)] hover:bg-[oklch(0.55_0.2_145)]/10">
              <Check className="mr-1 h-3 w-3" /> In Stock
            </Badge>
          )}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Region Selection */}
      {regions.length > 1 && (
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium">Region/Variant</label>
          <div className="relative">
            <button
              onClick={() => setShowRegionDropdown(!showRegionDropdown)}
              className="w-full flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-left font-medium hover:bg-muted/50"
            >
              <span>{selectedRegion?.name || 'Select Region'}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", showRegionDropdown && "rotate-180")} />
            </button>

            {showRegionDropdown && (
              <div className="absolute top-full z-10 mt-2 w-full rounded-lg border border-border bg-card shadow-lg">
                {regions.map((region: any) => (
                  <button
                    key={region.id}
                    onClick={() => {
                      setSelectedRegionId(region.id)
                      setShowRegionDropdown(false)
                      // Reset color and storage selections for new region
                      setSelectedColorId('')
                      setSelectedStorageId('')
                    }}
                    className={cn(
                      "w-full px-4 py-3 text-left hover:bg-muted first:rounded-t-lg last:rounded-b-lg",
                      selectedRegionId === region.id && "bg-foreground/10 font-medium",
                    )}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {colors.length > 0 && (
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium">
            Color: <span className="text-foreground">{selectedColor?.name || 'Select'}</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {colors.map((color: any) => (
              <button
                key={color.id}
                onClick={() => setSelectedColorId(color.id)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border-2 p-2 transition-all",
                  selectedColorId === color.id ? "border-foreground" : "border-border hover:border-foreground/50",
                )}
              >
                {color.image && (
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={color.image}
                      alt={color.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="text-xs font-medium text-center max-w-[70px]">{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Storage Selection */}
      {storages.length > 0 && (
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium">
            Storage: <span className="text-foreground">{selectedStorage?.size || 'Select'}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {storages.map((storage: any) => (
              <button
                key={storage.id}
                onClick={() => setSelectedStorageId(storage.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg border px-4 py-3 text-sm font-medium transition-all",
                  selectedStorageId === storage.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground/50",
                )}
              >
                <span>{storage.size}</span>
                {storage.price && (
                  <span className={cn("text-xs", selectedStorageId === storage.id ? "text-current opacity-80" : "text-muted-foreground")}>
                    +{formatPrice(Number(storage.price.regular || storage.price.regularPrice || 0))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Care+ Add-on */}
      <CarePlusAddon
        basePrice={priceData.discountPrice}
        selected={carePlusSelected}
        onToggle={() => setCarePlusSelected(!carePlusSelected)}
      />

      <Separator className="my-6" />

      {/* Quantity & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Quantity */}
        <div className="flex items-center rounded-lg border border-border">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 text-lg font-medium transition-colors hover:bg-muted disabled:opacity-50"
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="min-w-[3rem] text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(priceData.stock, quantity + 1))}
            className="px-4 py-3 text-lg font-medium transition-colors hover:bg-muted disabled:opacity-50"
            disabled={quantity >= priceData.stock}
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <Button size="lg" className="flex-1 gap-2" disabled={isOutOfStock} onClick={handleAddToCart}>
          <ShoppingCart className="h-5 w-5" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>

        {/* Wishlist & Compare */}
        <Button
          variant="outline"
          size="lg"
          className={cn(inWishlist && "border-[oklch(0.55_0.2_25)] text-[oklch(0.55_0.2_25)]")}
          onClick={handleWishlistToggle}
        >
          <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className={cn(inCompare && "border-foreground bg-foreground text-background")}
          onClick={() => addToCompare(product)}
        >
          <BarChart3 className="h-5 w-5" />
        </Button>
      </div>

      {/* Buy Now */}
      <Button variant="secondary" size="lg" className="mt-4 w-full" disabled={isOutOfStock}>
        Buy Now
      </Button>

      {/* Notify Product Button */}
      <Button
        variant="outline"
        size="lg"
        className="mt-3 w-full gap-2"
        onClick={() => setNotifyDialogOpen(true)}
      >
        <AlertCircle className="h-5 w-5" />
        Notify About Product
      </Button>

      <Separator className="my-6" />

      {/* Highlights */}
      {product.highlights.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 font-semibold">Highlights</h3>
          <ul className="space-y-2">
            {product.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.45_0.2_145)]" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warranty & Delivery Info */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
          <Shield className="h-6 w-6 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Warranty</p>
            <p className="text-xs text-muted-foreground">{product.warranty}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
          <Truck className="h-6 w-6 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Free Delivery</p>
            <p className="text-xs text-muted-foreground">2-5 business days</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
          <RotateCcw className="h-6 w-6 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Easy Returns</p>
            <p className="text-xs text-muted-foreground">7-day return policy</p>
          </div>
        </div>
      </div>

      {/* Share */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-sm font-medium">Share:</span>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Notify Product Dialog */}
      <NotifyProductDialog
        product={product}
        open={notifyDialogOpen}
        onOpenChange={setNotifyDialogOpen}
      />
    </div>
  )
}
