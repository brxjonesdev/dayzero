import React from 'react';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/shadcn/ui/toggle-group';
import { Label } from '@/components/shadcn/ui/label';
import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';
import Link from 'next/link';

type Tag = {
  id: string;
  created_at: string;
  user_id: string;
  label: string;
  value: string;
  tag_id: string;
};

type Tags = Tag[];

export default function TagQuery({ tags }: { tags: Tags }) {
  return (
    <div className="font-onest space-y-2 flex justify-center flex-col w-full">
      <div className="flex justify-between items-center w-full">
        <Label className="">Search By Tags</Label>
        <Button variant={'link'} className="text-xs">
          Clear Tags
        </Button>
      </div>

      <ToggleGroup
        className="w-full rounded-xl flex-wrap bg-black/5 py-2 justify-center max-h-64 overflow-y-scroll"
        type="multiple"
      >
        {tags.map((tag) => (
          <ToggleGroupItem key={tag.value} value={tag.value}>
            <Badge className="bg-cyan-500 dark:bg-fuchsia-500">
              {tag.label}
            </Badge>
          </ToggleGroupItem>
        ))}
        {!tags.length && (
          <Link className="text-xs mx-auto" href={"/journal/tags"}>
            Add Tags
          </Link>
        )}
      </ToggleGroup>
    </div>
  );
}