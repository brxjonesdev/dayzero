import React from 'react';
import { Button } from '../shadcn/ui/button';

export default function Reflect() {
  return (
    <Button
      className="
    bg-gradient-to-t from-cyan-200 to-cyan-500 
    dark:from-fuchsia-600 dark:to-pink-600 
      rounded-3xl h-full w-2/12 text-bold font-unbounded text-3xl text-white"
    >
      Reflect
    </Button>
  );
}
