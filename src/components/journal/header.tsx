import React from 'react';
import { ModeToggle } from '../shadcn/ui/mode-toggle';
import Settings from './utils/settings';

export default async function JournalHeader() {
  return (
    <header className="py-4 flex justify-between">
      <div className="flex gap-8 items-center">
        <h1 className="text-3xl font-bold font-unbounded dark:text-white">
          DayZero
        </h1>
      </div>

      <div className="flex gap-4 items-center">
        <Settings/>
        <ModeToggle />
      </div>
    </header>
  );
}
