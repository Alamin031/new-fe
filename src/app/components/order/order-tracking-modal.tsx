/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"

import { OrderTracking } from "../../store/order-tracking-store"
import { CheckCircle2, MapPin, Clock } from "lucide-react"
import { formatDate } from "../../lib/utils/format"
import { cn } from "../../lib/utils"

interface OrderTrackingModalProps {
  tracking: OrderTracking
  productName?: string
  productImage?: string
}


// Fixed status steps for progress bar
const STATUS_STEPS = [
  { key: 'order placed', label: 'Order Placed' },
  { key: 'processing', label: 'Processing' },
  { key: 'preparing to ship', label: 'Preparing to Ship' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
];

// Map timeline/statusHistory to a lookup for completion and date
function getStepCompletion(tracking: any) {
  let timeline = [];
  if (Array.isArray(tracking.timeline) && tracking.timeline.length > 0) {
    timeline = tracking.timeline;
  } else if (Array.isArray(tracking.statusHistory) && tracking.statusHistory.length > 0) {
    timeline = tracking.statusHistory.map((s: any) => ({
      label: s.status ? s.status.charAt(0).toUpperCase() + s.status.slice(1) : "",
      date: s.timestamp,
      completed: true,
    }));
  }
  // Build a lookup: statusKey -> {completed, date}
  const lookup: Record<string, {completed: boolean, date?: string}> = {};
  for (const step of timeline) {
    const key = (step.label || '').toLowerCase();
    if (key) {
      lookup[key] = { completed: !!step.completed, date: step.date };
    }
  }
  return lookup;
}


// Color for each status step
function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case 'order placed':
      return 'bg-orange-500/10 text-orange-600 border-orange-200';
    case 'processing':
      return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
    case 'preparing to ship':
      return 'bg-purple-500/10 text-purple-600 border-purple-200';
    case 'shipped':
      return 'bg-blue-500/10 text-blue-600 border-blue-200';
    case 'delivered':
      return 'bg-green-500/10 text-green-600 border-green-200';
    case 'cancelled':
      return 'bg-red-500/10 text-red-600 border-red-200';
    case 'returned':
      return 'bg-gray-500/10 text-gray-600 border-gray-200';
    default:
      return 'bg-gray-200 text-gray-600 border-gray-200';
  }
}


export function OrderTrackingModal({ tracking, productName, productImage }: OrderTrackingModalProps) {
  const stepCompletion = getStepCompletion(tracking);
  // Find the last completed index for progress bar
  const lastCompletedIndex = STATUS_STEPS.map(s => stepCompletion[s.key]?.completed).lastIndexOf(true);

  // For status message, get the last completed step info
  const lastStep = lastCompletedIndex >= 0 ? STATUS_STEPS[lastCompletedIndex] : null;
  const lastStepDate = lastStep ? stepCompletion[lastStep.key]?.date : null;

  return (
    <div className="w-full space-y-6">
      {/* Product Header */}
      <div className="flex gap-4">
        {productImage && (
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
            <img
              src={productImage}
              alt={productName || "Product"}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <p className="font-semibold text-lg">{productName || "Order Details"}</p>
            <p className="text-sm text-muted-foreground">
              Order #{tracking.trackingNumber}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              Arrives {formatDate(tracking.estimatedDelivery)}
            </span>
          </div>
        </div>
      </div>

      {/* Track Shipment Link */}
      <div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
          Track shipment
          <span>›</span>
        </button>
      </div>

      {/* Custom Progress Bar with Steps */}
      <div className="mt-4">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 z-0" style={{transform: 'translateY(-50%)'}} />
          <div className="absolute left-0 top-1/2 h-1 bg-green-500 z-10" style={{width: `${STATUS_STEPS.length > 1 ? (lastCompletedIndex/(STATUS_STEPS.length-1))*100 : 0}%`, transform: 'translateY(-50%)', transition: 'width 0.3s'}} />
          {/* Steps */}
          {STATUS_STEPS.map((step, index) => {
            const completed = !!stepCompletion[step.key]?.completed;
            const date = stepCompletion[step.key]?.date;
            return (
              <div key={step.key} className="flex flex-col items-center z-20 flex-1">
                <div className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full border-2 mb-1",
                  completed ? "border-green-500 bg-green-500 text-white" : getStatusColor(step.key)
                )}>
                  {completed ? <CheckCircle2 className="h-5 w-5" /> : index+1}
                </div>
                <span className={cn("text-xs mt-1", completed ? "text-green-700 font-semibold" : "")}>{step.label}</span>
                {completed && date && (
                  <span className="text-[10px] text-green-700 mt-0.5">{formatDate(date)}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Message (current step) */}
      {lastStep && (
        <div className="mt-6">
          <p className="font-medium text-base mb-1">{lastStep.label}</p>
          {lastStepDate && (
            <p className="text-xs text-muted-foreground">{formatDate(lastStepDate)}</p>
          )}
        </div>
      )}

      {/* Carrier Information */}
      <div className="rounded-lg bg-muted p-4">
        <p className="text-sm font-medium">Carrier: {tracking.carrier}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Tracking #: {tracking.trackingNumber}
        </p>
      </div>
    </div>
  );
}
