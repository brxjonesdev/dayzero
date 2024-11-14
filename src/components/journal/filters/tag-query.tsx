import React from 'react';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/shadcn/ui/toggle-group';
import { Label } from '@/components/shadcn/ui/label';
import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';

const tags = [
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'health', label: 'Health' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'finance', label: 'Finance' },
  { value: 'learning', label: 'Learning' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'hobbies', label: 'Hobbies' },
  { value: 'social', label: 'Social' },
  { value: 'other', label: 'Other' },
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'health', label: 'Health' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'finance', label: 'Finance' },
  { value: 'learning', label: 'Learning' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'hobbies', label: 'Hobbies' },
  { value: 'social', label: 'Social' },
  { value: 'other', label: 'Other' },
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'health', label: 'Health' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'finance', label: 'Finance' },
  { value: 'learning', label: 'Learning' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'hobbies', label: 'Hobbies' },
  { value: 'social', label: 'Social' },
  { value: 'other', label: 'Other' },
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'health', label: 'Health' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'finance', label: 'Finance' },
  { value: 'learning', label: 'Learning' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'hobbies', label: 'Hobbies' },
  { value: 'social', label: 'Social' },
  { value: 'other', label: 'Other' },
]


export default function TagQuery() {
  return (
    <div className="font-onest space-y-2 flex justify-center flex-col w-full">
      <div className='flex justify-between items-center w-full'>
      <Label className="">Search By Tags</Label>
      <Button variant={'link'} className="text-xs">
        Clear Tags
      </Button>
      </div>
     
      <ToggleGroup
        className="w-full rounded-xl flex-wrap bg-black/5 py-2 justify-center max-h-48 overflow-y-scroll"
        type="multiple"
      >
        {tags.map((tag) => (
          <ToggleGroupItem key={tag.value} value={tag.value}>
            <Badge className="bg-blue-500">{tag.label}</Badge>
          </ToggleGroupItem>
        ))}
        {!tags.length && (
          <Button className="text-xs mx-auto" variant={'link'}>
            Add Tags
          </Button>
        )}
      </ToggleGroup>
    </div>
  );
}
