"use client"

import { useEffect, useState } from "react"
import { getCommunityStats } from "@/lib/db"

export default function CommunityStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getCommunityStats()
        setStats(data)
      } catch (error) {
        console.error("Error fetching community stats:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return <div>Loading community stats...</div>
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-500">Members</p>
        <p className="text-xl font-bold">{stats.totalMembers}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Posts</p>
        <p className="text-xl font-bold">{stats.totalPosts}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Online Now</p>
        <p className="text-xl font-bold">{stats.onlineUsers}</p>
      </div>
    </div>
  )
}
