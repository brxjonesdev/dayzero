import { Sparkles } from "lucide-react"

export default function LandingHero() {
  return (
    <section className="relative py-10 md:py-12">
      {/* Simple, subtle background */}
      <div className="absolute inset-0  -z-10 rounded-xl font-heading bg-primary" />

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Simple badge */}
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-cyan-50 dark:bg-gray-800 text-cyan-600 dark:text-cyan-300 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-2" />
            <span>Start a mindful journaling habit!</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground dark:text-white mb-6 font-heading">
            A Quiet Space for Your Thoughts
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto font-body">
            Tenuto is a minimal, personal journal designed for mindful reflection and intentional living. Capture daily
            moments, explore emotions, and track your growth in one simple, distraction-free space.
          </p>


        </div>
      </div>
    </section>
  )
}
