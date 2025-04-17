'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { Button } from '@/shared/components/shadcn/ui/button';
import EntryCard from './entry-card';
import { Entry, Goal, Tag } from '@/utils/types';

export default function Journal({
  entries,
  goals,
  tags,
}: {
  entries: Entry[];
  goals: Goal[];
  tags: Tag[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedTags = searchParams.getAll('tag');
  const selectedGoal = searchParams.get('goal');
  const date = searchParams.get('date'); // e.g., 2024-02-01
  const mood = searchParams.get('mood'); // e.g., happy

  const filteredEntries = entries.filter((entry) => {
    // Check tags
    if (
      selectedTags.length > 0 &&
      !(entry.tags ?? []).some((tag) => selectedTags.includes(tag.tag_id)) // Ensure correct tag access
    ) {
      return false;
    }

    // Check goal
    if (
      selectedGoal &&
      (!entry.goal || String(entry.goal.goal_id) !== selectedGoal)
    ) {
      return false;
    }

    // Check date
    if (date && format(parseISO(entry.date as string), 'yyyy-MM-dd') !== date) {
      return false;
    }

    // Check mood
    if (mood && entry.mood !== mood) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex-1 flex flex-col gap-4 overflow-y-auto px-4 py-6 lg:py-8 lg:px-8">
      {filteredEntries.length > 0 ? (
      filteredEntries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} goals={goals} tags={tags} />
      ))
      ) : (
      <div className="bg-black/10 dark:bg-white/10 rounded-3xl flex-1 flex items-center justify-center flex-col text-muted-foreground">
        <p className="font-heading text-center font-semibold">No entries found</p>
        <Button
        variant="link"
        className="text-sm font-body"
        onClick={() => router.push(window.location.pathname)}
        >
        Clear Tags
        </Button>
      </div>
      )}
    </div>
  );
}
