'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Pencil, Trash2, Target, MoreHorizontal } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/ui/button';
import { Input } from '@/shared/components/shadcn/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/shadcn/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/shadcn/ui/dialog';
import { Label } from '@/shared/components/shadcn/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/ui/dropdown-menu';

interface Goal {
  title: string;
  description: string;
  goal_id: string;
}

export function GoalList({ initialGoals }: { initialGoals: Goal[] }) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const supabase = createClient();

  const updateGoal = async () => {
    if (editingGoal) {
      setGoals(
        goals.map((goal) =>
          goal.goal_id === editingGoal.goal_id ? editingGoal : goal
        )
      );
      const { error } = await supabase
        .from('goals')
        .update(editingGoal)
        .eq('goal_id', editingGoal.goal_id);
      if (error) {
        console.error('Error updating goal:', error);
      }
      setEditingGoal(null);
      setIsDialogOpen(false);
    }
  };

  const deleteGoal = async (goal_id: string) => {
    setGoals(goals.filter((goal) => goal.goal_id !== goal_id));
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('goal_id', goal_id);
    if (error) {
      console.error('Error deleting goal:', error);
    }
  };

  if (goals.length === 0) {
    return (
      <Card className="col-span-full w-8/12">
        <CardContent className="flex flex-col items-center justify-center py-12 h-full">
          <Target className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No goals yet</h3>
          <p className="text-muted-foreground text-center">
            Start by adding a new goal to track your progress.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="w-full overflow-y-scroll flex-1 grid grid-cols-2 gap-4 p-4 auto-rows-min">
        {goals.map((goal) => (
          <Card
            key={goal.goal_id}
            className="w-full h-fit bg-gradient-to-t from-cyan-200 to-cyan-500 dark:from-fuchsia-600 dark:to-pink-600 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer dark:text-black"
          >
            <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
              <CardTitle className="text-xl font-semibold">
                {goal.title}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onSelect={() => {
                      setEditingGoal(goal);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => deleteGoal(goal.goal_id)}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">{goal.description || 'No description'}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateGoal();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={editingGoal?.title || ''}
                onChange={(e) =>
                  setEditingGoal({
                    ...editingGoal!,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={editingGoal?.description || ''}
                onChange={(e) =>
                  setEditingGoal({
                    ...editingGoal!,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </form>
          <DialogFooter>
            <Button onClick={updateGoal}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
