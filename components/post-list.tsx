"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MessageSquare, Heart} from "lucide-react"
import { getPosts, toggleLike } from "@/lib/db"
import { useAuth } from "@/contexts/auth-context"
import { formatDistanceToNow } from "date-fns"
import ShareButton from "@/components/share-button"

export default function PostList() {
  const [posts, setPosts] = useState<
    {
      author: { id: string; name?: string } | null
      id: string
      title: string
      content: string
      tags?: string[]
      likes: number
      liked: boolean
      comments: number
      createdAt: { toDate: () => Date }
    }[]
  >([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const fetchedPosts = await getPosts()
      setPosts(fetchedPosts)
    } catch (error) {
      console.error("Error loading posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (postId: string) => {
    if (!user) return
    await toggleLike(postId, user.uid)
    await loadPosts() // Reload posts to update likes
  }

  if (loading) {
    return <div>Loading posts...</div>
  }

  return (
    <div className="space-y-6">
      {posts.map((post: any) => (
        <div key={post.id} className="border-b pb-6 last:border-0">
          <div className="flex items-center gap-3 mb-3">
            {/* Make avatar and name clickable */}
            <Link href={`/profile/${post.author?.id}`} className="flex items-center gap-2 hover:text-blue-600">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-800">
                  {post.author?.name?.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <p className="font-medium">{post.author?.name}</p>
            </Link>
            <p className="text-sm text-gray-500">
              {post.createdAt && formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true })}
            </p>
          </div>

          <Link href={`/post/${post.id}`}>
            <h3 className="text-xl font-bold mb-2 hover:text-blue-600">{post.title}</h3>
          </Link>

          <p className="text-gray-700 mb-4">{post.content}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLike(post.id)}
              className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
            >
              <Heart className={`w-5 h-5 ${post.liked ? "fill-blue-600 text-blue-600" : ""}`} />
              <span>{post.likes}</span>
            </button>
            <Link href={`/post/${post.id}`} className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
              <MessageSquare className="w-5 h-5" />
              <span>{post.comments}</span>
            </Link>
            <ShareButton post={post} />
          </div>
        </div>
      ))}
    </div>
  )
}
