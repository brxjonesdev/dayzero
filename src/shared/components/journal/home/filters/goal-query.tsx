'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/shared/components/shadcn/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcn/ui/select';
import Link from 'next/link';
import { Button } from '@/shared/components/shadcn/ui/button';
import { Goal } from '@/utils/types';

export default function GoalQuery({ goals }: { goals: Goal[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleGoalSelection = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('goal', value);
    router.push(`?${params.toString()}`);
  };

  const selectedGoal = searchParams.get('goal') || '';

  return (
    <div className="font-onest flex flex-col gap-4 justify-center w-full">
      {goals.length > 0 && (
        <>
          <Label>Select a Goal</Label>
          <Select value={selectedGoal} onValueChange={handleGoalSelection}>
            <SelectTrigger className="w-full justify-self-center">
              <SelectValue placeholder="Select A Goal" />
            </SelectTrigger>
            <SelectContent className="font-onest">
              {goals.map((goal) => (
                <SelectItem key={goal.goal_id} value={goal.goal_id}>
                  {goal.title}
                </SelectItem>
              ))}
              {!goals.length && (
                <Link className="text-md text-center" href="/journal/goals">
                  <Button variant="link">Add Goals</Button>
                </Link>
              )}
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  );
}
