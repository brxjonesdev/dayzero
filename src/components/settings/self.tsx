import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutSelf() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>DayZero</CardTitle>
        <CardDescription>a project made by brxjonesdev</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">
          DayZero is a project built by brxjonesdev. It is a goal tracking and journaling app built
          for action and reflection. Set goals, track progress, log your daily thoughts, monitor
          your mood, and stay accountable—all in one place.
        </p>

        <p className="text-sm">
          I love building things that help people. I hope you enjoy using DayZero as much as I
          enjoyed building it.
        </p>

        <p className="text-sm">
          You can find my other projects and contact me on my website at{' '}
          <a href="https://portfolio.braxtonjones.dev/" className="text-purple-400">
            braxtonjonesdev
          </a>
          .
        </p>
      </CardContent>
    </Card>
  );
}
