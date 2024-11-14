import React from 'react';
import { Grid } from 'lucide-react';
import { Toggle } from '@/components/shadcn/ui/toggle';

export default function GridToggle() {
  return (
    <Toggle className="bg-cyan-300 dark:bg-fuchsia-400 w-full">
      Show Grid <Grid />
    </Toggle>
  );
}
