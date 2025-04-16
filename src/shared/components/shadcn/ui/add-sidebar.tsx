import type * as React from "react"
import {Settings } from "lucide-react"

import Filters from "@/features/filtering/components/filters"
import UserDetails from "@/features/journaling/components/user-details"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/shared/components/shadcn/ui/sidebar"
import MoodGrid from "../../../../features/reflection/components/moodgrid"

export function AppSidebar({
  tags,
  goals,
  ...props
}: {
  tags: any[]
  goals: any[]
} & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="left" {...props} >
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
          <UserDetails goals={goals} tags={tags} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Filters</SidebarGroupLabel>
          <SidebarGroupContent>
            <Filters tags={tags} goals={goals} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
