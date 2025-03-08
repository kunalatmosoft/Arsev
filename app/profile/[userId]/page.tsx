"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Share,
  UserPlus,
  UserCheck,
  MapPin,
  Globe,
  Twitter,
  Github,
  Edit,
  Trash2,
  LogOut,
} from "lucide-react"
import { getUser, getUserPosts, deletePost } from "@/lib/db"
import { followUser, unfollowUser, isFollowing } from "@/lib/db"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"

export default function UserProfile() {
  const [profileData, setProfileData] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [following, setFollowing] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { user, logout } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUser(params.userId as string)
        setProfileData(data)
        if (data) {
          const userPosts = await getUserPosts(params.userId as string)
          setPosts(userPosts)
        }
        // If viewing another user's profile, check follow status
        if (user && user.uid !== params.userId) {
          const followingStatus = await isFollowing(user.uid, params.userId as string)
          setFollowing(followingStatus)
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [params, user])

  const handleFollowToggle = async () => {
    if (!user) return
    try {
      if (following) {
        await unfollowUser(user.uid, params.userId as string)
        setFollowing(false)
        toast({
          title: "Unfollowed",
          description: `You have unfollowed ${profileData.name}`,
        })
      } else {
        await followUser(user.uid, params.userId as string)
        setFollowing(true)
        toast({
          title: "Followed",
          description: `You are now following ${profileData.name}`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update follow status.",
        variant: "destructive",
      })
    }
  }

  const handleShareProfile = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "Profile Link Copied",
        description: "The profile link has been copied to your clipboard.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy profile link.",
        variant: "destructive",
      })
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
      // Refresh posts
      const userPosts = await getUserPosts(params.userId as string)
      setPosts(userPosts)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) return <div>Loading...</div>
  if (!profileData) return <div>Profile not found</div>

  const isOwnProfile = user && user.uid === profileData.id

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Community</span>
          </Link>
          <div className="flex items-center gap-4">
            {isOwnProfile ? (
              <>
                <Link href="/settings">
                  <Button variant="outline" size="sm">Settings</Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleFollowToggle}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  {following ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  <span>{following ? "Following" : "Follow"}</span>
                </Button>
                <Button
                  onClick={handleShareProfile}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-white">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {profileData.name?.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{profileData.name}</h1>
                  <p className="text-gray-600">
                    Member since {new Date(profileData.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Bio, Social, and Stats */}
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <p className="text-gray-700">{profileData.bio || "No bio yet"}</p>
            <div className="mt-4 space-y-2">
              {profileData.location && (
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{profileData.location}</span>
                </div>
              )}
              {profileData.website && (
                <div className="flex items-center gap-2 text-blue-600">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                    {profileData.website}
                  </a>
                </div>
              )}
              {profileData.twitter && (
                <div className="flex items-center gap-2 text-blue-400">
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <a href={`https://twitter.com/${profileData.twitter}`} target="_blank" rel="noopener noreferrer">
                    @{profileData.twitter}
                  </a>
                </div>
              )}
              {profileData.github && (
                <div className="flex items-center gap-2 text-gray-800">
                  <Github className="w-5 h-5 text-gray-800" />
                  <a href={`https://github.com/${profileData.github}`} target="_blank" rel="noopener noreferrer">
                    {profileData.github}
                  </a>
                </div>
              )}
            </div>
            {/* Followers and Following Stats */}
            <div className="flex gap-8 mt-6">
              <div>
                <p className="text-sm text-gray-500">Followers</p>
                <p className="text-xl font-bold">{profileData.followers || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Following</p>
                <p className="text-xl font-bold">{profileData.following || 0}</p>
              </div>
            </div>
          </div>

          {/* User's Posts */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Posts</h2>
              {isOwnProfile && (
                <Link href="/create">
                  <Button>New Post</Button>
                </Link>
              )}
            </div>
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-700">
                  {isOwnProfile
                    ? "No posts yet. Start by creating a new post!"
                    : "No posts yet."}
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
                      {isOwnProfile && (
                        <>
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
                        </>
                      )}
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
