import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AboutSelf from '@/components/settings/self';
import CustomTags from '@/components/settings/custom-tags';
import AccountSettings from '@/components/settings/account-settings';

export default function SettingsPage() {
  return (
    <>
      <section className="container max-w-4xl px-4 ">
        <Button variant={'outline'}>
          <Link href="/home">← Back to Home</Link>
        </Button>
      </section>
      <section className="container max-w-4xl p-4 pt-0 space-y-4">
        <AboutSelf />
        <CustomTags />
        <AccountSettings />
      </section>
    </>
  );
}
