'use client';
import React from 'react';
import { Button } from '../shadcn/ui/button';
import { createClient } from '@/utils/supabase/client';

export default function LoginButton() {
  const supabase = createClient();
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/journal',
      },
    });
    if (error) {
      console.error('Error logging in:', error.message);
      return;
    }
  };

  // const handleLogout = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     console.error('Error logging out:', error.message);
  //     return;
  //   }
  // };

  return (
    <Button className="font-onest text" onClick={handleLogin}>
      Login to DayZero
    </Button>
  );
}
