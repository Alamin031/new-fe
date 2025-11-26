import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ProductNotification {
  id: string
  productId: string
  productName: string
  userId: string
  userEmail: string
  userName: string
  message: string
  status: "pending" | "resolved"
  createdAt: string
  updatedAt: string
}

interface ProductNotifyStore {
  notifications: ProductNotification[]
  addNotification: (notification: Omit<ProductNotification, "id" | "status" | "createdAt" | "updatedAt">) => void
  markAsResolved: (id: string) => void
  removeNotification: (id: string) => void
  clearAll: () => void
  getUnresolvedCount: () => number
}

export const useProductNotifyStore = create<ProductNotifyStore>()(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (notification) => {
        const newNotification: ProductNotification = {
          ...notification,
          id: crypto.randomUUID(),
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }))
      },

      markAsResolved: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, status: "resolved", updatedAt: new Date().toISOString() } : n
          ),
        }))
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }))
      },

      clearAll: () => set({ notifications: [] }),

      getUnresolvedCount: () => {
        return get().notifications.filter((n) => n.status === "pending").length
      },
    }),
    {
      name: "product-notify-storage",
    }
  )
)
