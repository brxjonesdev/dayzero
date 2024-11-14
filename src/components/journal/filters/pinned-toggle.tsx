import React from 'react';
import { Pin } from 'lucide-react';
import { Label } from '@/components/shadcn/ui/label';
import { Toggle } from '@/components/shadcn/ui/toggle';
export default function PinnedToggle() {
  return (
    <Toggle className="bg-cyan-300 dark:bg-fuchsia-400 w-full">
      Show Pinned <Pin />
    </Toggle>
  );
}
