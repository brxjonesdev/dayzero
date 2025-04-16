import LoginButton from "./login-button"

export default function LandingHero() {
  return (
    <section className="bg-gradient-to-t from-cyan-200 to-cyan-500 dark:from-fuchsia-600 dark:to-pink-600 text-white rounded-3xl">
      <div className="container mx-auto px-4 py-4 md:py-16 flex flex-col items-center text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 font-heading max-w-3xl">A Quiet Space for Your Thoughts</h1>
        <p className="text-sm md:text-base mb-6 max-w-2xl font-body">
          Tenuto is a minimal, personal journal designed for mindful reflection and intentional living. Capture daily
          moments, explore emotions, and track your growth—all in one simple, distraction-free space.
        </p>
        <div className="flex gap-4 w-full max-w-sm">
          <LoginButton />
        </div>
      </div>
    </section>
  )
}
