
import AppInfo from '@/components/journal/app-info';
import Filters from '@/components/journal/filters/filters';
import UserDetails from '@/components/journal/user-details';
import React from 'react';
export default function AppHome() {
  return (
    <main className="flex-1 flex flex-col">
      <div className='flex overflow-y-scroll  flex-1 gap-4 flex-col lg:flex-row'>
        <section className='w-full md:w-3/12 space-y-4 '>
          <UserDetails/>
          <AppInfo/>
          <Filters/>
        </section>
        <section className='w-full md:w-9/12 bg-black/20 h-full '></section>
      </div>
    </main>
  );
}
