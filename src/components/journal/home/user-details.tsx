import React from 'react';
import {
  Card,
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
import { createClient } from '@/utils/supabase/server';
import AddEntryButton from '../utils/add-entry';
import MobileFilters from './filters/mobile-filter';
import { Goal, Tag } from '@/utils/types';

export default async function UserDetails({
  goals,
  tags,
}: {
  goals: Goal[];
  tags: Tag[];
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const greeting =
    new Date().getHours() < 12 ? 'Good Morning,' : 'Good Afternoon,';

  return (
    <Card className="font-onest w-full">
      <CardHeader className="flex-row items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.user_metadata.avatar_url} />
          <AvatarFallback>{user?.user_metadata.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <CardTitle>
            {greeting} {user?.user_metadata.name || name}
          </CardTitle>
          <CardDescription>What will you accomplish today?</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="gap-4 flex-col lg:flex-row ">
        <AddEntryButton user_id={user?.id} tags={tags} goals={goals} />
        <div className="w-full flex gap-4 justify-end lg:hidden">
          <MobileFilters goals={goals} tags={tags} />
        </div>
      </CardFooter>
    </Card>
  );
}
