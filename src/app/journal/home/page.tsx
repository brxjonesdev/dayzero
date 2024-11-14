import AppInfo from '@/components/journal/app-info';
import JournalEntries from '@/components/journal/entries/journal-entries';
import Filters from '@/components/journal/filters/filters';
import UserDetails from '@/components/journal/user-details';
import { createClient } from '@/utils/supabase/server';
import React from 'react';
export default async function AppHome() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
// Get User's Entries, Goals, and Tags concurrently
const [{ data: entries, error: entriesError }, 
  { data: goals, error: goalsError }, 
  { data: tags, error: tagsError }] = await Promise.all([
supabase.from('entries').select('*').eq('user_id', user?.id),
supabase.from('goals').select('*').eq('user_id', user?.id),
supabase.from('tags').select('*').eq('user_id', user?.id)
]);

// Handle potential errors
if (entriesError || goalsError || tagsError) {
console.error('Error fetching data:', entriesError || goalsError || tagsError);
// Add additional error handling as needed
} else {
console.log('Entries:', entries);
console.log('Goals:', goals);
console.log('Tags:', tags);
}

  return (
    <main className="flex-1 flex flex-col">
      <div className="flex overflow-y-scroll  flex-1 gap-4 flex-col lg:flex-row">
        <section className="w-full md:w-3/12 space-y-4 ">
          <UserDetails goals={goals} tags={tags} />
          <Filters goals={goals} tags={tags} />
        </section>
        <section className="w-full md:w-9/12 bg-black/20 h-full ">
        <JournalEntries entries={entries} />
        </section>
      </div>
    </main>
  );
}
