'use client';
import React from 'react';
import { Toggle } from '../ui/toggle';
import { useAppStore } from '@/providers/app-store-provider';

export default function PinnedToggle() {
  const { showPinned, togglePinned } = useAppStore((state) => state);
  return (
    <Toggle pressed={showPinned} onPressedChange={() => togglePinned()}>
      Toggle Pinned
    </Toggle>
  );
}
