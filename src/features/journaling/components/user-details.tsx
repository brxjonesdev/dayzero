import React from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/shadcn/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/shadcn/ui/avatar';
import AddEntryButton from '@/features/journaling/components/add-entry-dialog';
import MobileFilters from '@/shared/components/journal/home/filters/mobile-filter';
import { Goal, Tag } from '@/utils/types';

export default async function UserDetails({
  goals,
  tags,
}: {
  goals: Goal[];
  tags: Tag[];
}) {
  const avatar_url ="https://avatars.githubusercontent.com/u/1120147?v=4"; // Replace with actual avatar URL
  const name = "Irene"; // Replace with actual user name
  const greeting = "Hello"; // Replace with actual greeting message
  const id = "user-id"; // Replace with actual user ID
  

  return (
    <Card className="font-onest w-full">
      <CardHeader className="flex-row items-center m-0 gap-4">
        <Avatar>
          <AvatarImage src={avatar_url} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className="space-y-3 h-full flex flex-col justify-between m-0">
          <CardTitle className='text-lg'>
            {greeting} Irene
          </CardTitle>
          <CardDescription className='m-0 text-xs'>What will you accomplish today?</CardDescription>
        </div>
        
      </CardHeader>
      <CardFooter className="gap-4 flex-col lg:flex-row ">
        <AddEntryButton user_id={id} tags={tags} goals={goals} />
        <div className="w-full flex gap-4 justify-end lg:hidden">
          <MobileFilters goals={goals} tags={tags} />
        </div>
      </CardFooter>
    </Card>
  );
}
