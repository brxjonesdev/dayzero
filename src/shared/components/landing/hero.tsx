

export default function LandingHero() {
  return (
    <section className="relative py-10 md:py-12">
 
      <div className="absolute inset-0  -z-10 rounded-xl font-heading bg-primary" />

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-4">
         

          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground dark:text-white font-heading">
            A Quiet Space for Your Thoughts
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto font-body">
            Tenuto is a minimal, personal journal designed for mindful reflection and intentional living. Capture daily
            moments, explore emotions, and track your growth in one simple, distraction-free space.
          </p>


        </div>
      </div>
    </section>
  )
}
