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
import { nanoid } from 'nanoid';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/shadcn/ui/toggle-group';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

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
  const supabase = createClient();
  const Router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [newTag, setNewTag] = useState('');
  const [currentGoals, setGoals] = useState<Goals>(goals);
  const [currentTags, setTags] = useState<Tags>(tags);
  const [selectedMood, setSelectedMood] = useState('neutral');

  const handleAddGoal = () => {
    {
      /* What this function is doing.
       */
    }
    if (newGoal && !currentGoals.some((goal) => goal.title === newGoal)) {
      const newGoalObj = {
        id: `${Date.now()}`,
        user_id,
        title: newGoal,
        description: '',
        goal_id: `goal_${nanoid(15)}-${nanoid(3)}`,
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
      tag_id: `tag_${nanoid(15)}-${nanoid(3)}`,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the entry object
    const selectedTagsObj = currentTags.filter((tag) =>
      selectedTags.includes(tag.label)
    );
    const entry = {
      date: new Date().toISOString(),
      content,
      mood: selectedMood,
      goal: selectedGoal,
      tags: selectedTagsObj,
      user_id,
      pinned: false,
    };

    console.log('entry:', entry);

    // Prepare promises for adding new goal and new tags
    const promises: Promise<any>[] = [];

    // Check if the goal needs to be added
    if (entry.goal && !goals.some((goal) => goal.goal_id === entry.goal)) {
      const newGoal = currentGoals.find((goal) => goal.goal_id === entry.goal);
      if (newGoal) {
        const addGoalPromise = supabase.from('goals').insert([newGoal]);
        promises.push(addGoalPromise);
      }
    }

    // Check if new tags need to be added
    const newTagObj = currentTags.filter((tag) =>
      selectedTags
        .filter((tag) => !tags.some((t) => t.label === tag))
        .includes(tag.label)
    );
    if (newTagObj.length > 0) {
      const addTagPromises = newTagObj.map((tag) =>
        supabase.from('tags').insert([tag])
      );
      promises.push(...addTagPromises);
    }

    try {
      // Run all promises in parallel
      await Promise.all(promises);

      // Add the new entry to the database after goals and tags are added
      const { data, error } = await supabase.from('entries').insert({
        content: entry.content,
        user_id: entry.user_id,
        goal: entry.goal,
        // just tag ids
        tags: entry.tags.map((tag) => tag.tag_id),
        mood: entry.mood,
        date: entry.date,
        isPinned: entry.pinned,
      });
      // close the dialog
      Router.refresh()
      if (error) {
        console.error('Error adding entry:', error);
      } else {
        console.log('Entry added successfully:', data);
      }
    } catch (error) {
      console.error('Error adding goals or tags:', error);
    }
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
    setSelectedMood('');
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
        <DialogContent className="font-onest w-full max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-unbounded">
              Create a New Entry.
            </DialogTitle>
          </DialogHeader>
          <Card className="w-full  mx-auto p-0 border-none">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 px-0 grid grid-cols-2 gap-4 ">
                <div className="space-y-2 flex h-full flex-col">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your journal entry here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 resize-none"
                  />
                </div>
                <section className="space-y-4">
                  <div className="space-y-2">
                    <Label>Mood</Label>
                    <ToggleGroup
                      type="single"
                      value={selectedMood}
                      onValueChange={setSelectedMood}
                      className="grid grid-cols-4 gap-2"
                    >
                      <ToggleGroupItem
                        value="ecstatic"
                        className="bg-yellow-300 hover:bg-yellow-400"
                      >
                        Ecstatic
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="happy"
                        className="bg-green-300 hover:bg-green-400"
                      >
                        Happy
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="content"
                        className="bg-blue-300 hover:bg-blue-400"
                      >
                        Content
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="hopeful"
                        className="bg-teal-300 hover:bg-teal-400"
                      >
                        Hopeful
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="neutral"
                        className="bg-gray-300 hover:bg-gray-400"
                      >
                        Neutral
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="anxious"
                        className="bg-orange-300 hover:bg-orange-400"
                      >
                        Anxious
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="frustrated"
                        className="bg-red-300 hover:bg-red-400"
                      >
                        Frustrated
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="sad"
                        className="bg-indigo-300 hover:bg-indigo-400"
                      >
                        Sad
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="lonely"
                        className="bg-purple-300 hover:bg-purple-400"
                      >
                        Lonely
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="angry"
                        className="bg-pink-300 hover:bg-pink-400"
                      >
                        Angry
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="overwhelmed"
                        className="bg-amber-300 hover:bg-amber-400"
                      >
                        Overwhelmed
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="exhausted"
                        className="bg-rose-300 hover:bg-rose-400"
                      >
                        Exhausted
                      </ToggleGroupItem>
                    </ToggleGroup>
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
                              <SelectItem
                                key={goal.goal_id}
                                value={goal.goal_id}
                              >
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
                </section>
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
