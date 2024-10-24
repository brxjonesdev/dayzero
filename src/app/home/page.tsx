'use client';
import React from 'react';
import UserDetails from '@/components/homepage/user-details';
import Search from '@/components/homepage/search';
import MobileGrid from '@/components/homepage/mobile-grid';
import PinnedToggle from '@/components/homepage/pinned-toggle';
import MoodGrid from '@/components/homepage/grid';
import Entries from '@/components/homepage/entries';
import { Separator } from '@/components/ui/separator';

export default function Homepage() {
  return (
    <>
      <section className="w-full container px-4 ">
        <UserDetails />
      </section>
      <section className="w-full container px-4 space-y-4">
        <Search />
        <div className="flex justify-end gap-4">
          <PinnedToggle />
          <MobileGrid />
        </div>
      </section>
      <Separator className="shadow-md" />
      <section className="w-full container px-4 flex-1 md:flex mb-4 gap-6 overflow-y-scroll">
        <MoodGrid />
        <Separator orientation='vertical'/>
        <Entries />
      </section>
    </>
  );
}
