"use client"
import { Entry, Goal, Tag } from '@/utils/types'
import React from 'react'

export default function useJournal() {
  const [entries, setEntries] = React.useState<Entry[]>([{
    id: 0,
    created_at: new Date().toISOString(),
    date: new Date().toISOString(),
    user_id: null,
    content: null,
    mood: "neutral",
    goal_id: null,
    tags: [],
    goal: null
  }])
  const [goals, setGoals] = React.useState<Goal[]>([
    {
        id: 0,
        created_at: new Date().toISOString(),
        goal_id: "default-goal",
        user_id: null,
        title: "Default Goal",
        description: "This is a default goal for demonstration purposes."
    },
    {
        id: 1,
        created_at: new Date().toISOString(),
        goal_id: "another-goal",
        user_id: null,
        title: "Another Goal",
        description: "This is another default goal for demonstration purposes."
    }
  ])
    const [tags, setTags] = React.useState<Tag[]>([
    {
        tag_id: "default-tag",
        created_at: new Date().toISOString(),
        label: "Default Tag",
        user_id: null,
        tag: {
            tag_id: "default-tag",
            created_at: new Date().toISOString(),
            label: "Default Tag",
            user_id: null
        }
    },
    
    {
        tag_id: "another-tag",
        created_at: new Date().toISOString(),
        label: "Another Tag",
        user_id: null,
        tag: {
            tag_id: "another-tag",
            created_at: new Date().toISOString(),
            label: "Another Tag",
            user_id: null
        }
    }
    ])

    // Fetch entries, goals, and tags


    // CRUD for entries

    // CRUD for goals

    // CRUD for tags




    return {
    entries,
    goals,
    tags,
    }
}
