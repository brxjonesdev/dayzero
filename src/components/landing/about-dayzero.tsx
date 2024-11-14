'use client';
import React from 'react';
import { Button } from '../shadcn/ui/button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AboutDayZero() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
      return;
    }
    console.log('Logged out successfully');
    router.push('/')
  };
  return <Button className="font-onest" onClick={handleLogout}>About DayZero</Button>;
}
