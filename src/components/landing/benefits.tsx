import React from 'react';
import { Badge } from '../shadcn/ui/badge';

export default function Benefits() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 font-onest">
      <div className="flex gap-4 flex-col items-start">
        <div>
          <Badge className="bg-cyan-500 dark:bg-purple-300">
            Benefits of Journaling
          </Badge>
        </div>
        <div className="flex gap-2 flex-col">
          <h2 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-lg font-regular text-left font-unbounded">
            Transform Your Mindset, One Entry at a Time
          </h2>
          <p className="text-lg lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
            Journaling, setting goals, and tracking your mood are powerful tools
            to boost self-awareness, enhance motivation, and cultivate a
            positive mindset.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-4">
          <div className="flex gap-0 flex-col justify-between p-6  rounded-md  border-2">
            <h2 className="text-3xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
              Increased Clarity
            </h2>
            <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
              Reflecting on your thoughts and emotions leads to better
              decision-making and mental clarity.
            </p>
          </div>
          <div className="flex gap-0 flex-col justify-between p-6  rounded-md  border-2">
            <h2 className="text-3xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
              Goal Achievement
            </h2>
            <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
              Setting and reviewing goals improves focus and motivates you to
              stay on track.
            </p>
          </div>
          <div className="flex gap-0 flex-col justify-between p-6  rounded-md border-2">
            <h2 className="text-3xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
              Mood Awareness
            </h2>
            <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
              Tracking your mood helps identify patterns, boosting emotional
              awareness and well-being.
            </p>
          </div>
          <div className="flex gap-0 flex-col justify-between p-6  rounded-md  border-2">
            <h2 className="text-3xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
              Reduced Stress
            </h2>
            <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
              Journaling regularly can reduce stress and help process emotions
              in a healthy way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
