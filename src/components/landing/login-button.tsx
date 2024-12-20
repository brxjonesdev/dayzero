'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../shadcn/ui/button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function LoginButton() {
  const router = useRouter();
  const supabase = createClient();
  const provider = 'google';
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `https://dayzero-ttsl.netlify.app/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('Error logging in:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase.auth.getUser();

      // Use the Supabase `User` type for userData?.user
      setUser(userData?.user ?? null);

      console.log(userData?.user, 'user');
    };

    fetchData();
  }, [supabase]);

  return (
    <div className="w-full">
      {user ? (
        <Button
          className="font-onest text w-full"
          onClick={() => router.push('/journal/home')}
        >
          Go to Journal
        </Button>
      ) : (
        <Button className="font-onest text w-full" onClick={handleLogin}>
          Login to DayZero
        </Button>
      )}
    </div>
  );
}
