import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card';
import TagQuery from './tag-query';
import GoalQuery from './goal-query';
import { Separator } from '@/components/shadcn/ui/separator';
import GridToggle from './grid-toggle';
import PinnedToggle from './pinned-toggle';

export default function Filters() {
  return (
    <Card className="font-onest mb-10">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-scroll space-y-6">
        <TagQuery />
        <Separator />
        <GoalQuery />
        <Separator />
        <div className="flex justify-between gap-4">
          <GridToggle />
          <PinnedToggle />
        </div>
      </CardContent>
    </Card>
  );
}
