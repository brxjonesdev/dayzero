import { Card, CardFooter, CardHeader } from "@/shared/components/shadcn/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/shadcn/ui/avatar"
import AddEntryButton from "@/features/journaling/components/add-entry-dialog"
import type { Goal, Tag } from "@/utils/types"

export default function UserDetails({
  goals,
  tags,
}: {
  goals: Goal[]
  tags: Tag[]
}) {
  const avatar_url = "https://avatars.githubusercontent.com/u/1120147?v=4"
  const name = "Irene"
  const greeting = "Hello"
  const id = "user-id"

  return (
    <Card className="font-onest w-full border-0 shadow-sm p-4 space-y-4">
      <CardHeader className="flex-row items-center justify-between gap-4 p-0 m-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarImage src={avatar_url || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-base font-semibold leading-none font-heading">
              {greeting}, {name}
            </h2>
            <p className="text-xs text-muted-foreground font-body">What will you accomplish today?</p>
          </div>
        </div>
      </CardHeader>
      <CardFooter className=" flex flex-col sm:flex-row gap-3 items-center p-0">
        <AddEntryButton user_id={id} tags={tags} goals={goals} />
      </CardFooter>
    </Card>
  )
}
