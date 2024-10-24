'use client';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/providers/app-store-provider';
import { EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

{
  /*
  export type Entry = {
  id: string;
  date: string;
  goal_id: string;
  tags: Tag[];
  notes: {
    content: string;
    created_at: string;
  }[];
  isPinned: boolean;
};
  
  */
}

export default function Entries() {
  const { showPinned, entries } = useAppStore((state) => state);

  function formatTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });
  }

  return (
    <div className="w-full space-y-4">
      {showPinned && (
        <div>
          <h2 className="text-lg font-bold text-black dark:text-white font-geist-sans mb-2">
            Pinned Entries
          </h2>
        </div>
      )}
      {entries.map((entry) => (
        <section key={entry.id}>
          <h3 className="font-geist-mono text-md mb-3">{formatDate(entry.date)}</h3>
          {entry.notes.map((note, index) => (
            <Card key={index} className="mb-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs">{formatTime(entry.date)}</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:bg-black/20  dark:hover:bg-white/20 rounded-full py-1">
                      <EllipsisVertical className="h-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="font-geist-mono">
                      <DropdownMenuLabel className="font-geist-sans">My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                      <DropdownMenuItem>Pin</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h4 className="font-geist-mono text-sm md:text-md">{note.content}</h4>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap">
                  {entry.tags.map((tag) => (
                    <Badge key={tag.id} className="mr-2" color={tag.hex_color}>
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      ))}
    </div>
  );
}
