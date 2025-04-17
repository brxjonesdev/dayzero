'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/shadcn/ui/button';
import { Card, CardContent, CardFooter } from '@/shared/components/shadcn/ui/card';
import { Input } from '@/shared/components/shadcn/ui/input';
import { Label } from '@/shared/components/shadcn/ui/label';
import { Textarea } from '@/shared/components/shadcn/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcn/ui/select';
import { Badge } from '@/shared/components/shadcn/ui/badge';
import { Plus, PlusCircle, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/shadcn/ui/dialog';
import { nanoid } from 'nanoid';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/components/shadcn/ui/toggle-group';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Entry, Goal, Tag } from '@/utils/types';

export default function JournalEntryForm({
  goals,
  tags,
  user_id,
}: {
  goals: Goal[];
  tags: Tag[];
  user_id: string | undefined;
}) {
  const supabase = createClient();
  const Router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [newTag, setNewTag] = useState('');
  const [currentGoals, setGoals] = useState<Goal[]>(goals);
  const [currentTags, setTags] = useState<Tag[]>(tags);
  const [selectedMood, setSelectedMood] = useState('neutral');

  const handleAddGoal = () => {
    if (newGoal && !currentGoals.some((goal) => goal.title === newGoal)) {
      const newGoalObj = {
        id: Date.now(),
        created_at: new Date().toISOString(),
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

  const addGoalIfNeeded = async (
    goal_id: string,
    currentGoals: Goal[],
    goals: Goal[]
  ) => {
    const goalExists = goals.some((goal) => goal.goal_id === goal_id);

    if (goal_id && !goalExists) {
      const newGoal = currentGoals.find((goal) => goal.goal_id === goal_id);
      if (newGoal) {
        return supabase
          .from('goals')
          .insert([{ ...newGoal, created_at: new Date().toISOString() }]);
      }
    }

    return null; // No new goal needed
  };

  const addNewTags = async (
    selectedTags: string[],
    currentTags: Tag[],
    tags: Tag[]
  ) => {
    const newTags = currentTags.filter(
      (tag) =>
        tag.label &&
        selectedTags.includes(tag.label) &&
        !tags.some((existingTag) => existingTag.tag_id === tag.tag_id)
    );

    const tagInsertPromises = newTags.map((tag) => {
      return supabase
        .from('tags')
        .insert([
          {
            tag_id: tag.tag_id, // Ensure that you're inserting the correct tag_id
            label: tag.label,
            user_id: tag.user_id,
            created_at: new Date().toISOString(),
          },
        ])
        .then(() => {}); // Convert to Promise<void>
    });

    return tagInsertPromises;
  };

  const insertEntryAndAssociateTags = async (
    entry: Entry,
    tagIds: string[]
  ) => {
    const { data: entryData, error: entryError } = await supabase
      .from('entries')
      .insert({
        content: entry.content,
        user_id: entry.user_id,
        goal_id: entry.goal_id || null,
        mood: entry.mood,
        date: entry.date,
        created_at: new Date().toISOString(),
      })
      .select('id'); // Return the new entry's ID for tag association

    if (entryError) {
      console.error('Error adding entry:', entryError);
      return null;
    }

    if (entryData && entryData[0] && tagIds.length > 0) {
      const entryTagsInsert = tagIds.map((tag_id) => ({
        entry_id: entryData[0].id, // Use the returned entry ID
        tag_id, // Use tag_id for association
      }));

      const { error: tagAssociationError } = await supabase
        .from('entry_tags')
        .insert(entryTagsInsert);

      if (tagAssociationError) {
        console.error(
          'Error associating tags with entry:',
          tagAssociationError
        );
      } else {
        console.log('Tags associated with entry successfully.');
      }
    }

    return entryData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Map selected tag labels to tag objects
    const selectedTagsObj = currentTags.filter((tag) =>
      selectedTags.includes(tag.label ?? '')
    );

    // Prepare the new entry object
    const entry: Entry = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      date: new Date().toISOString(),
      content,
      mood: selectedMood,
      goal_id: selectedGoal, // Use goal_id for association
      user_id,
    };

    console.log('entry:', entry);

    // Start a list of promises
    const promises: Promise<void>[] = [];

    try {
      // Step 1: Add goal if needed
      if (entry.goal_id) {
        await addGoalIfNeeded(entry.goal_id, currentGoals, goals);
      }

      // Step 2: Add new tags
      const tagInsertPromises = await addNewTags(
        selectedTags,
        currentTags,
        tags
      );
      promises.push(...(tagInsertPromises as Promise<void>[]));

      // Run all promises to add goals and tags
      const results = await Promise.allSettled(promises);

      // Handle any rejected promises
      const failedPromises = results.filter(
        (result) => result.status === 'rejected'
      );
      if (failedPromises.length > 0) {
        console.error('Some goals or tags failed to insert:', failedPromises);
        return; // Stop if goals/tags were not inserted
      }

      // Step 3: Re-fetch tags to get the correct tag_id values
      const { data: updatedTags, error: tagError } = await supabase
        .from('tags')
        .select('tag_id') // Ensure this aligns with the schema (tag_id)
        .in(
          'tag_id',
          selectedTagsObj.map((tag) => tag.tag_id)
        );

      if (tagError) {
        console.error('Error fetching updated tags:', tagError);
        return;
      }

      // Get the tag_ids
      const tagIds = updatedTags.map((tag) => tag.tag_id);

      // Step 4: Insert the entry and associate tags
      const entryData = await insertEntryAndAssociateTags(entry, tagIds);

      if (!entryData) {
        console.error('Error adding entry or associating tags.');
        return;
      }

      console.log('Entry added successfully:', entryData);

      // Refresh the view or perform any necessary actions after success
      Router.refresh();
      handleClose();
    } catch (error) {
      console.error('Error adding goals, tags, or entry:', error);
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
          <Button className="w-full text-sm font-heading" onClick={handleOpen}>
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
                          key={tag.tag_id}
                          variant={
                            selectedTags.includes(tag.label ?? '')
                              ? 'default'
                              : 'outline'
                          }
                          className="cursor-pointer"
                          onClick={() =>
                            tag.label && handleTagSelect(tag.label)
                          }
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
