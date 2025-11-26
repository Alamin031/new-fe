import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface OrderTrackingStatus {
  status: "pending" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled" | "returned"
  timestamp: string
  message: string
  location?: string
}

export interface OrderTracking {
  orderId: string
  currentStatus: string
  estimatedDelivery: string
  trackingNumber: string
  carrier: string
  statusHistory: OrderTrackingStatus[]
}

interface OrderTrackingStore {
  orders: Record<string, OrderTracking>
  addOrder: (tracking: OrderTracking) => void
  updateOrderStatus: (orderId: string, status: OrderTrackingStatus) => void
  getOrderTracking: (orderId: string) => OrderTracking | undefined
}

export const useOrderTrackingStore = create<OrderTrackingStore>()(
  persist(
    (set, get) => ({
      orders: {
        "ORD-2024-001": {
          orderId: "ORD-2024-001",
          currentStatus: "delivered",
          estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          trackingNumber: "BD123456789",
          carrier: "Dhaka Courier",
          statusHistory: [
            {
              status: "pending",
              timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
              message: "Order confirmed",
              location: "Dhaka",
            },
            {
              status: "processing",
              timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
              message: "Order is being prepared",
              location: "Dhaka Warehouse",
            },
            {
              status: "shipped",
              timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              message: "Order shipped",
              location: "Dhaka",
            },
            {
              status: "out_for_delivery",
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              message: "Out for delivery",
              location: "Gulshan, Dhaka",
            },
            {
              status: "delivered",
              timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              message: "Order delivered successfully",
              location: "123 Main Street, Gulshan",
            },
          ],
        },
        "ORD-2024-002": {
          orderId: "ORD-2024-002",
          currentStatus: "shipped",
          estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          trackingNumber: "BD987654321",
          carrier: "Pathao Delivery",
          statusHistory: [
            {
              status: "pending",
              timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              message: "Order confirmed",
              location: "Dhaka",
            },
            {
              status: "processing",
              timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
              message: "Order is being prepared",
              location: "Dhaka Warehouse",
            },
            {
              status: "shipped",
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              message: "Order shipped",
              location: "Dhaka",
            },
          ],
        },
        "ORD-2024-003": {
          orderId: "ORD-2024-003",
          currentStatus: "processing",
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          trackingNumber: "BD555666777",
          carrier: "Dhaka Courier",
          statusHistory: [
            {
              status: "pending",
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              message: "Order confirmed",
              location: "Dhaka",
            },
            {
              status: "processing",
              timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              message: "Order is being prepared",
              location: "Dhaka Warehouse",
            },
          ],
        },
      },

      addOrder: (tracking) => {
        set((state) => ({
          orders: {
            ...state.orders,
            [tracking.orderId]: tracking,
          },
        }))
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => {
          const order = state.orders[orderId]
          if (!order) return state

          return {
            orders: {
              ...state.orders,
              [orderId]: {
                ...order,
                currentStatus: status.status,
                statusHistory: [...order.statusHistory, status],
              },
            },
          }
        })
      },

      getOrderTracking: (orderId) => {
        return get().orders[orderId]
      },
    }),
    {
      name: "order-tracking-storage",
    },
  ),
)
