import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface LoyaltyTier {
  id: string
  name: string
  minPoints: number
  maxPoints: number
  multiplier: number
  benefits: string[]
  color: string
}

export interface LoyaltyConfig {
  pointsPerBDT: number
  redeemPointsPerBDT: number
  tiers: LoyaltyTier[]
  birthMonthBonus: number
  referralPoints: number
  reviewPoints: number
}

export interface UserLoyaltyPoints {
  userId: string
  totalPoints: number
  currentTier: string
  pointsThisMonth: number
  lastUpdated: string
}

interface LoyaltyPointsStore {
  config: LoyaltyConfig
  users: Record<string, UserLoyaltyPoints>
  updateConfig: (config: Partial<LoyaltyConfig>) => void
  updateUserPoints: (userId: string, points: number) => void
  getUserPoints: (userId: string) => UserLoyaltyPoints | undefined
  addTier: (tier: LoyaltyTier) => void
  removeTier: (tierId: string) => void
  updateTier: (tierId: string, updates: Partial<LoyaltyTier>) => void
}

const defaultTiers: LoyaltyTier[] = [
  {
    id: "bronze",
    name: "Bronze",
    minPoints: 0,
    maxPoints: 4999,
    multiplier: 1,
    benefits: ["1x points on purchases", "Birthday bonus"],
    color: "bg-orange-600",
  },
  {
    id: "silver",
    name: "Silver",
    minPoints: 5000,
    maxPoints: 14999,
    multiplier: 1.5,
    benefits: ["1.5x points on purchases", "Birthday bonus", "Free shipping"],
    color: "bg-gray-400",
  },
  {
    id: "gold",
    name: "Gold",
    minPoints: 15000,
    maxPoints: 999999,
    multiplier: 2,
    benefits: ["2x points on purchases", "Birthday bonus", "Free shipping", "Priority support"],
    color: "bg-yellow-500",
  },
]

const defaultConfig: LoyaltyConfig = {
  pointsPerBDT: 1,
  redeemPointsPerBDT: 100,
  tiers: defaultTiers,
  birthMonthBonus: 500,
  referralPoints: 1000,
  reviewPoints: 50,
}

export const useLoyaltyPointsStore = create<LoyaltyPointsStore>()(
  persist(
    (set, get) => ({
      config: defaultConfig,
      users: {
        "user-1": {
          userId: "user-1",
          totalPoints: 3500,
          currentTier: "bronze",
          pointsThisMonth: 500,
          lastUpdated: new Date().toISOString(),
        },
        "user-2": {
          userId: "user-2",
          totalPoints: 7200,
          currentTier: "silver",
          pointsThisMonth: 1200,
          lastUpdated: new Date().toISOString(),
        },
      },

      updateConfig: (updates) => {
        set((state) => ({
          config: { ...state.config, ...updates },
        }))
      },

      updateUserPoints: (userId, points) => {
        set((state) => {
          const user = state.users[userId] || {
            userId,
            totalPoints: 0,
            currentTier: "bronze",
            pointsThisMonth: 0,
            lastUpdated: new Date().toISOString(),
          }

          const newTotal = user.totalPoints + points
          const tiers = state.config.tiers.sort((a, b) => b.minPoints - a.minPoints)
          const currentTier = tiers.find((t) => newTotal >= t.minPoints) || tiers[tiers.length - 1]

          return {
            users: {
              ...state.users,
              [userId]: {
                ...user,
                totalPoints: newTotal,
                currentTier: currentTier.id,
                pointsThisMonth: user.pointsThisMonth + points,
                lastUpdated: new Date().toISOString(),
              },
            },
          }
        })
      },

      getUserPoints: (userId) => {
        return get().users[userId]
      },

      addTier: (tier) => {
        set((state) => ({
          config: {
            ...state.config,
            tiers: [...state.config.tiers, tier],
          },
        }))
      },

      removeTier: (tierId) => {
        set((state) => ({
          config: {
            ...state.config,
            tiers: state.config.tiers.filter((t) => t.id !== tierId),
          },
        }))
      },

      updateTier: (tierId, updates) => {
        set((state) => ({
          config: {
            ...state.config,
            tiers: state.config.tiers.map((t) => (t.id === tierId ? { ...t, ...updates } : t)),
          },
        }))
      },
    }),
    {
      name: "loyalty-points-storage",
    },
  ),
)
