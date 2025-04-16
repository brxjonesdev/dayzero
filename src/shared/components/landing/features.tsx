/* eslint-disable @next/next/no-img-element */
import { Check } from "lucide-react"
import { Badge } from "../shadcn/ui/badge"
import showcase from "@/public/DayZero.png"

export default function LandingFeatures() {
  return (
    <section className="py-4">
      <div className="grid rounded-3xl grid-cols-1 gap-8 items-center lg:grid-cols-2 font-body">
        <img
          src={showcase.src || "/placeholder.svg"}
          className="bg-muted rounded-md aspect-video block lg:hidden"
          alt="Tenuto Journal App"
        />
        <div className="flex gap-8 flex-col">
          <div className="flex gap-3 flex-col">
            <div>
              <Badge variant="outline" className="font-body bg-cyan-500 dark:bg-purple-300 text-white dark:text-black">
                We&lsquo;re Live!
              </Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-2xl lg:text-3xl tracking-tight max-w-lg text-left font-heading">
                Your Mindful Journey Begins
              </h2>
              <p className="text-base leading-relaxed tracking-normal text-muted-foreground max-w-lg text-left">
                Tenuto is your quiet space for thoughtful reflection, personal growth, and intentional living.
              </p>
            </div>
          </div>
          <div className="grid lg:pl-4 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-5">
            <div className="flex flex-row gap-4 items-start">
              <Check className="w-4 h-4 mt-1 text-primary" />
              <div className="flex flex-col gap-1">
                <p className="text-cyan-500 dark:text-purple-300 font-medium">Distraction-Free Writing</p>
                <p className="text-muted-foreground text-sm">Capture your thoughts in a clean, minimal interface.</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-start">
              <Check className="w-4 h-4 mt-1 text-primary" />
              <div className="flex flex-col gap-1">
                <p className="text-cyan-500 dark:text-purple-300 font-medium">Mindful Reflection</p>
                <p className="text-muted-foreground text-sm">Track emotions and personal growth over time.</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-start">
              <Check className="w-4 h-4 mt-1 text-primary" />
              <div className="flex flex-col gap-1">
              <p className="text-cyan-500 dark:text-purple-300 font-medium">Daily Repeition</p>
              <p className="text-muted-foreground text-sm">Build consistency with small, mindful actions every day.</p>
              </div>
            </div>
          </div>
        </div>
        <img
          src={showcase.src || "/placeholder.svg"}
          className="bg-muted rounded-md aspect-video hidden lg:block"
          alt="Tenuto Journal App"
        />
      </div>
    </section>
  )
}
