import React from 'react';
import { ModeToggle } from '../shadcn/ui/mode-toggle';

export default async function LandingHeader() {
  
  return (
    <header className="py-4 flex flex-col ">
      <div className='justify-between flex w-full'>
      <h1 className="text-3xl font-bold font-unbounded dark:text-white">
        DayZero
      </h1>
      <div className="flex gap-4 items-center">
        <ModeToggle />
      </div>
      </div>
    </header>
  );
}
