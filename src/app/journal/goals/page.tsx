'use client';

import { useState } from 'react';
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

interface Goal {
  id: number;
  title: string;
  description: string;
}

const initialGoals: Goal[] = [];

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals || []);
  const [newGoal, setNewGoal] = useState({ title: '', description: '' });
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const addGoal = () => {
    if (newGoal.title && newGoal.description) {
      setGoals([...goals, { id: Date.now(), ...newGoal }]);
      setNewGoal({ title: '', description: '' });
    }
  };

  const updateGoal = () => {
    if (editingGoal) {
      setGoals(
        goals.map((goal) => (goal.id === editingGoal.id ? editingGoal : goal))
      );
      setEditingGoal(null);
    }
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
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

        {goals.length === 0 ? (
          <Card className="col-span-full w-8/12 ">
            <CardContent className="flex flex-col items-center justify-center py-12 h-full">
              <Target className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No goals yet</h3>
              <p className="text-muted-foreground text-center">
                Start by adding a new goal to track your progress.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="w-full space-y-4 overflow-y-scroll flex-1">
            {goals.map((goal) => (
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
                              setEditingGoal(
                                editingGoal
                                  ? { ...editingGoal, title: e.target.value }
                                  : null
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-description">Description</Label>
                          <Input
                            id="edit-description"
                            value={editingGoal?.description || ''}
                            onChange={(e) =>
                              setEditingGoal(
                                editingGoal
                                  ? {
                                      ...editingGoal,
                                      description: e.target.value,
                                    }
                                  : null
                              )
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
                    onClick={() => deleteGoal(goal.id)}
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
