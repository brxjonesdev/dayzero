import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card';

export default function AppInfo() {
  return (
    <Card className="w-full font-onest hidden lg:flex flex-col">
      <CardHeader>
        <CardTitle>Your Goals & Streaks</CardTitle>
        <CardDescription>3 Goals In Progress</CardDescription>
      </CardHeader>
      {/* <CardContent className="p-6">
        <p>Streaks</p>
      </CardContent> */}
    </Card>
  );
}
