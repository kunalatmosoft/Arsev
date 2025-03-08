/* "use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Settings,
  LogOut,
  MapPin,
  Globe,
  Twitter,
  Github,
  Edit,
  Trash2,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getUser, getUserPosts, deletePost } from "@/lib/db"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"

export default function Profile() {
  const [userData, setUserData] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!user) {
      router.push("/auth")
      return
    }
    loadUserData()
    loadUserPosts()
  }, [user, router])

  const loadUserData = async () => {
    try {
      const data = await getUser(user!.uid)
      setUserData(data)
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadUserPosts = async () => {
    try {
      const postsData = await getUserPosts(user!.uid)
      setPosts(postsData)
    } catch (error) {
      console.error("Error loading user posts:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/auth")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return
    try {
      await deletePost(postId)
      toast({
        title: "Post Deleted",
        description: "Your post has been deleted.",
      })
      loadUserPosts()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading || !userData) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header 
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Community</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Profile Header 
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-white">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {userData.name?.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-gray-600">
                    Member since {new Date(userData.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href="/settings">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* About Me & Stats 
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* About Me 
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">About Me</h2>
                <p className="text-gray-700">{userData.bio || "No bio yet"}</p>
                {/* Additional Profile Details 
                <div className="mt-4 space-y-2">
                  {userData.location && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span>{userData.location}</span>
                    </div>
                  )}
                  {userData.website && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <a href={userData.website} target="_blank" rel="noopener noreferrer">
                        {userData.website}
                      </a>
                    </div>
                  )}
                  {userData.twitter && (
                    <div className="flex items-center gap-2 text-blue-400">
                      <Twitter className="w-5 h-5 text-blue-400" />
                      <a href={`https://twitter.com/${userData.twitter}`} target="_blank" rel="noopener noreferrer">
                        @{userData.twitter}
                      </a>
                    </div>
                  )}
                  {userData.github && (
                    <div className="flex items-center gap-2 text-gray-800">
                      <Github className="w-5 h-5 text-gray-800" />
                      <a href={`https://github.com/${userData.github}`} target="_blank" rel="noopener noreferrer">
                        {userData.github}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats 
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Stats</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Posts</p>
                    <p className="text-xl font-bold">{userData.posts}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Comments</p>
                    <p className="text-xl font-bold">{userData.comments}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Likes Received</p>
                    <p className="text-xl font-bold">{userData.likesReceived}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* My Posts Section with CRUD Actions 
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">My Posts</h2>
              <Link href="/create">
                <Button>New Post</Button>
              </Link>
            </div>
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-700">
                  No posts yet. Start by creating a new post!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-2">
                      <Link href={`/post/${post.id}`}>
                        <h3 className="text-xl font-bold hover:underline">
                          {post.title}
                        </h3>
                      </Link>
                      <span className="text-sm text-gray-500">
                        {post.createdAt &&
                          formatDistanceToNow(post.createdAt.toDate(), {
                            addSuffix: true,
                          })}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {post.content.length > 100
                        ? post.content.substring(0, 100) + "..."
                        : post.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <Link href={`/edit/${post.id}`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </Button>
                      <Link href={`/post/${post.id}`}>
                        <Button variant="secondary" size="sm" className="flex items-center gap-1">
                          <span>View</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
 */