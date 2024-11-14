import React from 'react';
import { Label } from '../shadcn/ui/label';
import { Select } from '../shadcn/ui/select';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/shadcn/ui/toggle-group';
import { Badge } from '../shadcn/ui/badge';
import { Button } from '../shadcn/ui/button';

export default function TagQuery({ tags = [] }) {
  return (
    <div className="font-onest w-4/12 space-y-2 flex justify-center flex-col">
      <Label className="">Search By Tags</Label>
      <ToggleGroup
        className="w-full rounded-xl flex-wrap bg-black/5 py-2 justify-start"
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
