"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button"
import type { Flashsell } from "@/app/lib/api/services/flashsell"

interface FlashSaleCardProps {
  flashsale: Flashsell
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isEnded: boolean
  isUpcoming: boolean
}

function useCountdown(startTime: string, endTime: string): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEnded: false,
    isUpcoming: false,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const start = new Date(startTime)
      const end = new Date(endTime)

      if (now < start) {
        const difference = start.getTime() - now.getTime()
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isEnded: false,
          isUpcoming: true,
        })
      } else if (now > end) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isEnded: true,
          isUpcoming: false,
        })
      } else {
        const difference = end.getTime() - now.getTime()
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isEnded: false,
          isUpcoming: false,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [startTime, endTime])

  return timeLeft
}

export function FlashSaleCard({ flashsale }: FlashSaleCardProps) {
  const timeLeft = useCountdown(flashsale.startTime, flashsale.endTime)

  const getCountdownLabel = () => {
    if (timeLeft.isUpcoming) {
      return "🎉 Coming Soon"
    }
    if (timeLeft.isEnded) {
      return "🔥 Sale Ended"
    }
    return "⚡ Hurry! Sale Ends In"
  }

  return (
    <Link href={`/flashsell?id=${flashsale.id}`} className="block">
      <div className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-lg cursor-pointer">
        {/* Banner Image */}
        {flashsale.bannerImg && (
        <div className="relative w-full overflow-hidden bg-muted aspect-[16/9] sm:aspect-[1920/800]">
          <Image
            src={flashsale.bannerImg}
            alt={flashsale.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          {/* Countdown overlay - centered */}
          <div className="absolute top-0 left-0 right-0 p-3 sm:p-6 z-10 flex justify-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-black/15 to-black/5 text-white px-3 py-3 sm:px-6 sm:py-5 backdrop-blur-sm shadow-lg border border-white/5">
              <span className="text-sm sm:text-lg font-bold tracking-wide">{getCountdownLabel()}</span>
              {!timeLeft.isEnded && (
                <div className="flex gap-1.5 sm:gap-2.5">
                  {[
                    { value: timeLeft.days, label: "Days" },
                    { value: timeLeft.hours, label: "Hours" },
                    { value: timeLeft.minutes, label: "Mins" },
                    { value: timeLeft.seconds, label: "Secs" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-0.5 sm:gap-1.5">
                      <div className="h-10 w-10 sm:h-14 sm:w-14 bg-gradient-to-br from-white/70 to-white/50 rounded-full flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
                        <span className="text-base sm:text-2xl font-extrabold text-gray-900">
                          {String(item.value).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider opacity-95">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </Link>
  )
}
