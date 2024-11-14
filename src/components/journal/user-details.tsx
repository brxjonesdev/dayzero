import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/ui/avatar';
import { Button } from '../shadcn/ui/button';
import { Plus } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export default async function UserDetails() {
  
  
  const name = 'Irene';
  const greeting = 'Good Afternoon,';
  return (
    <Card className="font-onest w-2/6">
      <CardHeader className="flex-row items-center gap-2">
        {/* <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <div className="space-y-1">
          <CardTitle>
            {greeting} {name}
          </CardTitle>
          <CardDescription>What will you accomplish today?</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="gap-4">
        <Button className="w-full">
          <Plus />
          Add Journal Entry
        </Button>
        <Button className="w-full">Some other function</Button>
      </CardFooter>
    </Card>
  );
}
