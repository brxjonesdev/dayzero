'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent, CardHeader } from '@/components/shadcn/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu';
import { Button } from '@/components/shadcn/ui/button';
import { Badge } from '@/components/shadcn/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/ui/dialog';
import { Label } from '@/components/shadcn/ui/label';
import { Textarea } from '@/components/shadcn/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/shadcn/ui/toggle-group';
import { Entry, Goal, Tag } from '@/utils/types';

export default function EntryCard({
  entry,
  tags,
  goals,
}: {
  entry: Entry;
  tags: Tag[];
  goals: Goal[];
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedEntry, setEditedEntry] = useState({ ...entry });
  const [selectedGoal, setSelectedGoal] = useState(entry.goal?.goal_id || '');
  const [selectedTags, setSelectedTags] = useState(
    entry.tags?.map((t: { tag: Tag }) => t.tag.tag_id) || []
  );

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

  const handleEdit = () => {
    // onEdit({
    //   ...editedEntry,
    //   goal: goals.find(g => g.goal_id === selectedGoal),
    //   tags: selectedTags.map(tagId => ({ tag: tags.find(t => t.tag_id === tagId) }))
    // })
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    // onDelete(entry.goal.goal_id)
    setIsDeleteModalOpen(false);
  };

  const handleGoalSelection = (value: string) => {
    setSelectedGoal(value);
  };

  const handleTagSelection = (value: string[]) => {
    setSelectedTags(value);
  };

  return (
    <Card className="mb-4 w-full pr-2">
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

            {entry.tags?.map((t: any) => (
              <Badge
                key={t.tag.tag_id}
                variant="outline"
                className="bg-cyan-500 dark:bg-fuchsia-500 text-black"
              >
                {t.tag.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] font-onest">
          <DialogHeader>
            <DialogTitle>Edit Entry</DialogTitle>
            <DialogDescription>
              Make changes to your entry here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                value={editedEntry.content}
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
                value={editedEntry.mood}
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
            <Label>Select a Goal</Label>
            <Select value={selectedGoal} onValueChange={handleGoalSelection}>
              <SelectTrigger className="w-full justify-self-center">
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
            <div className="flex justify-between items-center w-full">
              <Label>Search By Tags</Label>
            </div>

            <ToggleGroup
              className="w-full rounded-xl flex-wrap bg-black/5 py-2 justify-center max-h-64 overflow-y-scroll"
              type="multiple"
              value={selectedTags}
              onValueChange={handleTagSelection}
            >
              {tags.map((tag) => (
                <ToggleGroupItem key={tag.tag_id} value={tag.tag_id}>
                  <Badge className="bg-cyan-500 dark:bg-fuchsia-500">
                    {tag.label}
                  </Badge>
                </ToggleGroupItem>
              ))}
              {!tags.length && (
                <Link className="text-xs mx-auto" href="/journal/tags">
                  Add Tags
                </Link>
              )}
            </ToggleGroup>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEdit}>
              Save changes
            </Button>
          </DialogFooter>
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
