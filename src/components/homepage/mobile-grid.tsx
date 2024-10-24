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

export default function MobileGrid() {
  return (
    <Dialog>
      <DialogTrigger className="md:hidden" asChild>
        <Button variant="outline">Show Grid</Button>
      </DialogTrigger>
      <DialogContent className="font-geist-sans w-[95%]  rounded-lg h-full max-h-[95%] flex flex-col">
        <DialogHeader className="text-left h-fit">
          <DialogTitle>Grid for your year</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
        <section className="bg-blue-100 h-full"></section>
      </DialogContent>
    </Dialog>
  );
}
