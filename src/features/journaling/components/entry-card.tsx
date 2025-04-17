'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

import { Card, CardContent, CardHeader } from '@/shared/components/shadcn/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/ui/dropdown-menu';
import { Button } from '@/shared/components/shadcn/ui/button';
import { Badge } from '@/shared/components/shadcn/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/shadcn/ui/dialog';
import { Label } from '@/shared/components/shadcn/ui/label';
import { Textarea } from '@/shared/components/shadcn/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcn/ui/select';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/components/shadcn/ui/toggle-group';
import { Entry, Goal, Tag } from '@/utils/types';
import { useRouter } from 'next/navigation';

export default function EntryCard({
  entry,
  tags,
  goals,
}: {
  entry: Entry;
  tags: Tag[];
  goals: Goal[];
}) {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedEntry, setEditedEntry] = useState({ ...entry });
  const [selectedGoal, setSelectedGoal] = useState(entry.goal?.goal_id || '');
  const [selectedTags, setSelectedTags] = useState(
    entry.tags?.map((t: Tag) => t.tag?.tag_id ?? '') || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const moodColors = {
    ecstatic: 'bg-yellow-300 hover:bg-yellow-400',
    happy: 'bg-green-300 hover:bg-green-400',
    content: 'bg-blue-300 hover:bg-blue-400',
    hopeful: 'bg-teal-300 hover:bg-teal-400',
    neutral: 'bg-gray-300 hover:bg-gray-400',
    anxious: 'bg-orange-300 hover:bg-orange-400',
    frustrated: 'bg-red-300 hover:bg-red-400',
    sad: 'bg-indigo-300 hover:bg-indigo-400',
    lonely: 'bg-purple-300 hover:bg-purple-400',
    angry: 'bg-pink-300 hover:bg-pink-400',
    overwhelmed: 'bg-amber-300 hover:bg-amber-400',
    exhausted: 'bg-rose-300 hover:bg-rose-400',
  };

  const handleEdit = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      // Updating the main fields for the entry
      const {error: updateError } = await supabase
        .from("entries")
        .update({
          content: editedEntry.content,
          mood: editedEntry.mood,
          goal_id: selectedGoal,
        })
        .eq("id", entry.id);
  
      if (updateError) throw updateError;
  
      // Handle Tags
      const newTags = selectedTags; // Array of tag IDs the user selected
      const currentTags = entry?.tags?.map((tag) => tag.tag?.tag_id).filter((tag): tag is string => !!tag) ?? [];
  
      // Tags to add
      const tagsToAdd = newTags.filter((tag) => !currentTags.includes(tag));
  
      // Tags to remove
      const tagsToRemove = currentTags.filter((tag) => tag && !newTags.includes(tag));
  
      // Add new tags
      if (tagsToAdd.length > 0) {
        const { error: addError } = await supabase
          .from("entry_tags")
          .insert(
            tagsToAdd.map((tag_id) => ({
              entry_id: entry.id,
              tag_id,
            }))
          );
  
        if (addError) throw addError;
      }
  
      // Remove old tags
      if (tagsToRemove.length > 0) {
        const { error: removeError } = await supabase
          .from("entry_tags")
          .delete()
          .eq("entry_id", entry.id)
          .in("tag_id", tagsToRemove);
  
        if (removeError) throw removeError;
      }
  
      console.log("Entry updated successfully!");
    } catch (error) {
      console.error("Error updating entry:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false); 
      router.refresh();
      setIsEditModalOpen(false);
    }
  };
  

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('entries')
        .delete()
        .eq('id', entry.id);

      if (error) throw error;
      router.refresh();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting entry:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };

  return (
    <Card className="mb-4 w-full">
      <CardHeader className="pb-0 font-onest">
        <div className="text-xs border-b pb-2 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">
              {format(new Date(entry.date), 'PPpp')}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div
                className={`w-3 h-3 rounded-full ${moodColors[entry.mood as keyof typeof moodColors] || 'bg-gray-500'}`}
              />
              <p className="capitalize">{entry.mood}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:bg-accent hover:text-accent-foreground rounded-full p-1">
                <EllipsisVertical className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setIsEditModalOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setIsDeleteModalOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 py-4 pt-0 font-onest">
        <p className="border-b py-4">{entry.content}</p>
        <div className="space-y-2 font-onest">
          <div className="flex flex-wrap gap-2 items-center">
            <p className="text-sm font-semibold">Goal</p>
            {entry.goal ? (
              <Badge variant="outline">{entry.goal.title}</Badge>
            ) : (
              <p className="text-sm text-muted-foreground">No goal</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <p className="text-sm font-semibold">Tags:</p>

            {entry.tags?.map((t: Tag) => (
              <Badge
                key={t.tag?.tag_id}
                variant="outline"
                className="bg-cyan-500 dark:bg-fuchsia-500 text-black"
              >
                {t.tag?.label}
              </Badge>
            ))}
            {entry.tags?.length === 0 && (
              <p className="text-sm text-muted-foreground">No tags</p>
            )}
          </div>
        </div>
      </CardContent>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] font-onest">
          <DialogHeader>
            <DialogTitle>Edit Entry</DialogTitle>
            <DialogDescription>
              Make changes to your entry here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={editedEntry.content || ''}
                  onChange={(e) =>
                    setEditedEntry({ ...editedEntry, content: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mood" className="text-right">
                  Mood
                </Label>
                <Select
                  value={editedEntry.mood || undefined}
                  onValueChange={(value) =>
                    setEditedEntry({ ...editedEntry, mood: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(moodColors).map((mood) => (
                      <SelectItem key={mood} value={mood}>
                        {mood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal" className="text-right">
                  Goal
                </Label>
                <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select A Goal" />
                  </SelectTrigger>
                  <SelectContent className="font-onest">
                    {goals.map((goal) => (
                      <SelectItem key={goal.goal_id} value={goal.goal_id}>
                        {goal.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Tags</Label>
                <ToggleGroup
                  className="col-span-3 flex flex-wrap gap-2"
                  type="multiple"
                  value={selectedTags}
                  onValueChange={setSelectedTags}
                >
                  {tags.map((tag) => (
                    <ToggleGroupItem key={tag.tag_id} value={tag.tag_id} asChild>
                      <Badge variant="outline">{tag.label}</Badge>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
            <DialogFooter>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px] font-onest">
          <DialogHeader>
            <DialogTitle>Delete Entry</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this entry? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}