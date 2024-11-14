import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card';

export default function AppInfo() {
  return (
    <Card className="w-4/6 font-onest flex">
      <CardHeader>
        <CardTitle>Your Goals & Streaks</CardTitle>
        <CardDescription>3 Goals In Progress</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <p>Streaks</p>
      </CardContent>
    </Card>
  );
}
