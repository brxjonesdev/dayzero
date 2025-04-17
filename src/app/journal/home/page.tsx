"use client"
import useJournal from "@/features/journaling/hooks/useJournal"
import Journal from "@/features/journaling/components/journal-entries"
import { AppSidebar } from "@/shared/components/shadcn/ui/add-sidebar"
import { SidebarInset } from "@/shared/components/shadcn/ui/sidebar"
import MoodGrid from "@/features/reflection/components/moodgrid"
import { Separator } from "@/shared/components/shadcn/ui/separator"

export default function AppHome() {
const {goals, tags, entries} = useJournal()
  return (
    <>
      <AppSidebar tags={tags} goals={goals} /> 
      <SidebarInset className="flex flex-row max-h-dvh">
        <div className="flex-1 flex">
          <Journal entries={entries} goals={goals} tags={tags} />
        </div>
        <Separator orientation="vertical" className="h-full mr-0" />
        <div className="flex-1 overflow-y-scroll max-w-[300px] ">
          <MoodGrid entries={entries} />
        </div>
      </SidebarInset>    
    </>
  )
}
