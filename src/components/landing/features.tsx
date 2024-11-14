import { Check } from 'lucide-react';
import { Badge } from '../shadcn/ui/badge';

export default function LandingFeatures() {
  return (
    <section className="py-4">
      <div className="grid rounded-3xl  p-8 grid-cols-1 gap-8 items-center lg:grid-cols-2 font-onest border-cyan-300 dark:border-fuchsia-600 border-2">
        <div className="bg-muted rounded-md aspect-video block lg:hidden"></div>
        <div className="flex gap-10 flex-col">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge
                variant="outline"
                className="font-onest bg-cyan-500 dark:bg-purple-300 text-white dark:text-black"
              >
                We&lsquo;re Live!
              </Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-lg text-left font-unbounded">
                Your Journey Starts Here
              </h2>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-lg text-left">
                DayZero is the perfect companion for tracking your goals, moods,
                and daily reflections.
              </p>
            </div>
          </div>
          <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-6">
            <div className="flex flex-row gap-6 items-start">
              <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p className="text-cyan-500 dark:text-purple-300 font-semibold">
                  Intuitive Tracking
                </p>
                <p className="text-muted-foreground text-sm">
                  Log moods, goals, and reflections effortlessly.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
              <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p className="text-cyan-500 dark:text-purple-300 font-semibold">
                  Personalized Insights
                </p>
                <p className="text-muted-foreground text-sm">
                  Get insights on your progress and well-being over time.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
              <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p className="text-cyan-500 dark:text-purple-300 font-semibold">
                  Modern, Simple Design
                </p>
                <p className="text-muted-foreground text-sm">
                  A beautiful, distraction-free experience.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted rounded-md aspect-video hidden lg:block"></div>
      </div>
    </section>
  );
}
