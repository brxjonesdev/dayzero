'use client';

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/shadcn/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/shadcn/ui/accordion';
import { Button } from '@/shared/components/shadcn/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';
import TagQuery from './tag-query';
import GoalQuery from './goal-query';
import MoodQuery from './mood-query';
import { Goal, Tag } from '@/utils/types';

export default function MobileFilters({
  tags,
  goals,
}: {
  tags: Tag[];
  goals: Goal[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="font-onest lg:overflow-y-scroll lg:h-fit w-full">
      <CardHeader
        className="flex flex-row items-center justify-between py-2 lg:py-4 cursor-pointer lg:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="text-lg">Filters</CardTitle>
        <Button variant="ghost" size="sm" className="lg:hidden">
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent
        className={`space-y-4 ${isOpen ? 'block' : 'hidden'} lg:block`}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="tags">
            <AccordionTrigger>Tags</AccordionTrigger>
            <AccordionContent>
              <TagQuery tags={tags} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="goals">
            <AccordionTrigger>Goals</AccordionTrigger>
            <AccordionContent>
              <GoalQuery goals={goals} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="mood">
            <AccordionTrigger>Mood</AccordionTrigger>
            <AccordionContent>
              <MoodQuery />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
