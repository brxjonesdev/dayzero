import React from 'react';
import { Label } from '../../shadcn/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select';

export default function GoalQuery() {
  return (
    <div className="font-onest flex flex-col gap-4 justify-center w-full ">
      <Label>Select a Goal</Label>
      <Select>
        <SelectTrigger className="w-full justify-self-center">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent className='font-onest'>
          <SelectItem value="light" className='font-onest'>Light</SelectItem>
          <SelectItem value="dark" className='font-onest'>Dark</SelectItem>
          <SelectItem value="system" className='font-onest'>System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
