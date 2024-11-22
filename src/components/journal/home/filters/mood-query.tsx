'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/components/shadcn/ui/label';
import { Badge } from '@/components/shadcn/ui/badge';

export default function MoodQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();

  type Mood =
    | 'ecstatic'
    | 'happy'
    | 'content'
    | 'hopeful'
    | 'neutral'
    | 'anxious'
    | 'frustrated'
    | 'sad'
    | 'lonely'
    | 'angry'
    | 'overwhelmed'
    | 'exhausted';

  const moodColors: Record<Mood, string> = {
    ecstatic: 'bg-yellow-300 hover:bg-yellow-400',
    happy: 'bg-green-300 hover:bg-green-400',
    content: 'bg-blue-300 hover:bg-blue-400',
    hopeful: 'bg-teal-300 hover:bg-teal-400',
    neutral: 'bg-gray-300 hover:bg-gray-400',
    anxious: 'bg-orange-300 hover:bg-orange-400',
    frustrated: 'bg-red-300 hover:bg-red-400',
    sad: 'bg-indigo-300 hover:bg-indigo-400',
    lonely: 'bg-purple-300 hover:bg-purple-400',
    angry: 'bg-pink-300 hover:bg-pink-400',
    overwhelmed: 'bg-amber-300 hover:bg-amber-400',
    exhausted: 'bg-rose-300 hover:bg-rose-400',
  };

  return (
    <section className="space-y-2">
      <Label>Select a Mood</Label>
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(moodColors) as Mood[]).map((mood) => (
          <Badge
            key={mood}
            className={`${moodColors[mood]} py-1 items-center justify-center text-center`}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('mood', mood);
              router.push(`?${params.toString()}`);
            }}
          >
            {mood}
          </Badge>
        ))}
      </div>
    </section>
  );
}
