'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Target } from 'lucide-react';
import { Button } from '@/components/shadcn/ui/button';
import { Input } from '@/components/shadcn/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/ui/dialog';
import { Label } from '@/components/shadcn/ui/label';
import { createClient } from '@/utils/supabase/client';
import { nanoid } from 'nanoid';

interface Goal {
  title: string;
  description: string;
  goal_id: string;
}

export default function Goals() {
  const supabase = createClient();
  const [goals, setGoals] = useState<Goal[] | null>(null); // Initialized as empty array
  const [userID, setUserID] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    goal_id: '',
  });
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: goals, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error fetching goals:', error);
      }
      if (goals) {
        setGoals(goals);
        setUserID(user?.id);
      }
    };
    fetchGoals();
  }, []);

  const addGoal = async () => {
    const goal_id = `goal_${nanoid(15)}-${nanoid(3)}`;
    if (newGoal.title && newGoal.description && userID) {
      const { data, error } = await supabase.from('goals').insert({
        title: newGoal.title,
        description: newGoal.description,
        user_id: userID,
        goal_id: goal_id,
      });
      //  Setting State regardless of success or failure
      setGoals([
        ...(goals || []),
        {
          goal_id: goal_id,
          title: newGoal.title,
          description: newGoal.description,
        },
      ]);
      setNewGoal({ title: '', description: '', goal_id: '' });
      if (error) {
        console.error('Error adding goal:', error);
      }
    }
  };

  const updateGoal = async () => {
    if (editingGoal) {
      if (goals) {
        setGoals(
          goals.map((goal) =>
            goal.goal_id === editingGoal.goal_id ? editingGoal : goal
          )
        );
        const { error } = await supabase
          .from('goals')
          .update(editingGoal)
          .eq('goal_id', editingGoal.goal_id);
      }
      setEditingGoal(null);
    }
  };

  const deleteGoal = async (goal_id: string) => {
    if (goals) {
      setGoals(goals.filter((goal) => goal.goal_id !== goal_id));
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('goal_id', goal_id);
    }
  };

  return (
    <main className="flex-1 flex flex-col font-onest p-6 overflow-y-scroll">
      <div className="mb-6">
        <h2 className="font-unbounded text-2xl font-bold">Your Goals</h2>
      </div>
      <div className="flex gap-4 h-full overflow-y-scroll">
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

        {goals === null && (
          <Card className="col-span-full w-8/12">
            <CardContent className="flex flex-col items-center justify-center py-12 h-full">
              <Target className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Loading...</h3>
              <p className="text-muted-foreground text-center">
                Please wait while we fetch your goals.
              </p>
            </CardContent>
          </Card>
        )}

        {goals && goals.length === 0 ? (
          <Card className="col-span-full w-8/12">
            <CardContent className="flex flex-col items-center justify-center py-12 h-full">
              <Target className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {goals === null ? 'Loading...' : 'No goals yet'}
              </h3>
              <p className="text-muted-foreground text-center">
                {goals === null
                  ? 'Please wait while we fetch your goals.'
                  : 'Start by adding a new goal to track your progress.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="w-full space-y-4 overflow-y-scroll flex-1">
            {goals &&
              goals.map((goal) => (
                <Card key={goal.id} className="w-full">
                  <CardHeader>
                    <CardTitle>{goal.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{goal.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setEditingGoal(goal)}
                        >
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
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
                                  ...editingGoal,
                                  title: e.target.value,
                                } as Goal)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-description">
                              Description
                            </Label>
                            <Input
                              id="edit-description"
                              value={editingGoal?.description || ''}
                              onChange={(e) =>
                                setEditingGoal({
                                  ...editingGoal,
                                  description: e.target.value,
                                } as Goal)
                              }
                            />
                          </div>
                        </form>
                        <DialogFooter>
                          <Button onClick={updateGoal}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      onClick={() => deleteGoal(goal.goal_id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}