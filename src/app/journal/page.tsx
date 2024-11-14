
import AppInfo from '@/components/journal/app-info';
import GoalQuery from '@/components/journal/goal-query';
import GridToggle from '@/components/journal/grid-toggle';

import PinnedToggle from '@/components/journal/pinned-toggle';
import Reflect from '@/components/journal/reflect';
import TagQuery from '@/components/journal/tag-query';
import UserDetails from '@/components/journal/user-details';
import { Separator } from '@/components/shadcn/ui/separator';
import React from 'react';
export default function AppHome() {
  return (
    <main className="flex-1 flex flex-col">
      <section className="md:flex gap-4">
        <UserDetails />
        <AppInfo />
      </section>
      <section className="py-4 flex flex-row h-40">
        <TagQuery />
        <Separator orientation="vertical" />
        <GoalQuery />
        <Separator orientation="vertical" />
        <PinnedToggle />
        <Separator orientation="vertical" />
        <GridToggle />
        <Separator orientation="vertical" />
        <Reflect />
      </section>
      <section className="flex flex-1 bg-black/5"></section>
    </main>
  );
}
