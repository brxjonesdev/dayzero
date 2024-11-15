'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader } from "@/components/shadcn/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/shadcn/ui/dropdown-menu"
import { EllipsisVertical, Pin, PinOff } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/shadcn/ui/button'
import { Badge } from '@/components/shadcn/ui/badge'
import MoodGrid from './grid'
import router from 'next/router'
import { createClient } from '@/utils/supabase/client'

type Tag = {
  id: number
  created_at: string
  user_id: string
  label: string
  value: string | null
  tag_id: string
}

type Entry = {
  goal_id: string
  date: string
  content: string
  mood: string
  goal: {
    id: number
    title: string
    goal_id: string
    user_id: string
    created_at: string
    description: string
  }
  tags: Tag[]
  pinned: boolean
  user_id: string
}

export default function Journal({ userID }: { userID: string }) {
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [entries, setEntries] = useState<Entry[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([])

  const moodColors = {
    ecstatic: "bg-yellow-300 hover:bg-yellow-400",
    happy: "bg-green-300 hover:bg-green-400",
    content: "bg-blue-300 hover:bg-blue-400",
    hopeful: "bg-teal-300 hover:bg-teal-400",
    neutral: "bg-gray-300 hover:bg-gray-400",
    anxious: "bg-orange-300 hover:bg-orange-400",
    frustrated: "bg-red-300 hover:bg-red-400",
    sad: "bg-indigo-300 hover:bg-indigo-400",
    lonely: "bg-purple-300 hover:bg-purple-400",
    angry: "bg-pink-300 hover:bg-pink-400",
    overwhelmed: "bg-amber-300 hover:bg-amber-400",
    exhausted: "bg-rose-300 hover:bg-rose-400",
  };
  

  useEffect(() => {
    // Simulating fetching entries and tags from an API
    const fetchDatabase = async () => {
      const { data: entries, error: entryError } = await supabase
        .from('entries')
        .select('*, goal:goals(*)')
        .eq('user_id', userID)
      if (entryError) {
        console.error('Error fetching entries:', entryError)
        return
      }
      setEntries(entries)

      const { data: tags, error: tagError } = await supabase
        .from('tags')
        .select('*')
      if (tagError) {
        console.error('Error fetching tags:', tagError)
        return
      }
      setTags(tags)
    }
    fetchDatabase()
  }, [supabase, userID])

  useEffect(() => {
    const selectedTags = searchParams.getAll('tag')
    const selectedGoal = searchParams.get('goal')
    const date = searchParams.get('date') // date=2024-02-01
    const mood = searchParams.get('mood') // mood=happy
  
    const filtered = entries.filter(entry => {
      const tagMatch =
        selectedTags.length === 0 ||
        (entry.tags && entry.tags.some(tag => selectedTags.includes(tag.tag_id))) // Check if tags exist before calling .some()
      const goalMatch = !selectedGoal || entry.goal.goal_id === selectedGoal
      const dateMatch = !date || format(new Date(entry.date), 'yyyy-MM-dd') === date
      const moodMatch = !mood || entry.mood === mood
      return tagMatch && goalMatch && dateMatch && moodMatch
    })
    setFilteredEntries(filtered)
  }, [entries, searchParams])

  const togglePin = (entryGoalId: string) => {
    setEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.goal.goal_id === entryGoalId ? { ...entry, pinned: !entry.pinned } : entry
      )
    )
  }

  return (
    <section className='flex w-full gap-4 flex-1'>
      <div className='w-4/6 space-y-4 overflow-y-scroll h-[calc(100vh-6rem)] pr-4 flex flex-col'>
        <h2 className='font-unbounded text-lg font-bold'>Your Journal</h2>
        {filteredEntries.map((entry) => (
          <Card className="mb-4" key={entry.goal.goal_id}>
            <CardHeader className="pb-0 font-onest">
              <div className="text-xs border-b pb-2 flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{format(new Date(entry.date), 'PPpp')}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-3 h-3 rounded-full ${moodColors[entry.mood] || 'bg-gray-500'}`} />
                    <p className="capitalize">{entry.mood}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:bg-accent hover:text-accent-foreground rounded-full p-1">
                      <EllipsisVertical className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent hover:text-accent-foreground rounded-full"
                    onClick={() => togglePin(entry.goal.goal_id)}
                  >
                    {entry.pinned ? <PinOff className="h-5 w-5" /> : <Pin className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 py-4 pt-0 font-onest">
              <p className="border-b py-4">{entry.content}</p>
              <div className="space-y-2 font-onest">
                <div className="flex flex-wrap gap-2 items-center">
                  <p className="text-sm font-semibold">Goal</p>
                  <Badge variant="outline" className=''>{entry.goal.title}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <p className="text-sm font-semibold">Tags:</p>
                  {entry.tags && entry.tags.length > 0 ? (
                    entry.tags.map((tag) => (
                      <Badge key={tag.id} variant="secondary" className='bg-cyan-500 dark:bg-fuchsia-500 text-black'>
                        {tags.find(t => t.tag_id === tag.tag_id)?.label ?? 'No Label'}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No tags</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredEntries && !filteredEntries.length && (
          <div className='bg-black/10 dark:bg-white/10 rounded-3xl flex-1 flex items-center justify-center flex-col text-muted-foreground'>
            <p className=' font-unbounded text-center'>No entries found</p>
            <Button variant="link" className="text-sm font-onest" onClick={() => {
              router.push(window.location.pathname)
            }}>
              Clear Tags
            </Button>
          </div>
        )}
      </div>
      
      <div className='w-2/6 overflow-y-scroll h-[calc(100vh-6rem)]'>
        <MoodGrid entries={entries} />
      </div>
    </section>
  )
}
