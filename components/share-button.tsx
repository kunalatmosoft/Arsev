"use client"

import { useState } from "react"
import { Share2 } from "lucide-react"
import { shareContent } from "@/lib/share"
import { useToast } from "@/hooks/use-toast"

export default function ShareButton({ post }: { post: any }) {
  const [sharing, setSharing] = useState(false)
  const { toast } = useToast()

  const handleShare = async () => {
    setSharing(true)
    try {
      const result = await shareContent(post.title, post.content.substring(0, 100) + "...", window.location.href)

      if (result === "copied") {
        toast({
          title: "Link Copied",
          description: "The post link has been copied to your clipboard.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSharing(false)
    }
  }

  return (
    <button
      onClick={handleShare}
      disabled={sharing}
      className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
    >
      <Share2 className="w-5 h-5" />
      <span>{sharing ? "Sharing..." : "Share"}</span>
    </button>
  )
}

