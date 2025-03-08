"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getUser, updateUserProfile } from "@/lib/db"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function Settings() {
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    location: "",
    website: "",
    twitter: "",
    github: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth")
      return
    }
    loadUserData()
  }, [user, router])

  const loadUserData = async () => {
    try {
      const data: { id: string; name?: string; bio?: string; location?: string; website?: string; twitter?: string; github?: string } = await getUser(user!.uid)
      if (!data) {
        throw new Error("User data not found")
      }
      setUserData({
        name: data.name || "",
        bio: data.bio || "",
        location: data.location || "",
        website: data.website || "",
        twitter: data.twitter || "",
        github: data.github || "",
      })
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    try {
      await updateUserProfile(user.uid, userData)
      toast({
        title: "Success",
        description: "Your profile has been updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
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
        {user && (
          <Link href={`/profile/${user.uid}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Profile</span>
          </Link>
        )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={userData.bio}
                  onChange={(e: { target: { value: any } }) => setUserData({ ...userData, bio: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={userData.location}
                  onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                  placeholder="e.g. New York, USA"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={userData.website}
                  onChange={(e) => setUserData({ ...userData, website: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter Username</Label>
                <Input
                  id="twitter"
                  value={userData.twitter}
                  onChange={(e) => setUserData({ ...userData, twitter: e.target.value })}
                  placeholder="@username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github">GitHub Username</Label>
                <Input
                  id="github"
                  value={userData.github}
                  onChange={(e) => setUserData({ ...userData, github: e.target.value })}
                  placeholder="username"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

