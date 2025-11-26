"use client"

import { OrderTracking } from "../../store/order-tracking-store"
import { Badge } from "../ui/badge"
import { Card } from "../ui/card"
import { CheckCircle2, Circle, MapPin, Clock } from "lucide-react"
import { formatDate } from "../../lib/utils/format"
import { cn } from "../../lib/utils"

interface OrderTrackingTimelineProps {
  tracking: OrderTracking
}

const statusLabels: Record<string, string> = {
  pending: "Order Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
}

const statusColors: Record<string, string> = {
  pending: "bg-blue-500",
  processing: "bg-yellow-500",
  shipped: "bg-purple-500",
  out_for_delivery: "bg-orange-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
  returned: "bg-gray-500",
}

export function OrderTrackingTimeline({ tracking }: OrderTrackingTimelineProps) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Order Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Tracking #: {tracking.trackingNumber}
            </p>
          </div>
          <Badge>{statusLabels[tracking.currentStatus] || tracking.currentStatus}</Badge>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            Est. Delivery: {formatDate(tracking.estimatedDelivery)}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {tracking.statusHistory.map((status, index) => {
          const isCompleted = tracking.statusHistory.findIndex((s) => s.status === tracking.currentStatus) >= index
          const isCurrent = status.status === tracking.currentStatus

          return (
            <div key={index} className="flex gap-4">
              {/* Timeline dot */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2",
                    isCompleted
                      ? `${statusColors[status.status]} border-current text-white`
                      : "border-muted bg-muted",
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>
                {index < tracking.statusHistory.length - 1 && (
                  <div
                    className={cn(
                      "my-2 h-12 w-0.5",
                      isCompleted ? "bg-foreground" : "bg-muted",
                    )}
                  />
                )}
              </div>

              {/* Status content */}
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">
                      {statusLabels[status.status] || status.status}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {status.message}
                    </p>
                    {status.location && (
                      <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {status.location}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {formatDate(status.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Carrier Info */}
      <div className="mt-6 border-t border-border pt-4">
        <p className="text-sm font-medium">Carrier: {tracking.carrier}</p>
        <p className="text-xs text-muted-foreground">
          You can track your package using this number on the carrier&apos;s website.
        </p>
      </div>
    </Card>
  )
}
