import React from 'react';
import { Label } from '../../shadcn/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select';
import Link from 'next/link';
import { Button } from '@/components/shadcn/ui/button';

type Goal = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  goal_id: string;
};

type Goals = Goal[];

export default function GoalQuery({ goals }: { goals: Goals }) {
  return (
    <div className="font-onest flex flex-col gap-4 justify-center w-full ">
      <Label>Select a Goal</Label>
      <Select>
        <SelectTrigger className="w-full justify-self-center">
          <SelectValue placeholder="Select A Goal" />
        </SelectTrigger>
        <SelectContent className="font-onest">
          {goals.map((goal) => (
            <SelectItem key={goal.title} value={goal.title} className=''>
              {goal.title}
            </SelectItem>
          ))}
          {!goals.length && (
            <Link className="text-md text-center" href={'/journal/goals'}>
             <Button variant={'link'}>Add Goals</Button>
            </Link>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
