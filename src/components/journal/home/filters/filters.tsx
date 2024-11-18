'use client';

import React, { useState, useEffect } from 'react';
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
import { Button } from '@/components/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/ui/dialog';
import { Input } from '@/components/shadcn/ui/input';
import { Label } from '@/components/shadcn/ui/label';
import { Textarea } from '@/components/shadcn/ui/textarea';
import { PlusCircle, Edit, Trash2, Target } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { Goal, Tag } from '@/utils/types';

export default function Filters({
  goals,
  tags,
}: {
  goals: Goal[];
  tags: Tag[];
}) {
  const router = useRouter();
  const supabase = createClient();
  const [currentGoals, setGoals] = useState<Goal[]>(goals);
  const [currentTags, setTags] = useState<Tag[]>(tags);
  const [userId, setUserId] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState({ title: '', description: '' });
  const [newTag, setNewTag] = useState({ label: '' });
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  useEffect(() => {
    const fetchGoals = async (userId: string) => {
      const { data: goals, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', userId);
      if (error) {
        console.error('Error fetching goals:', error);
      } else {
        setGoals(goals);
      }
    };

    const fetchTags = async (userId: string) => {
      const { data: tags, error } = await supabase
        .from('tags')
        .select('*')
        .eq('user_id', userId);
      if (error) {
        console.error('Error fetching tags:', error);
      } else {
        setTags(tags);
      }
    };

    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        fetchGoals(user.id);
        fetchTags(user.id);
      }
    };
    fetchData();
  }, [supabase]);

  const handleAddGoal = async () => {
    console.log(newGoal);
    if (newGoal.title && userId) {
      const goalId = `goal_${nanoid(15)}-${nanoid(3)}`; // Unique goal ID
      const createdAt = new Date().toISOString(); // Current timestamp

      const { data, error } = await supabase
        .from('goals')
        .insert({
          title: newGoal.title,
          description: newGoal.description,
          user_id: userId,
          goal_id: goalId, // Unique goal ID
          created_at: createdAt, // Add the current timestamp
        })
        .select();

      if (error) {
        console.error('Error adding goal:', error);
      } else if (data) {
        setGoals([...currentGoals, data[0]]);
        setNewGoal({ title: '', description: '' });
        router.refresh();
      }
    }
  };

  const handleAddTag = async () => {
    if (newTag.label && userId) {
      const tagId = `tag_${nanoid(15)}-${nanoid(3)}`; // Unique tag ID
      const createdAt = new Date().toISOString(); // Current timestamp

      const { data, error } = await supabase
        .from('tags')
        .insert({
          label: newTag.label,
          user_id: userId,
          tag_id: tagId, // Unique tag ID
          created_at: createdAt, // Add the current timestamp
        })
        .select();

      if (error) {
        console.error('Error adding tag:', error);
      } else if (data) {
        setTags([...currentTags, data[0]]);
        setNewTag({ label: '' });
        router.refresh();
      }
    }
  };

  const handleEditGoal = async () => {
    if (editingGoal) {
      const { error } = await supabase
        .from('goals')
        .update({
          title: editingGoal.title,
          description: editingGoal.description,
        })
        .eq('goal_id', editingGoal.goal_id); // Goal ID is now the primary identifier

      if (error) {
        console.error('Error updating goal:', error);
      } else {
        setGoals(
          currentGoals.map((goal) =>
            goal.goal_id === editingGoal.goal_id ? editingGoal : goal
          )
        );
        setEditingGoal(null);
        router.refresh();
      }
    }
  };

  const handleEditTag = async () => {
    if (editingTag) {
      const { error } = await supabase
        .from('tags')
        .update({ label: editingTag.label })
        .eq('tag_id', editingTag.tag_id); // Tag ID is now the primary identifier

      if (error) {
        console.error('Error updating tag:', error);
      } else {
        setTags(
          currentTags.map((tag) =>
            tag.tag_id === editingTag.tag_id ? editingTag : tag
          )
        );
        setEditingTag(null);
        router.refresh();
      }
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('goal_id', goalId); // Use goal_id for deletion

    if (error) {
      console.error('Error deleting goal:', error);
    } else {
      setGoals(currentGoals.filter((goal) => goal.goal_id !== goalId));
      router.refresh();
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    const { error } = await supabase.from('tags').delete().eq('tag_id', tagId); // Use tag_id for deletion

    if (error) {
      console.error('Error deleting tag:', error);
    } else {
      setTags(currentTags.filter((tag) => tag.tag_id !== tagId));
      router.refresh();
    }
  };

  return (
    <Card className="font-onest mb-10 hidden lg:block overflow-y-scroll h-[calc(70vh-4rem)]">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Tags</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Manage Tags</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] font-onest">
              <DialogHeader>
                <DialogTitle>Manage Tags</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-tag-label" className="text-right">
                    Label
                  </Label>
                  <Input
                    id="new-tag-label"
                    value={newTag.label}
                    onChange={(e) => setNewTag({ label: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <Button onClick={handleAddTag} className="ml-auto">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Tag
                </Button>
              </div>
              <Separator className="my-4" />
              <div className="max-h-[200px] overflow-y-auto">
                {tags.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">
                      No tags yet. Add your first tag to get started!
                    </p>
                  </div>
                ) : (
                  tags.map((tag) => (
                    <div
                      key={tag.tag_id}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="font-medium">{tag.label}</span>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingTag(tag)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteTag(tag.tag_id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {editingTag && (
                <div className="mt-4 space-y-4">
                  <Input
                    value={editingTag.label ?? ''}
                    onChange={(e) =>
                      setEditingTag({ ...editingTag, label: e.target.value })
                    }
                    placeholder="Edit label"
                  />
                  <Button onClick={handleEditTag}>Save Changes</Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <TagQuery tags={tags} />
        <Separator />
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Goals</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Manage Goals</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] font-onest">
              <DialogHeader>
                <DialogTitle>Manage Goals</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-goal-title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="new-goal-title"
                    value={newGoal.title}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, title: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-goal-description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="new-goal-description"
                    value={newGoal.description}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, description: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <Button onClick={handleAddGoal} className="ml-auto">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
                </Button>
              </div>
              <Separator className="my-4" />
              <div className="max-h-[200px] overflow-y-auto">
                {currentGoals.length === 0 ? (
                  <div className="text-center py-4">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      No goals yet. Set your first goal to get started!
                    </p>
                  </div>
                ) : (
                  goals.map((goal) => (
                    <div
                      key={goal.goal_id}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="font-medium">{goal.title}</span>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingGoal(goal)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteGoal(goal.goal_id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {editingGoal && (
                <div className="mt-4 space-y-4">
                  <Input
                    value={editingGoal.title ?? ''}
                    onChange={(e) =>
                      setEditingGoal({ ...editingGoal, title: e.target.value })
                    }
                    placeholder="Edit title"
                  />
                  <Textarea
                    value={editingGoal.description ?? ''}
                    onChange={(e) =>
                      setEditingGoal({
                        ...editingGoal,
                        description: e.target.value,
                      })
                    }
                    placeholder="Edit description"
                  />
                  <Button onClick={handleEditGoal}>Save Changes</Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <GoalQuery goals={goals} />
        <Separator />
        <MoodQuery />
      </CardContent>
    </Card>
  );
}
