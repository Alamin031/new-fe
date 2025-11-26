import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ProductReview {
  id: string
  productId: string
  orderId: string
  userId: string
  userName: string
  rating: number
  title: string
  content: string
  images: string[]
  helpful: number
  unhelpful: number
  createdAt: string
  updatedAt: string
}

interface ReviewStore {
  reviews: ProductReview[]
  addReview: (review: Omit<ProductReview, "id" | "createdAt" | "updatedAt">) => void
  updateReview: (reviewId: string, updates: Partial<ProductReview>) => void
  deleteReview: (reviewId: string) => void
  getProductReviews: (productId: string) => ProductReview[]
  getOrderReviews: (orderId: string) => ProductReview[]
  markHelpful: (reviewId: string, isHelpful: boolean) => void
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set, get) => ({
      reviews: [
        {
          id: "review-1",
          productId: "1",
          orderId: "ORD-2024-001",
          userId: "user-1",
          userName: "John Doe",
          rating: 5,
          title: "Amazing product, highly recommend!",
          content:
            "The iPhone 15 Pro Max is absolutely fantastic. Build quality is excellent, camera system is outstanding. Delivery was quick and product was well-packed.",
          images: [],
          helpful: 24,
          unhelpful: 2,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "review-2",
          productId: "2",
          orderId: "ORD-2024-001",
          userId: "user-1",
          userName: "John Doe",
          rating: 4,
          title: "Great phone, excellent value",
          content:
            "Samsung Galaxy S24 Ultra is a solid phone. Fast processor, great display. Only minor issue is that charger not included.",
          images: [],
          helpful: 12,
          unhelpful: 1,
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],

      addReview: (review) => {
        const newReview: ProductReview = {
          ...review,
          id: `review-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          reviews: [newReview, ...state.reviews],
        }))
      },

      updateReview: (reviewId, updates) => {
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === reviewId
              ? {
                  ...r,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : r,
          ),
        }))
      },

      deleteReview: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.filter((r) => r.id !== reviewId),
        }))
      },

      getProductReviews: (productId) => {
        return get().reviews.filter((r) => r.productId === productId)
      },

      getOrderReviews: (orderId) => {
        return get().reviews.filter((r) => r.orderId === orderId)
      },

      markHelpful: (reviewId, isHelpful) => {
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === reviewId
              ? {
                  ...r,
                  helpful: isHelpful ? r.helpful + 1 : r.helpful,
                  unhelpful: !isHelpful ? r.unhelpful + 1 : r.unhelpful,
                }
              : r,
          ),
        }))
      },
    }),
    {
      name: "review-storage",
    },
  ),
)
