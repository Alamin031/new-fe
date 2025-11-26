"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"
import { OrderTrackingTimeline } from "../../components/order/order-tracking-timeline"
import { useOrderTrackingStore } from "../../store/order-tracking-store"
import { Search, Package } from "lucide-react"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [trackedOrder, setTrackedOrder] = useState<string | null>(null)
  const { getOrderTracking } = useOrderTrackingStore()

  const handleTrack = () => {
    if (!orderNumber.trim()) {
      alert("Please enter an order number")
      return
    }

    const tracking = getOrderTracking(orderNumber.trim().toUpperCase())
    if (tracking) {
      setTrackedOrder(orderNumber.trim().toUpperCase())
    } else {
      alert("Order not found. Please check your order number and try again.")
      setTrackedOrder(null)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTrack()
    }
  }

  const tracking = trackedOrder ? getOrderTracking(trackedOrder) : null

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Track Your Order</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Enter your order number to get real-time tracking updates
        </p>
      </section>

      {/* Search Form */}
      <section className="mx-auto max-w-2xl">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium">
                Order Number
              </label>
              <div className="mt-2 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="orderNumber"
                    placeholder="e.g., ORD-2024-001"
                    className="pl-10"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <Button onClick={handleTrack} size="lg">
                  Track
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                You can find your order number in your confirmation email or on your account page.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Tracking Results */}
      {tracking ? (
        <section className="mx-auto max-w-2xl">
          <OrderTrackingTimeline tracking={tracking} />
        </section>
      ) : trackedOrder ? (
        <section className="mx-auto max-w-2xl">
          <Card className="p-8 text-center">
            <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Order Not Found</h3>
            <p className="mt-2 text-muted-foreground">
              We couldn't find an order with number "{trackedOrder}". Please check the order number and try again.
            </p>
            <button
              onClick={() => {
                setOrderNumber("")
                setTrackedOrder(null)
              }}
              className="mt-4 text-primary hover:underline"
            >
              Search Again
            </button>
          </Card>
        </section>
      ) : null}

      {/* Example Orders */}
      <section className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-lg font-semibold">Sample Order Numbers to Try</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {["ORD-2024-001", "ORD-2024-002", "ORD-2024-003"].map((sample) => (
            <button
              key={sample}
              onClick={() => {
                setOrderNumber(sample)
                setTimeout(() => {
                  const tracking = getOrderTracking(sample)
                  if (tracking) {
                    setTrackedOrder(sample)
                  }
                }, 100)
              }}
              className="rounded-lg border border-border p-3 text-left hover:bg-muted"
            >
              <p className="font-mono text-sm font-medium">{sample}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Help */}
      <section className="rounded-lg bg-muted p-6 text-center">
        <h3 className="font-semibold">Can't find your order number?</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Check your confirmation email or log in to your account to view your orders and tracking information.
        </p>
      </section>
    </div>
  )
}
