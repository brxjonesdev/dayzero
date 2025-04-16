"use client"
import { useEffect, useState } from "react"
import { Button } from "../shadcn/ui/button"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"

export default function LoginButton() {
  const router = useRouter()
  const supabase = createClient()
  const provider = "google"
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = async () => {
    const isDev = process.env.NODE_ENV === "development"
    const redirectTo = isDev
      ? "http://localhost:3000/auth/callback"
      : "https://dayzero-ttsl.netlify.app/auth/callback"
  
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })
  
    if (error) {
      console.error("Error logging in:", error.message)
    }
  }
  
  

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase.auth.getUser()
      setUser(userData?.user ?? null)
      console.log(userData?.user, "user")
    }

    fetchData()
  }, [supabase])

  return (
    <div className="w-full">
      {user ? (
        <Button className="font-body text-sm w-full" onClick={() => router.push("/journal/home")}>
          Go to Journal
        </Button>
      ) : (
        <Button className="font-body text-sm w-full" onClick={handleLogin}>
          Login to Tenuto
        </Button>
      )}
    </div>
  )
}
