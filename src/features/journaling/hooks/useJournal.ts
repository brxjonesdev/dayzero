"use client"
import { Entry, Goal, Tag } from '@/utils/types'
import React from 'react'

export default function useJournal() {
const [entries, setEntries] = React.useState<Entry[]>([
    // {
    //     id: '1',
    //     title: 'Sample Entry',
    //     content: 'This is a sample journal entry.',
    //     date: new Date().toISOString(),
    //     tags: [],
    // },
])
const [goals, setGoals] = React.useState<Goal[]>([])
const [tags, setTags] = React.useState<Tag[]>([])

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
