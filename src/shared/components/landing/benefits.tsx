import { Badge } from "../shadcn/ui/badge";


export default function Benefits() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-body">
      <div className="flex gap-3 flex-col items-start">
        <div>
          <Badge className="bg-cyan-500 dark:bg-purple-300">Benefits of Mindful Journaling</Badge>
        </div>
        <div className="flex gap-2 flex-col">
          <h2 className="text-lg md:text-2xl lg:text-3xl tracking-tight lg:max-w-lg font-medium text-left font-heading">
            Cultivate Clarity Through Reflection
          </h2>
          <p className="text-base lg:max-w-sm leading-relaxed tracking-normal text-muted-foreground text-left">
            Mindful journaling with Tenuto helps you develop self-awareness, process emotions, and live more
            intentionally in each moment.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-4">
          <div className="flex gap-0 flex-col justify-between p-5 rounded-md border-2">
            <h2 className="text-xl tracking-tight max-w-xl text-left font-medium flex flex-row gap-4 items-end font-heading">
              Mental Clarity
            </h2>
            <p className="text-sm leading-relaxed tracking-normal text-muted-foreground max-w-xl text-left">
              Regular reflection creates space for clearer thinking and more intentional decisions.
            </p>
          </div>
          <div className="flex gap-0 flex-col justify-between p-5 rounded-md border-2">
            <h2 className="text-xl tracking-tight max-w-xl text-left font-medium flex flex-row gap-4 items-end font-heading">
              Emotional Awareness
            </h2>
            <p className="text-sm leading-relaxed tracking-normal text-muted-foreground max-w-xl text-left">
              Explore and understand your emotions in a private, supportive environment.
            </p>
          </div>
          <div className="flex gap-0 flex-col justify-between p-5 rounded-md border-2">
            <h2 className="text-xl tracking-tight max-w-xl text-left font-medium flex flex-row gap-4 items-end font-heading">
              Gratitude Practice
            </h2>
            <p className="text-sm leading-relaxed tracking-normal text-muted-foreground max-w-xl text-left">
              Develop a habit of noticing and appreciating life&apos;s meaningful moments.
            </p>
          </div>
          <div className="flex gap-0 flex-col justify-between p-5 rounded-md border-2">
            <h2 className="text-xl tracking-tight max-w-xl text-left font-medium flex flex-row gap-4 items-end font-heading">
              Personal Growth
            </h2>
            <p className="text-sm leading-relaxed tracking-normal text-muted-foreground max-w-xl text-left">
              Track your journey and witness your evolution over time through consistent reflection.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
