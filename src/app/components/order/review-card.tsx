"use client"

import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useReviewStore, type ProductReview } from "../../store/review-store"
import { Edit2, Trash2, ThumbsUp, ThumbsDown, Star } from "lucide-react"
import { formatDate } from "../../lib/utils/format"
import { cn } from "../../lib/utils"

interface ReviewCardProps {
  review: ProductReview
  canEdit?: boolean
  onEdit?: () => void
}

export function ReviewCard({
  review,
  canEdit = false,
  onEdit,
}: ReviewCardProps) {
  const { markHelpful, deleteReview } = useReviewStore()
  const [hasVoted, setHasVoted] = useState(false)

  const handleHelpful = (isHelpful: boolean) => {
    if (!hasVoted) {
      markHelpful(review.id, isHelpful)
      setHasVoted(true)
    }
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteReview(review.id)
    }
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground",
                  )}
                />
              ))}
            </div>
            <Badge variant="secondary">{review.rating}.0</Badge>
          </div>
          <h3 className="font-semibold">{review.title}</h3>
          <p className="text-xs text-muted-foreground">
            By {review.userName} • {formatDate(review.createdAt)}
          </p>
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onEdit}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <p className="mb-4 text-sm text-muted-foreground">{review.content}</p>

      {/* Images */}
      {review.images.length > 0 && (
        <div className="mb-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {review.images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-muted"
            >
              <img
                src={image}
                alt={`Review image ${index + 1}`}
                className="h-20 w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <p className="text-xs text-muted-foreground">
          Was this helpful?
        </p>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => handleHelpful(true)}
            disabled={hasVoted}
          >
            <ThumbsUp className="h-4 w-4" />
            Yes ({review.helpful})
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => handleHelpful(false)}
            disabled={hasVoted}
          >
            <ThumbsDown className="h-4 w-4" />
            No ({review.unhelpful})
          </Button>
        </div>
      </div>
    </Card>
  )
}
