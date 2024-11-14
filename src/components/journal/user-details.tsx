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
import { Filter, MenuSquare, Plus } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import {User} from "@/utils/supabase/types"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover"


export default async function UserDetails() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
 const User: User | null = user;
  const name = 'Irene';
  const greeting = 'Good Afternoon,';
  return (
    <Card className="font-onest w-full">
      <CardHeader className="flex-row items-center gap-2">
        <Avatar>
          <AvatarImage src={User?.user_metadata.avatar_url} />
          <AvatarFallback>
            {User?.user_metadata.name?.charAt(0) || name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <CardTitle>
            {greeting} {User?.user_metadata.name || name}
          </CardTitle>
          <CardDescription>What will you accomplish today?</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="gap-4 flex-col lg:flex-row">
        <Button className="w-full">
          <Plus />
          Add Journal Entry
        </Button>
        <div className='w-full flex gap-4 justify-end lg:block'>
          <Button className='hidden lg:block w-full'>Desktop Function</Button>
          <Button className='lg:hidden w-fit px-7'><MenuSquare/></Button>
          <Popover>
  <PopoverTrigger asChild>
    <Button className='lg:hidden w-fit'>Filters <Filter/></Button>
  </PopoverTrigger>
  <PopoverContent className='w-full'>Place content for the popover here.</PopoverContent>
</Popover>


        </div>
        
      </CardFooter>
      
    </Card>
  );
}
