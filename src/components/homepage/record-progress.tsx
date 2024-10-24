import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Target } from 'lucide-react';

export default function RecordProgress() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <Target />
          Record Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="font-geist-sans w-[95%]  rounded-lg flex flex-col">
        <DialogHeader className="text-left">
          <DialogTitle className="font-geist-mono font-bold text-xl">Record Progress</DialogTitle>
          <DialogDescription>
            Record your progress towards your goals. Add a journal entry to reflect on your day.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
