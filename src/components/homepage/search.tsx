'use client';
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useAppStore } from '@/providers/app-store-provider';

export default function Search() {
  const { searchQuery, setQuery } = useAppStore((state) => state);
  return (
    <div>
      <Label>Search</Label>
      <Input
        placeholder="Search for a goal"
        value={searchQuery}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
