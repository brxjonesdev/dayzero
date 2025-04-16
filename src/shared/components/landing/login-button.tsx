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
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `https://dayzero-ttsl.netlify.app/auth/callback`,
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
