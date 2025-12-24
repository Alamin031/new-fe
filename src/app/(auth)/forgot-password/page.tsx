"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Check your email</h1>
        <p className="mt-3 text-muted-foreground">We&apos;ve sent a password reset link to your email address.</p>
        <p className="mt-6 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-950/20 rounded-lg px-4 py-3">
          Didn&apos;t receive the email?{" "}
          <button onClick={() => setIsSubmitted(false)} className="font-semibold text-primary hover:underline">
            Try again
          </button>
        </p>
        <Link href="/login">
          <Button variant="outline" className="mt-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Link
        href="/login"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to login
      </Link>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Forgot password?</h1>
        <p className="mt-3 text-muted-foreground">No worries, we&apos;ll send you reset instructions.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" placeholder="Enter your email address" className="pl-10 h-11" required />
          </div>
        </div>

        <Button type="submit" className="w-full h-11 text-base font-semibold gap-2 shadow-md hover:shadow-lg transition-all duration-200" disabled={isLoading}>
          {isLoading ? "Sending..." : "Reset password"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  )
}
