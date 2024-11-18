'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/shadcn/ui/toggle-group';
import { Label } from '@/components/shadcn/ui/label';
import { Badge } from '@/components/shadcn/ui/badge';
import Link from 'next/link';
import { Tag } from '@/utils/types';

export default function Component({ tags }: { tags: Tag[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Function to update URL with selected tags
  const updateTagsInUrl = (selectedTags: string[]) => {
    const params = new URLSearchParams(searchParams);
    params.delete('tag'); // Remove existing tag params
    selectedTags.forEach((tag) => params.append('tag', tag));
    router.push(`?${params.toString()}`);
  };

  // Get currently selected tags from URL
  const selectedTags = searchParams.getAll('tag');

  // Handle tag selection
  const handleTagSelection = (values: string[]) => {
    updateTagsInUrl(values);
  };

  return (
    <div className="font-onest space-y-2 flex justify-center flex-col w-full">
      {tags.length > 0 && (
        <>
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
        </>
      )}
    </div>
  );
}
