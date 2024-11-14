import React from 'react';
import { Label } from '../shadcn/ui/label';
import { Toggle } from '../shadcn/ui/toggle';
import { Grid, Pin } from 'lucide-react';

export default function GridToggle() {
  return (
    <div className="font-onest flex flex-col gap-4 justify-center w-1/12 ">
      <Label>Toggle Grid</Label>
      <Toggle className="bg-sky-300 dark:bg-purple-300">
        <Grid />
      </Toggle>
    </div>
  );
}
