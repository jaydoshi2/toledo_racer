"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthPage() {
  const [flipped, setFlipped] = useState(false)
  const router = useRouter()

  // Login State (GET request)
  const [loginUsername, setLoginUsername] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)

  // Signup State (POST request)
  const [signupUsername, setSignupUsername] = useState("")
  const [signupError, setSignupError] = useState("")
  const [signupLoading, setSignupLoading] = useState(false)

  // Login handler (GET)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    if (!loginUsername.trim()) {
      setLoginError("Username is required.")
      return
    }
    setLoginLoading(true)
    try {
      const res = await fetch(`http://172.31.48.159:5000/users/${encodeURIComponent(loginUsername)}`)
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setLoginError(data.detail || "User not found. Please sign up.")
        return
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("username", loginUsername)
      }
      router.push("/create_model/step1")
    } catch (err) {
      setLoginError("Network error. Please try again.")
    } finally {
      setLoginLoading(false)
    }
  }

  // Signup handler (POST)
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError("")
    if (!signupUsername.trim()) {
      setSignupError("Username is required.")
      return
    }
    setSignupLoading(true)
    try {
      const res = await fetch("http://100.66.139.58:5000/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: signupUsername }),
      })      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        if (data.detail?.includes("already exists")) {
          setSignupError("Username already exists.")
        } else {
          setSignupError(data.detail || "Failed to create user.")
        }
        return
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("username", signupUsername)
      }
      router.push("/create_model/step1")
    } catch (err) {
      setSignupError("Network error. Please try again.")
    } finally {
      setSignupLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
      <div className="perspective-1000 w-full max-w-md">
        <div
          className={`relative w-full h-[340px] transition-transform duration-700`}
          style={{
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front: Login */}
          <div
            className="absolute w-full h-full backface-hidden"
            style={{
              zIndex: flipped ? 1 : 2,
              transform: "rotateY(0deg)",
            }}
          >
            <Card className="w-full h-full flex flex-col justify-center">
              <CardHeader>
                <CardTitle>Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    disabled={loginLoading}
                    autoFocus
                  />
                  {loginError && <div className="text-red-500 text-sm">{loginError}</div>}
                  <Button
                    type="submit"
                    className="bg-[#ffd200] hover:bg-[#ec8c04] text-black"
                    disabled={loginLoading}
                  >
                    {loginLoading ? "Logging in..." : "Enter"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFlipped(true)
                      setLoginError("")
                    }}
                  >
                    Sign Up
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Back: Sign Up */}
          <div
            className="absolute w-full h-full backface-hidden"
            style={{
              transform: "rotateY(180deg)",
              zIndex: flipped ? 2 : 1,
            }}
          >
            <Card className="w-full h-full flex flex-col justify-center">
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    disabled={signupLoading}
                    autoFocus={flipped}
                  />
                  {signupError && <div className="text-red-500 text-sm">{signupError}</div>}
                  <Button
                    type="submit"
                    className="bg-[#ffd200] hover:bg-[#ec8c04] text-black"
                    disabled={signupLoading}
                  >
                    {signupLoading ? "Signing up..." : "Enter"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFlipped(false)
                      setSignupError("")
                    }}
                  >
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  )
}
