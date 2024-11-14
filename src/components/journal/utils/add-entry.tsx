'use client';

import { useState } from 'react';
import { Button } from '@/components/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card';
import { Input } from '@/components/shadcn/ui/input';
import { Label } from '@/components/shadcn/ui/label';
import { Textarea } from '@/components/shadcn/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select';
import { Badge } from '@/components/shadcn/ui/badge';
import { Plus, PlusCircle, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/ui/dialog';

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

export default function JournalEntryForm({
  goals,
  tags,
  user_id,
}: {
  goals: Goals;
  tags: Tags;
  user_id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [newTag, setNewTag] = useState('');
  const [currentGoals, setGoals] = useState<Goals>(goals);
  const [currentTags, setTags] = useState<Tags>(tags);

  const handleAddGoal = () => {
    if (newGoal && !currentGoals.some((goal) => goal.title === newGoal)) {
      const newGoalObj = {
        id: `${Date.now()}`,
        user_id,
        title: newGoal,
        description: '', // Optional: Update this if you have a description for new goals
        goal_id: `${Date.now()}_${newGoal}`,
      };
      setGoals([...currentGoals, newGoalObj]);
      setSelectedGoal(newGoalObj.goal_id);
      setNewGoal('');
    }
  };

  const handleAddTag = () => {
    const newTagObj = {
      id: `${Date.now()}`,
      created_at: new Date().toISOString(),
      user_id,
      label: newTag,
      value: newTag.toLowerCase(),
      tag_id: `${Date.now()}_${newTag}`,
    };
    if (newTag && !currentTags.some((tag) => tag.label === newTag)) {
      setTags([...currentTags, newTagObj]);
      setSelectedTags([...selectedTags, newTag]);
      setNewTag('');
    }
  };

  const handleTagSelect = (tagLabel: string) => {
    setSelectedTags(
      selectedTags.includes(tagLabel)
        ? selectedTags.filter((t) => t !== tagLabel)
        : [...selectedTags, tagLabel]
    );
  };

  const handleRemoveTag = (tagLabel: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tagLabel));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = {
      date: new Date().toISOString(),
      content,
      goal: selectedGoal,
      tags: selectedTags,
      pinned: false,
    };
    console.log('Saving entry:', entry);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setGoals(goals);
    setTags(tags);
  };

  const handleClose = () => {
    setContent('');
    setSelectedGoal('');
    setSelectedTags([]);
    setNewGoal('');
    setNewTag('');
    setIsOpen(false);
    setGoals(goals);
    setTags(tags);
  };

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" onClick={handleOpen}>
            <Plus />
            Add Entry
          </Button>
        </DialogTrigger>
        <DialogContent className="font-onest">
          <DialogHeader>
            <DialogTitle className="font-unbounded">
              Create a New Entry.
            </DialogTitle>
          </DialogHeader>
          <Card className="w-full max-w-2xl mx-auto p-0 border-none">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 px-0">
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your journal entry here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>

                <div className="space-y-2">
                  {currentGoals.length > 0 && (
                    <>
                      <Label htmlFor="goal">Goal</Label>
                      <Select
                        value={selectedGoal}
                        onValueChange={setSelectedGoal}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a goal" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentGoals.map((goal) => (
                            <SelectItem key={goal.goal_id} value={goal.goal_id}>
                              {goal.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  )}
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add new goal"
                      value={newGoal}
                      onChange={(e) => setNewGoal(e.target.value)}
                    />
                    <Button type="button" onClick={handleAddGoal} size="icon">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {currentTags.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant={
                          selectedTags.includes(tag.label)
                            ? 'default'
                            : 'outline'
                        }
                        className="cursor-pointer"
                        onClick={() => handleTagSelect(tag.label)}
                      >
                        {tag.label}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add new tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                    />
                    <Button type="button" onClick={handleAddTag} size="icon">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {selectedTags.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tagLabel) => (
                        <Badge
                          key={tagLabel}
                          variant="secondary"
                          className="pl-2 pr-1 py-1 flex items-center space-x-1"
                        >
                          <span>{tagLabel}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0"
                            onClick={() => handleRemoveTag(tagLabel)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="px-0 space-x-4">
                <DialogClose onClick={handleClose} className="w-full" asChild>
                  <Button variant="ghost" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full">
                  Save Entry
                </Button>
              </CardFooter>
            </form>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}
