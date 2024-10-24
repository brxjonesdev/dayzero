import { Button } from '@/components/ui/button';
import React from 'react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Goal, Heart, Loader2Icon, Notebook } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <section className="p-4 text-center container space-y-4 max-w-4xl">
        <h2 className="text-3xl font-bold md:text-5xl ">
          Stop Waiting for the Perfect Day — <br />
          Start Creating It.
        </h2>
        <p className="text-md font-geist-sans md:text-lg px-4">
          An online goal tracker and journaling app built for action and reflection. Set goals,
          track progress, log your daily thoughts, monitor your mood, and stay accountable—all in
          one place.
        </p>
        <div className="md:flex  md:space-x-4 space-y-4 md:space-y-0">
          <Button className="font-bold w-full">
            <Link href="/home">Get Started Today</Link>
          </Button>
          <Button className="font-bold w-full">Learn More</Button>
        </div>
        <p>
          <a href="#" className="text-sm hover:underline">
            Learn more about DayZero
          </a>
        </p>
      </section>
      <section className="p-4 container max-w-4xl">{/* Hero Image */}</section>
      <section className="p-4 container max-w-4xl">
        {/* Features */}
        <BentoGrid className=" mx-auto md:auto-rows-[20rem]">
          <BentoGridItem
            header={
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-full rounded-lg flex items-end justify-end p-4 min-h-[150px]">
                <h3 className="text-3xl font-bold tracking-tighter">Goal Tracking</h3>
              </div>
            }
            title="Set and monitor your progress towards your goals."
            description="Easily define your goals and visualize your achievements."
            className="md:col-span-2 border-none "
            icon={<Goal />}
          />
          <BentoGridItem
            header={
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-full rounded-lg flex items-end justify-end p-4 min-h-[150px]">
                <h3 className="text-3xl md:text-2xl font-bold tracking-tighter">Daily Journal</h3>
              </div>
            }
            title="Capture your thoughts and reflections every day."
            description="Document your journey and keep a record of your progress."
            icon={<Notebook />}
            className="md:col-span-1 border-none "
          />
          <BentoGridItem
            header={
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-full rounded-lg flex items-end justify-end p-4 min-h-[150px]">
                <h3 className="text-3xl font-bold tracking-tighter">Mood Monitoring</h3>
              </div>
            }
            title="Track your mood daily to understand your emotions better."
            description="Gain insights into your emotional well-being over time."
            icon={<Heart />}
            className="md:col-span-2 border-none "
          />

          <BentoGridItem
            header={
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-full rounded-lg flex items-end justify-end p-4 min-h-[150px]">
                <h3 className="text-2xl font-bold tracking-tighter md:text-2xl">
                  Progress Reports
                </h3>{' '}
              </div>
            }
            title="Generate reports to visualize your journey."
            description="Understand your progress through detailed analytics."
            icon={<Loader2Icon />}
            className="md:col-span-1 border-none "
          />
        </BentoGrid>
      </section>
      <footer className="p-4 container max-w-4xl bg-gradient-to-r from-violet-600 to-indigo-600 ">
        <p className="text-center text-sm">&copy; 2022 DayZero. All rights reserved.</p>
      </footer>
    </>
  );
}
