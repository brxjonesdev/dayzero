import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';

export default function CustomTags() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preset Tags</CardTitle>
        <CardDescription>Manage your preset tags here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full">Add Tag</Button>
        <section className="space-y-4">
          <p>Tag 1</p>
          <p>Tag 2</p>
          <p>Tag 3</p>
        </section>
      </CardContent>
    </Card>
  );
}
