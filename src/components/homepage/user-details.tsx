'use client';
import React from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Goal, Target } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppStore } from '@/providers/app-store-provider';
import RecordProgress from './record-progress';
import Goals from './goals';

export default function UserDetails() {
  const { profile_image, full_name } = useAppStore((state) => state);
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
  return (
    <Card className="w-full flex flex-col md:flex-row md:justify-between md:pr-4">
      <CardHeader className="flex flex-row items-center gap-4">
        <div>
          <Link href="/home/settings">
            <Avatar className="w-12 h-12">
              <AvatarImage src={profile_image} />
              <AvatarFallback>{full_name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className="space-y-1">
          <CardTitle>
            {greeting}, {full_name}
          </CardTitle>
          <CardDescription>What will you accomplish today?</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="md:p-0">
        <RecordProgress />
        <Goals />
      </CardFooter>
    </Card>
  );
}
