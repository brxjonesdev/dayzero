'use client'

import React, { useState, useMemo } from 'react'
import { format, startOfYear, eachMonthOfInterval, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns'
import { useAppStore } from '@/providers/app-store-provider'
import { Button } from '../ui/button'

type Tag = {
  id: string;
  name: string;
}

type Entry = {
  id: string;
  date: string;
  goal_id: string;
  feeling: number
  tags: Tag[];
  notes: {
    content: string;
    created_at: string;
  }[];
  isPinned: boolean;
};


export default function MoodGrid() {
  const { entries } = useAppStore((state) => state)
  const [year, setYear] = useState(new Date().getFullYear())

  const months = useMemo(() => {
    const startDate = startOfYear(new Date(year, 0, 1))
    return eachMonthOfInterval({ start: startDate, end: new Date(year, 11, 31) })
  }, [year])

  const entryColor = 'bg-blue-400 dark:bg-purple-600'
  const noEntryColor = 'bg-gray-100 dark:bg-gray-700'

  const getColorForDay = (date: Date) => {
    const entry = entries.find(e => isSameDay(new Date(e.date), date))
    return entry ? entryColor : noEntryColor
  }


  return <div className="h-full w-full overflow-y-scroll hidden md:block">
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 gap-8">
        <h2 className="text-xl md:text-2xl font-bold">{year}</h2>
        <div className='flex gap-3'>
          <Button 
            onClick={() => setYear(year - 1)}
            className="text-xs"
            variant={"outline"}
          >
            Previous
          </Button>
          <Button 
            onClick={() => setYear(year + 1)}
            className="text-xs"
            variant={"outline"}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {months.map((month) => (
          <div key={month.toString()} className="border rounded-md p-2">
            <h3 className="text-base md:text-lg font-semibold mb-2">{format(month, 'MMMM')}</h3>
            <div className="grid grid-cols-7 gap-1">
              {eachDayOfInterval({ start: month, end: new Date(year, month.getMonth() + 1, 0) }).map((day) => (
                <div
                  key={day.toString()}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-4 h-4 md:w-6 md:h-6 ${
                      isSameMonth(day, month) ? getColorForDay(day) : 'bg-white'
                    } rounded-sm`}
                  ></div>
                  <span className="text-[0.5rem] md:text-xs mt-1">
                    {format(day, 'd')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>;
}






