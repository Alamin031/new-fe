"use client"

import { useState } from "react"
import { AlertCircle, X } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useProductNotifyStore } from "@/store/product-notify-store"
import { useAuthStore } from "@/store/auth-store"
import type { Product } from "@/app/types"

interface NotifyProductDialogProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotifyProductDialog({ product, open, onOpenChange }: NotifyProductDialogProps) {
  const [formData, setFormData] = useState({
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const { addNotification } = useProductNotifyStore()
  const { user } = useAuthStore()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your notification message"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!user) {
      setErrors({ general: "Please log in to notify about products" })
      return
    }

    addNotification({
      productId: product.id,
      productName: product.name,
      userId: user.id || "anonymous",
      userEmail: user.email || "unknown@example.com",
      userName: user.name || "Anonymous User",
      message: formData.message,
    })

    setSubmitted(true)
    setTimeout(() => {
      handleClose()
    }, 2000)
  }

  const handleClose = () => {
    setFormData({ message: "" })
    setErrors({})
    setSubmitted(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Notify About Product
          </DialogTitle>
          <DialogDescription>Let us know about your interest or issue with this product</DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-semibold">Thank You!</h3>
            <p className="text-sm text-muted-foreground">Your notification has been sent to our admin team. We'll review it shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm font-medium text-blue-900">{product.name}</p>
              <p className="text-xs text-blue-700">Product ID: {product.id}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notify-message" className="flex gap-1">
                Your Message
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="notify-message"
                placeholder="e.g., I'm interested in this product when it's back in stock, or Please fix the product description..."
                value={formData.message}
                onChange={(e) => {
                  setFormData({ message: e.target.value })
                  if (errors.message) setErrors({ ...errors, message: "" })
                }}
                rows={4}
                className={errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.message && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>•</span> {errors.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">{formData.message.length}/500</p>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg text-sm">
              <p className="font-medium text-sm mb-1">Notification will include:</p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Your name: <span className="font-medium">{user?.name || "Not logged in"}</span></li>
                <li>• Your email: <span className="font-medium">{user?.email || "Not available"}</span></li>
                <li>• Product details</li>
                <li>• Your message</li>
              </ul>
            </div>

            {errors.general && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {errors.general}
                </p>
              </div>
            )}

            <div className="flex gap-2 justify-end pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                Send Notification
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
