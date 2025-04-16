"use client"
import useJournal from "@/features/journaling/hooks/useJournal"
import Journal from "@/shared/components/journal/home/entries/journal-entries"
import { AppSidebar } from "@/shared/components/shadcn/ui/add-sidebar"
import { SidebarInset } from "@/shared/components/shadcn/ui/sidebar"

export default function AppHome() {
const {goals, tags, entries} = useJournal()
  return (
    <>
      <AppSidebar tags={tags} goals={goals} /> 
      <SidebarInset>
        <Journal entries={entries} goals={goals} tags={tags} />
      </SidebarInset>
      
      
    </>
  )
}
