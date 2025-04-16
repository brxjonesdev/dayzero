'use client';

import { useState } from 'react';
import { nanoid } from 'nanoid';
import { createClient } from '@/utils/supabase/client';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components//shadcn/ui/button';
import { Input } from '@/shared/components//shadcn/ui/input';
import { Label } from '@/shared/components//shadcn/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components//shadcn/ui/card';

export function AddGoalForm({ userId }: { userId: string }) {
  const [newGoal, setNewGoal] = useState({ title: '', description: '' });
  const supabase = createClient();

  const addGoal = async () => {
    const goal_id = `goal_${nanoid(15)}-${nanoid(3)}`;
    if (newGoal.title && newGoal.description) {
      const { error } = await supabase.from('goals').insert({
        title: newGoal.title,
        description: newGoal.description,
        user_id: userId,
        goal_id: goal_id,
      });

      if (error) {
        console.error('Error adding goal:', error);
      } else {
        setNewGoal({ title: '', description: '' });
        // You might want to add some state update or refetch logic here
      }
    }
  };

  return (
    <Card className="h-fit w-4/12">
      <CardHeader>
        <CardTitle>Add New Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addGoal();
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter goal title"
              value={newGoal.title}
              onChange={(e) =>
                setNewGoal({ ...newGoal, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter goal description"
              value={newGoal.description}
              onChange={(e) =>
                setNewGoal({ ...newGoal, description: e.target.value })
              }
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={addGoal} className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Goal
        </Button>
      </CardFooter>
    </Card>
  );
}
