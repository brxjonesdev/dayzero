import React from 'react';
import LoginButton from './login-button';
import AboutDayZero from './about-dayzero';
import { createClient } from '@/utils/supabase/server';
import LoggedInButton from './logged-button';

export default async function LandingHero() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user, 'user');

  return (
    <section className="bg-gradient-to-t from-cyan-200 to-cyan-500 dark:from-fuchsia-600 dark:to-pink-600 text-white rounded-3xl">
      <div className="container mx-auto px-4 py-4 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-6xl font-bold mb-6 font-unbounded">
          Start Your Journey from Day Zero
        </h1>
        <p className="text-md md:text-2xl mb-8 max-w-2xl font-onest ">
          Embrace your journey to self-improvement, beginning from Day Zero.
          Journal your thoughts, track your mood, and set goals to build the
          life you envision—one day at a time.
        </p>
        <div className="flex gap-4">
          {user !== null ? <LoggedInButton /> : <LoginButton />}
          <AboutDayZero />
        </div>
      </div>
    </section>
  );
}
