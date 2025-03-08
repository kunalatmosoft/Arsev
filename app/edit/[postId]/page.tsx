"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getPost, updatePost, Post } from "@/lib/db"
import { useToast } from "@/hooks/use-toast"

export default function EditPost() {
  const [postData, setPostData] = useState({ title: "", content: "", tags: [] as string[] })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data: Post | null = await getPost(params.postId as string)
        if (!data) {
          toast({
            title: "Post not found",
            description: "The post you are trying to edit does not exist.",
            variant: "destructive",
          })
          router.push("/")
          return
        }
        setPostData({
          title: data.title,
          content: data.content,
          tags: data.tags || [],
        })
      } catch (error) {
        console.error("Error loading post:", error)
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [params, router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updatePost(params.postId as string, {
        title: postData.title,
        content: postData.content,
        tags: postData.tags,
      })
      toast({
        title: "Post Updated",
        description: "Your post has been updated successfully.",
      })
      router.push(`/post/${params.postId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href={`/post/${params.postId}`} className="text-blue-600 hover:underline">
            Back to Post
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Input
                id="title"
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <Textarea
                id="content"
                value={postData.content}
                onChange={(e) => setPostData({ ...postData, content: e.target.value })}
                required
                className="min-h-[200px]"
              />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags (comma separated)
              </label>
              <Input
                id="tags"
                value={postData.tags.join(", ")}
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value.split(",").map((tag) => tag.trim()) })
                }
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
