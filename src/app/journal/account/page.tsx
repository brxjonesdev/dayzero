'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/shadcn/ui/card';
import { Input } from '@/components/shadcn/ui/input';
import { Label } from '@/components/shadcn/ui/label';
import { Separator } from '@/components/shadcn/ui/separator';

export default function TagManagement() {
  return (
    <main className="flex-1 flex flex-row font-onest p-6 overflow-y-scroll w-full">
      <div className="w-5/12 flex justify-end pr-12">
        <h2 className="font-unbounded text-2xl font-bold">Settings</h2>
      </div>
      <Separator orientation="vertical" />
      <div className="flex gap-4 h-full overflow-y-scroll w-7/12 px-12">
        <Card className="h-fit w-full ">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input id="label" placeholder="Enter tag label" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <Input id="value" placeholder="Enter tag value" />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
