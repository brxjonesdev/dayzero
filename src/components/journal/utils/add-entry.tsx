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

export default function JournalEntryForm({ goals, tags, user_id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [newTag, setNewTag] = useState('');
  const [currentGoals, setGoals] = useState(goals);
  const [currentTags, setTags] = useState(tags);

  const handleAddGoal = () => {
    if (newGoal && !currentGoals.includes(newGoal)) {
      setGoals([...currentGoals, newGoal]);
      setSelectedGoal(newGoal);
      setNewGoal('');
    }
  };

  const handleAddTag = () => {
    if (newTag && !currentTags.includes(newTag)) {
      setTags([...currentTags, newTag]);
      setSelectedTags([...selectedTags, newTag]);
      setNewTag('');
    }
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
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
    // Here you would typically send this data to your backend or state management system
  };

  const handleOpen = () => {
    setIsOpen(true);
    // Reset goals and tags to initial values on open
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
    // Reset goals and tags to initial values on close
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
                      <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a goal" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentGoals.map((goal) => (
                            <SelectItem key={goal} value={goal}>
                              {goal}
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
                        key={tag}
                        variant={
                          selectedTags.includes(tag) ? 'default' : 'outline'
                        }
                        className="cursor-pointer"
                        onClick={() => handleTagSelect(tag)}
                      >
                        {tag}
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
                      {selectedTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="pl-2 pr-1 py-1 flex items-center space-x-1"
                        >
                          <span>{tag}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className='px-0 space-x-4'>
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
