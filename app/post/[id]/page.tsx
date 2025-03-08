"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, MessageSquare, Trash2 } from "lucide-react"
import { getPost, getComments, createComment, toggleLike, deletePost, deleteComment } from "@/lib/db"
import { useAuth } from "@/contexts/auth-context"
import { formatDistanceToNow } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import ShareButton from "@/components/share-button"

export default function PostDetail() {
  const [post, setPost] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    loadPost()
  }, [])

  const loadPost = async () => {
    try {
      const postData = await getPost(params.id as string)
      setPost(postData)
      const commentsData = await getComments(params.id as string)
      setComments(commentsData)
    } catch (error) {
      console.error("Error loading post:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newComment.trim()) return

    setSubmitting(true)
    try {
      await createComment(post.id, user.uid, newComment.trim())
      setNewComment("")
      await loadPost() // Reload post and comments
      toast({
        title: "Success",
        description: "Your comment has been posted!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleLike = async () => {
    if (!user) return
    await toggleLike(post.id, user.uid)
    await loadPost() // Reload post to update likes
  }

  const handleDeletePost = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return
    try {
      await deletePost(post.id)
      toast({
        title: "Post Deleted",
        description: "Your post has been deleted.",
      })
      router.push("/") // Redirect to community page after deletion
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return
    try {
      await deleteComment(commentId)
      toast({
        title: "Comment Deleted",
        description: "Your comment has been deleted.",
      })
      await loadPost() // Reload post and comments
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Community</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-800">
                  {post.author?.name?.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium">{post.author?.name}</p>
                <p className="text-sm text-gray-500">
                  {post.createdAt && formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true })}
                </p>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

            <div className="prose max-w-none mb-6">
              {post.content.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 border-t pt-4">
              <button onClick={handleLike} className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                <Heart className={`w-5 h-5 ${post.liked ? "fill-blue-600 text-blue-600" : ""}`} />
                <span>{post.likes}</span>
              </button>
              <div className="flex items-center gap-1 text-gray-500">
                <MessageSquare className="w-5 h-5" />
                <span>{comments.length}</span>
              </div>
              <ShareButton post={post} />
              {user && post.author?.id === user.uid && (
                <button onClick={handleDeletePost} className="flex items-center gap-1 text-red-500 hover:text-red-600">
                  <Trash2 className="w-5 h-5" />
                  <span>Delete Post</span>
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>
            <div className="space-y-6">
              {comments.map((comment: any) => (
                <div key={comment.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {comment.author?.name?.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{comment.author?.name}</p>
                      <p className="text-xs text-gray-500">
                        {comment.createdAt &&
                          formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 text-sm">
                      <Heart className="w-4 h-4" />
                      <span>{comment.likes}</span>
                    </button>
                    {user && comment.author?.id === user.uid && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {user && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Add a Comment</h2>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[120px]"
                  placeholder="Share your thoughts..."
                  required
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
