import Journal from '@/components/journal/home/entries/journal-entries';
import Filters from '@/components/journal/home/filters/filters';
import UserDetails from '@/components/journal/home/user-details';
import { createClient } from '@/utils/supabase/server';
import React from 'react';
export default async function AppHome() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get User's Entries, Goals, and Tags concurrently
  const [
    { data: entries, error: entriesError },
    { data: goals, error: goalsError },
    { data: tags, error: tagsError },
  ] = await Promise.all([
    supabase.from('entries').select('*').eq('user_id', user?.id),
    supabase.from('goals').select('*').eq('user_id', user?.id),
    supabase.from('tags').select('*').eq('user_id', user?.id),
  ]);

  // Handle potential errors
  if (entriesError || goalsError || tagsError) {
    console.error(
      'Error fetching data:',
      entriesError || goalsError || tagsError
    );
    // Add additional error handling as needed
  } else {
    console.log('Entries:', entries);
    console.log('Goals:', goals);
    console.log('Tags:', tags);
  }

  return (
    <main className="flex-1 flex flex-col overflow-y-scroll ">
      <div className="flex  flex-1 gap-4 flex-col lg:flex-row overflow-y-scroll">
        <section className="w-full md:w-3/12 space-y-4 ">
          {goals && tags && <UserDetails goals={goals} tags={tags} />}
          {goals && tags && <Filters goals={goals} tags={tags} />}
        </section>
        <section className="w-full md:w-9/12 flex-1 space-y-4 overflow-y-scroll">
          <Journal userID={user?.id} />
        </section>
      </div>
    </main>
  );
}
