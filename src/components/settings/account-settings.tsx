import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';

export default function AccountSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Logout or Delete Your Account.</CardDescription>
        <CardDescription className="font-geist-sans text-xs italic">
          I&apos;ll only be a little sad about it...{' '}
        </CardDescription>
      </CardHeader>
      <CardContent className="md:flex gap-4 space-y-4 md:space-y-0">
        <Button className="w-full">Logout</Button>
        <Button className="w-full" variant={'destructive'}>
          Delete Account
        </Button>
      </CardContent>
    </Card>
  );
}
