"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { useReviewStore } from "../../store/review-store"
import { Star, X } from "lucide-react"
import { cn } from "../../lib/utils"

interface WriteReviewModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
  orderId: string
  productName: string
  userId: string
  userName: string
}

export function WriteReviewModal({
  isOpen,
  onClose,
  productId,
  orderId,
  productName,
  userId,
  userName,
}: WriteReviewModalProps) {
  const { addReview } = useReviewStore()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            setImages([...images, event.target.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (rating === 0 || !title || !content) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      addReview({
        productId,
        orderId,
        userId,
        userName,
        rating,
        title,
        content,
        images,
        helpful: 0,
        unhelpful: 0,
      })

      setRating(0)
      setTitle("")
      setContent("")
      setImages([])
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Write a Review for {productName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="mb-3 block">Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-all"
                >
                  <Star
                    className={cn(
                      "h-8 w-8 transition-colors",
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground",
                    )}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="mt-2 text-sm text-muted-foreground">
                {rating} out of 5 stars
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="reviewTitle">Review Title *</Label>
            <Input
              id="reviewTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your review a title"
              className="mt-2"
              maxLength={100}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {title.length}/100
            </p>
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="reviewContent">Review *</Label>
            <Textarea
              id="reviewContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your detailed experience with this product..."
              className="mt-2 min-h-32"
              maxLength={1000}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {content.length}/1000
            </p>
          </div>

          {/* Images */}
          <div>
            <Label>Add Photos (Optional)</Label>
            <div className="mt-2">
              <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border p-6 hover:border-foreground/50">
                <div className="text-center">
                  <p className="text-sm font-medium">Click to upload images</p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 5MB
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleAddImage}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg bg-muted"
                  >
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-background"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0 || !title || !content}
              className="flex-1"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
