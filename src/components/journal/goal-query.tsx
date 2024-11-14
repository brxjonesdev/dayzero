import React from 'react';
import { Label } from '../shadcn/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select';

export default function GoalQuery() {
  return (
    <div className="font-onest flex flex-col gap-4 justify-center w-3/12 ">
      <Label>Select a Goal</Label>
      <Select>
        <SelectTrigger className="w-full justify-self-center">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
