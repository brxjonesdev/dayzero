import JournalHeader from '@/components/journal/header';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-[96rem] mx-auto px-4 h-dvh flex flex-col">
      <JournalHeader />
      {children}
    </section>
  );
}
