import { User } from '@/utils/supabase/types';
import React from 'react';
import { Card, CardContent } from '@/components/shadcn/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/ui/avatar';
import Link from 'next/link';

export default function MiniUserData({ user }: Readonly<{ user: User }>) {
  return (
    <Card className="w-full max-w-sm mx-auto  p-0">
      <CardContent className="flex items-center space-x-4 p-1 px-4">
        <Avatar className="h-9 w-10 rounded-2xl">
          <AvatarImage
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.full_name}
          />
          <AvatarFallback>
            {user.user_metadata.full_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-sm font-bold">{user.user_metadata.full_name}</h2>
        <Link href={`/settings/${user.id}`}>
          <p className="text-xs text-muted-foreground font-sans">
            @{user.user_metadata.user_name}
          </p>
        </Link>
      </CardContent>
    </Card>
  );
}
