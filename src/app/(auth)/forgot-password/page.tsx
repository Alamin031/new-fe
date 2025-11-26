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
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
        <p className="mt-2 text-muted-foreground">We&apos;ve sent a password reset link to your email address.</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Didn&apos;t receive the email?{" "}
          <button onClick={() => setIsSubmitted(false)} className="font-medium text-primary hover:underline">
            Try again
          </button>
        </p>
        <Link href="/login">
          <Button variant="outline" className="mt-6 gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link
        href="/login"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to login
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Forgot password?</h1>
        <p className="mt-2 text-muted-foreground">No worries, we&apos;ll send you reset instructions.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" placeholder="Enter your email" className="pl-10" required />
          </div>
        </div>

        <Button type="submit" className="w-full gap-2" disabled={isLoading}>
          {isLoading ? "Sending..." : "Reset password"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  )
}
