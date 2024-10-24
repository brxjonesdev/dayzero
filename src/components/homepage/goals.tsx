'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Goal, Redo2Icon } from 'lucide-react';
import { useAppStore } from '@/providers/app-store-provider';
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '../ui/label';

export default function Goals() {
  const { goals, addGoal, editGoal, deleteGoal, toggleGoalCompletion } = useAppStore((state) => state);
  const [newGoal, setNewGoal] = useState({ title: '', description: '' });
  const [editingGoal, setEditingGoal] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddGoal = () => {
    addGoal(newGoal);
    setNewGoal({ title: '', description: '' });
    setIsAddDialogOpen(false);
  };

  const handleEditGoal = () => {
    editGoal(editingGoal.id, editingGoal);
    setEditingGoal(null);
    setIsEditDialogOpen(false);
  };

  const openEditDialog = (goal) => {
    setEditingGoal(goal);
    setIsEditDialogOpen(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-2">
          <Goal />
          Goals
        </Button>
      </DialogTrigger>
      <DialogContent className="font-geist-sans w-[95%] rounded-lg flex flex-col">
        <DialogHeader className="text-left">
          <DialogTitle className="font-geist-mono font-bold text-xl">Your Goals</DialogTitle>
          <DialogDescription>
            Your current goals. Add, edit, or delete them as needed.
            <br />
            <span className="italic">All that matters is that you keep moving forward.</span>
          </DialogDescription>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 w-full">Add Goal</Button>
            </DialogTrigger>
            <DialogContent className='font-geist-mono'>
              <DialogHeader>
                <DialogTitle>Add New Goal</DialogTitle>
                <DialogDescription>
                  Create a new goal to track your progress.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 font-geist-sans"  >
                <Label htmlFor="goal-title">What do you want to do?</Label>
                <Input
                  placeholder="Goal Title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
                <Label htmlFor="goal-description">Description</Label>
                <Textarea
                  placeholder="Goal Description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleAddGoal}>Add Goal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <ScrollArea className="min-h-[300px] max-h-[500px] w-full pt-4">
            {goals.length === 0 && (
              <section className="text-center rounded-md min-h-full flex items-center justify-center">
                <h2 className="text-sm md:text-md font-geist-mono text-black dark:text-white">
                  You have no goals yet. <br/> Start adding some!
                </h2>
              </section>
            )}
    
            {goals.map((goal) => (
              <Card key={goal.id} className='mb-4'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between'>
                    <CardTitle>{goal.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="hover:bg-black/20 dark:hover:bg-white/20 rounded-full py-1">
                        <EllipsisVertical className="h-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="font-geist-mono">
                        <DropdownMenuLabel className="font-geist-sans">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openEditDialog(goal)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteGoal(goal.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                <CardContent className='w-full flex justify-end'>
                  <Button
                    variant={goal.completed ? "ghost" : "outline"}
                    onClick={() => toggleGoalCompletion(goal.id)}
                  >
                    {goal.completed ? (
                      <>
                        Completed
                        <Redo2Icon className='ml-2' />
                      </>
                    ) : (
                      'Mark as Completed'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </DialogHeader>
      </DialogContent>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogDescription>
              Update your goal details.
            </DialogDescription>
          </DialogHeader>
          {editingGoal && (
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Goal Title"
                value={editingGoal.title}
                onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })}
              />
              <Textarea
                placeholder="Goal Description"
                value={editingGoal.description}
                onChange={(e) => setEditingGoal({ ...editingGoal, description: e.target.value })}
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleEditGoal}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}