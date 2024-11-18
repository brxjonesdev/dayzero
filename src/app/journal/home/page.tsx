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

  const fetchUserData = async () => {
    try {
      const [
        { data: goals, error: goalsError },
        { data: tags, error: tagsError },
        { data: entries, error: entriesError },
      ] = await Promise.all([
        supabase.from('goals').select('*').eq('user_id', user?.id),
        supabase.from('tags').select('*').eq('user_id', user?.id),
        supabase
          .from('entries')
          .select(
            `
            *,
            goal:goals (*),
            tags:entry_tags (tag:tags (*))
          `
          )
          .eq('user_id', user?.id)
          .order('date', { ascending: false }),
      ]);

      if (goalsError) console.error('Error fetching goals:', goalsError);
      if (tagsError) console.error('Error fetching tags:', tagsError);
      if (entriesError) console.error('Error fetching entries:', entriesError);

      return { goals, tags, entries };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return { goals: [], tags: [], entries: [] };
    }
  };

  const { goals, tags, entries } = await fetchUserData();

  return (
    <main className="flex-1 flex flex-col ">
      <div className="flex  flex-1 gap-4 flex-col lg:flex-row ">
        <section className="w-full lg:w-3/12 space-y-4   ">
          {goals && tags && <UserDetails goals={goals} tags={tags} />}
          {goals && tags && <Filters goals={goals} tags={tags} />}
        </section>
        <section className="w-full xl:w-9/12 flex-1 space-y-4 ">
          <Journal
            entries={entries ?? []}
            goals={goals ?? []}
            tags={tags ?? []}
          />
        </section>
      </div>
    </main>
  );
}
