import React from 'react';
import MiniUserData from '../layout/mini-user';
import { ModeToggle } from '../shadcn/ui/mode-toggle';
import Navbar from './navbar';
import { createClient } from '@/utils/supabase/server';

export default async function JournalHeader() {
  return (
    <header className="py-4 flex justify-between">
      <div className="flex gap-8 items-center">
        <h1 className="text-3xl font-bold font-unbounded dark:text-white">
          DayZero
        </h1>
        <Navbar />
      </div>

      <div className="flex gap-4 items-center">
        <ModeToggle />
      </div>
    </header>
  );
}
