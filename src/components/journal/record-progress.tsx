'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useAppStore } from '@/providers/app-store-provider';
import { Target } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const formSchema = z.object({
  goal_id: z.string().nonempty('Please select a goal'),
  progress: z.string().min(1, 'Please enter some progress'),
  tags: z.array(z.string()).min(1, 'Please select at least one tag'),
});

type FormValues = z.infer<typeof formSchema>;

export default function RecordProgress() {
  const { goals, custom_tags, addDay, addDayEntry, days } = useAppStore(
    (state) => state
  );
  const [open, setOpen] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal_id: '',
      progress: '',
      tags: [],
    },
  });

  const selectedTags = watch('tags');

  const handleTagSelect = (value: string) => {
    const updatedTags = selectedTags.includes(value)
      ? selectedTags.filter((tag) => tag !== value)
      : [...selectedTags, value];
    setValue('tags', updatedTags);
  };

  const addEntryForToday = (data: FormValues) => {
    // Today's date as a string ID (e.g., "Wed Nov 07 2024")
    const todayId = new Date().toDateString();

    // Check if there's already an entry for today, if not create a new day
    const todayEntry = days.find((day) => day.id === todayId);

    if (!todayEntry) {
      // If there's no entry for today, add a new day
      addDay(new Date().toDateString());
    }

    const todayEntryUpdated = days.find((day) => day.id === todayId);

    if (todayEntryUpdated) {
      // Add a new entry to the day
      addDayEntry(
        todayEntryUpdated.id, // dayId
        data.progress, // entryContent (progress)
        data.tags
          .map((tagName) => custom_tags.find((tag) => tag.name === tagName))
          .filter((tag): tag is Tag => tag !== undefined), // tags (filter undefined tags)
        goals.filter((goal) => goal.id === data.goal_id) // progressedGoals (optional)
      );
    }
  };

  const onSubmit = (data: FormValues) => {
    addEntryForToday(data);

    // Reset form and close the dialog
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <Target className="mr-2 h-4 w-4" />
          Record Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="font-geist-sans w-[95%] max-w-md rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="font-geist-mono font-bold text-xl">
            Record Progress
          </DialogTitle>
          <DialogDescription>
            Record your progress towards your goals. Add a journal entry to
            reflect on your day.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="goal_id">What Goal did you work towards?</Label>
            <Controller
              name="goal_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {goals.map((goal) => (
                      <SelectItem
                        key={goal.id}
                        value={goal.id}
                        className="font-geist-sans"
                      >
                        {goal.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.goal_id && (
              <p className="text-red-500 text-sm">{errors.goal_id.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="progress">What progress did you make?</Label>
            <Controller
              name="progress"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  className="w-full h-32 p-2 rounded-lg border border-gray-300"
                  placeholder="I made progress by..."
                />
              )}
            />
            {errors.progress && (
              <p className="text-red-500 text-sm">{errors.progress.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {custom_tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant={
                    selectedTags.includes(tag.name) ? 'default' : 'outline'
                  }
                  className="cursor-pointer"
                  onClick={() => handleTagSelect(tag.name)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags.message}</p>
            )}
            <Link
              className="text-muted-foreground text-xs"
              href="/home/settings"
            >
              Add New Tags in Settings
            </Link>
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
