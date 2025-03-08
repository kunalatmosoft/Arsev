"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import PostList from "@/components/post-list"
import CommunityStats from "@/components/community-stats"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth")
    }
  }, [user, router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Community
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/create">
              <Button>New Post</Button>
            </Link>
            {/* Open the current user's profile using their UID */}
            <Link href={`/profile/${user.uid}`} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {user.email?.substring(0, 2).toUpperCase()}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h1 className="text-2xl font-bold mb-4">Community Discussions</h1>
              <div className="flex gap-4 mb-6">
                <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                  All Posts
                </button>
                <button className="px-4 py-2 hover:bg-gray-100 rounded-full font-medium">
                  Popular
                </button>
                <button className="px-4 py-2 hover:bg-gray-100 rounded-full font-medium">
                  Recent
                </button>
              </div>
              <PostList />
            </div>
          </div>

          <div className="hidden md:block w-1/4">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Community Stats</h2>
              <CommunityStats />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
