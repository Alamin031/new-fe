"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  excerpt?: string;
  slug: string;
}

export default function ShareButton({ title, excerpt, slug }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt || title,
        url: `/blog/${slug}`,
      });
    }
  };

  return (
    <button
      onClick={handleShare}
      className="ml-auto text-primary hover:underline"
      type="button"
    >
      <Share2 className="h-4 w-4" />
    </button>
  );
}
