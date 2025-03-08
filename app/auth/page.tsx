"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { HopOff } from "lucide-react"

// Modal Component
const TermsModal = ({ isOpen, onClose, onAccept }: { isOpen: boolean; onClose: () => void; onAccept: () => void }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Terms and Conditions</h2>
        <p className="text-sm text-gray-600 mb-4">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-blue-600 underline">
            Terms and Conditions
          </Link>
          .
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onAccept}>I Agree</Button>
        </div>
      </div>
    </div>
  )
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const { signup, login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        await login(email, password)
      } else {
        if (!termsAccepted) {
          toast({
            title: "Error",
            description: "You must accept the Terms and Conditions.",
            variant: "destructive",
          })
          return
        }
        await signup(email, password, name)
      }
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
    <p className="text-3xl p-5 text-blue-700"><Link href="/LandingPage"><HopOff className="text-blue-700"/>Arsev</Link></p>
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Sign Up"}</CardTitle>
          <CardDescription>
            {isLogin ? "Welcome back! Please login to your account." : "Create a new account to join our community."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required={!isLogin} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Terms & Conditions Checkbox */}
            {!isLogin && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="h-4 w-4"
                />
                <Label htmlFor="terms">
                  I agree to the{" "}
                  <button type="button" onClick={() => setIsModalOpen(true)} className="text-blue-600 underline">
                    Terms and Conditions
                  </button>
                </Label>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading || (!isLogin && !termsAccepted)}>
              {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
            </Button>

            {isLogin && (
              <Link href="/forgot-password">
                <Button variant="link" className="w-full">
                  Forgot your password?
                </Button>
              </Link>
            )}
            <Button type="button" variant="link" className="w-full" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Terms Modal */}
      <TermsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={() => {
          setTermsAccepted(true)
          setIsModalOpen(false)
        }}
      />
    </div>
    </>
  )
}
