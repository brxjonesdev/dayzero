'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Goal, Target } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type JournalEntry = {
  id: string;
  userID: string;
  date: string;
  tags: string[];
  mood: string;
  time: string;
  entry: string;
  isPinned: boolean;
};


export default function Page() {
  const [showPinned, setShowPinned] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  // Greeting logic
  let greeting = '';
  const currentHour = new Date().getHours();
  switch (true) {
    case currentHour >= 5 && currentHour < 12:
      greeting = 'Good Morning';
      break;
    case currentHour >= 12 && currentHour < 18:
      greeting = 'Good Afternoon';
      break;
    default:
      greeting = 'Good Evening';
  }

  const sampleJournalEntries: JournalEntry[] = [
    {
      id: '4',
      userID: 'user123',
      date: '2023-10-03',
      mood: 'excited',
      time: '10:00',
      tags: ['work', 'project'],
      entry: 'Started a new project at work, very excited!',
      isPinned: true,
    },
    {
      id: '3',
      userID: 'user123',
      date: '2023-10-03',
      time: '16:00',
      tags: [],
      mood: 'sad',
      entry: 'Feeling a bit down today, not sure why.',
      isPinned: false,
    },

  ];
  
  const groupedEntries = sampleJournalEntries
  .filter((entry) => entry.entry.toLowerCase().includes(searchQuery.toLowerCase()))
  .reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {});

  return (
    <>
      <section className="w-full container px-4 ">
        {/* User Details */}
        <Card className="w-full flex flex-col md:flex-row md:justify-between md:pr-4">
          <CardHeader className="flex flex-row items-center gap-4">
            <div>
              <Link href="/home/settings" >
              <div className="w-12 h-12 bg-blue-300 rounded-full" /></Link>
            </div>
            <div>
              <CardTitle>{greeting}, Bae Joo-hyun</CardTitle>
              <CardDescription>Current Longest Streak: 233</CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="md:p-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <Target />
                  Record Progress
                </Button>
               
              </DialogTrigger>
              <DialogContent className='font-geist-sans w-[95%]  rounded-lg flex flex-col'>
                <DialogHeader className='text-left'>
                  <DialogTitle className='font-geist-mono font-bold text-xl'>Record Progress</DialogTitle>
                  <DialogDescription>
                    Record your progress towards your goals. Add a journal entry to
                    reflect on your day.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                
                <Button className="ml-2">
              <Goal />
              Goals
            </Button>
              </DialogTrigger>
              <DialogContent className='font-geist-sans w-[95%]  rounded-lg flex flex-col'>
                <DialogHeader className='text-left'>
                  <DialogTitle className='font-geist-mono font-bold text-xl'>Your Goals</DialogTitle>
                  <DialogDescription>
                    These are your current goals. You can add, edit, or delete them as needed.<br/>
                    <span className='italic'>All that matters is that you keep moving forward.</span>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </section>

      <section className="w-full container px-4 space-y-4">
        <div>
          <Label>Search</Label>
          <Input placeholder="Search for a goal" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-4">
          <Toggle pressed={showPinned} onPressedChange={() => setShowPinned(!showPinned)}>
            Toggle Pinned
          </Toggle>
          <Dialog>
            <DialogTrigger className="md:hidden" asChild>
              <Button variant="outline">Show Grid</Button>
            </DialogTrigger>
            <DialogContent className="font-geist-sans w-[95%]  rounded-lg h-full max-h-[95%] flex flex-col">
              <DialogHeader className="text-left h-fit">
                <DialogTitle>Grid for your year</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove
                  your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <section className="bg-blue-100 h-full"></section>
            </DialogContent>
          </Dialog>
        </div>
      </section>
      <Separator className="shadow-md" />

      <section className="w-full container px-4 flex-1 md:flex mb-4 gap-6 overflow-y-scroll">
        <div className="h-full bg-blue-200 w-full overflow-y-scroll hidden md:block"></div>
        <div className="w-full space-y-4">
          {showPinned && (
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white font-geist-sans mb-2">
                Pinned Entries
              </h2>
              {sampleJournalEntries
                .filter((entry) => entry.isPinned)
                .map((entry) => (
                  <Card key={entry.id} className="bg-white shadow-md rounded-lg p-0 mb-4 relative">   
                  <Badge className='bg-yellow-200 text-yellow-800 font-bold rounded-full px-2 py-1 text-sm absolute top-2 right-2 hover:bg-yellow-300'>
                    Pinned
                    </Badge>         
                  <CardHeader className='pb-2'>
                    <p className='text-xs'>Posted At {entry.time}</p>
                   <Badge className='rounded-full px-2 py-1  w-fit text-xs'>
                      {entry.mood}
                    </Badge>
                    <div>
                    {entry?.tags.map((tag) => (
                          <Badge key={tag} className="rounded-full px-2 py-1 m-0 w-fit text-xs">
                            #{tag}
                          </Badge>
                        ))}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm md:text-md">{entry.entry}</p>
                  </CardContent>
                </Card>
                ))}
            </div>


          )}

          {Object.keys(groupedEntries).map((date) => (
            <div key={date}>
              <h2 className="text-lg font-bold text-black dark:text-white font-geist-sans mb-2">
                {date}
              </h2>
              {groupedEntries[date].map((entry) => (
                <Card key={entry.id} className="bg-white shadow-md rounded-lg p-0 mb-4 relative">            
                  <CardHeader className='pb-2'>
                    <p className='text-xs'>Posted At {entry.time}</p>
                   <Badge className='rounded-full px-2 py-1  w-fit text-xs'>
                      {entry.mood}
                    </Badge>
                    <div>
                    {entry?.tags.map((tag) => (
                          <Badge key={tag} className="rounded-full px-2 py-1 m-0 w-fit text-xs">
                            #{tag}
                          </Badge>
                        ))}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm md:text-md">{entry.entry}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
