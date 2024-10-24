'use client';
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
import { Goal } from 'lucide-react';
import { useAppStore } from '@/providers/app-store-provider';
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Goals() {
  const { goals } = useAppStore((state) => state);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-2">
          <Goal />
          Goals
        </Button>
      </DialogTrigger>
      <DialogContent className="font-geist-sans w-[95%]  rounded-lg flex flex-col">
        <DialogHeader className="text-left">
          <DialogTitle className="font-geist-mono font-bold text-xl">Your Goals</DialogTitle>
          <DialogDescription>
            These are your current goals. You can add, edit, or delete them as needed.
            <br />
            <span className="italic">All that matters is that you keep moving forward.</span>
          </DialogDescription>
          <Dialog>
            <DialogTrigger>
              <Button className="mt-4 w-full">Add Goal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove
                  your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

            <ScrollArea className="h-[500px] w-full pt-4">
            {goals.length === 0 && (
              <section className="text-center bg-black/10 rounded-md h-full flex items-center justify-center">
                <h2 className="text-sm md:text-md font-geist-mono text-black dark:text-white">
                  You have no goals yet. <br/> Start adding some!
                </h2>
                </section>
            )}
    
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <CardTitle>{goal.title}</CardTitle>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                
                <CardFooter className='gap-3 justify-end'>
                  <Button variant={"ghost"}>Edit</Button>
                    <Button variant={"destructive"}>Delete</Button>
                </CardFooter>
              </Card>
            ))}
            </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
