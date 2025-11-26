"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SearchHistoryStore {
  searches: string[]
  addSearch: (query: string) => void
  removeSearch: (query: string) => void
  clearHistory: () => void
}

export const useSearchHistory = create<SearchHistoryStore>()(
  persist(
    (set) => ({
      searches: [],
      addSearch: (query) => {
        set((state) => {
          const filtered = state.searches.filter((s) => s !== query)
          return { searches: [query, ...filtered].slice(0, 10) }
        })
      },
      removeSearch: (query) => {
        set((state) => ({
          searches: state.searches.filter((s) => s !== query),
        }))
      },
      clearHistory: () => set({ searches: [] }),
    }),
    {
      name: "search-history",
    },
  ),
)
