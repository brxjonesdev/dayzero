import React from 'react';
import { ModeToggle } from '../shadcn/ui/mode-toggle';
import Settings from './utils/settings';

export default function JournalHeader() {
  return (
    <header className="pt-2 px-7 flex justify-between">
      <div className="flex gap-8 items-center">
        <h1 className="text-xl font-bold font-unbounded dark:text-white">
         Tenuto
        </h1>
      </div>

      <div className="flex gap-4 items-center">
        <Settings/>
        <ModeToggle />
      </div>
    </header>
  );
}
