import { Button } from "../shadcn/ui/button"
import Link from "next/link"

export default function LoggedInButton() {
  return (
    <Link href={"/home"}>
      <Button className="font-body text-sm">Open Your Journal</Button>
    </Link>
  )
}
