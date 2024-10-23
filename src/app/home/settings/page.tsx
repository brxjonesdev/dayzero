import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <>
      <section className='container max-w-4xl px-4 '>
        <Button variant={'outline'}>
        <Link href="/home">
            ← Back to Home
        </Link>
        </Button>
      </section>
      <section className="container max-w-4xl p-4 pt-0 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>DayZero</CardTitle>
            <CardDescription>a project made by brxjonesdev</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-sm'>
                DayZero is a project built by brxjonesdev. It is a goal tracking and journaling app
                built for action and reflection. Set goals, track progress, log your daily thoughts,
                monitor your mood, and stay accountable—all in one place.
            </p>

            <p className='text-sm'>
                I love building things that help people. I hope you enjoy using DayZero as much as I enjoyed building it.
            </p>

            <p className='text-sm'>
                You can find my other projects and contact me on my website at <a href="https://portfolio.braxtonjones.dev/" className='text-purple-400'>braxtonjonesdev</a>.
            </p>


          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preset Tags</CardTitle>
            <CardDescription>Manage your preset tags here.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Button className="w-full">Add Tag</Button>
            <section className="space-y-4">
                <p>Tag 1</p>
                <p>Tag 2</p>
                <p>Tag 3</p>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Logout or Delete Your Account.</CardDescription>
            <CardDescription className="font-geist-sans text-xs italic">
              I'll only be a little sad about it...{' '}
            </CardDescription>
          </CardHeader>
          <CardContent className="md:flex gap-4 space-y-4 md:space-y-0">
            <Button className="w-full">Logout</Button>
            <Button className="w-full" variant={'destructive'}>
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
