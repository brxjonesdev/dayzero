import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card';
import TagQuery from './tag-query';
import GoalQuery from './goal-query';
import { Separator } from '@/components/shadcn/ui/separator';
import MoodQuery from './mood-query';

type Tag = {
  id: string;
  created_at: string;
  user_id: string;
  label: string;
  value: string;
  tag_id: string;
};

type Tags = Tag[];

type Goal = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  goal_id: string;
};

type Goals = Goal[];

export default function Filters({ goals, tags }: { goals: Goals; tags: Tags }) {
  return (
    <Card className="font-onest mb-10">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-scroll space-y-6">
        <TagQuery tags={tags} />
        <Separator />
        <GoalQuery goals={goals} />
        <Separator />
        <MoodQuery/>
      </CardContent>
    </Card>
  );
}
