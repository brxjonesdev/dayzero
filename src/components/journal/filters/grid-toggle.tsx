import React from 'react';
import { Grid} from 'lucide-react';
import { Toggle } from '@/components/shadcn/ui/toggle';

export default function GridToggle() {
  return (
  <Toggle  className="bg-sky-300 dark:bg-purple-300 w-full">Show Grid <Grid/></Toggle>
  );
}
