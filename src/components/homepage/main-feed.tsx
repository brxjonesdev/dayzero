'use client';
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Toggle } from '../ui/toggle';

export default function MainFeed() {
  const [showPinned, setShowPinned] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <section className="w-full container px-4 space-y-4">
      <div>
        <Label>Search</Label>
        <Input
          placeholder="Search for a goal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Toggle pressed={showPinned} onPressedChange={() => setShowPinned(!showPinned)}>
          Toggle Pinned
        </Toggle>
      </div>
    </section>
  );
}
