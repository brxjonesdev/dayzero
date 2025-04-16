import { ModeToggle } from "../shadcn/ui/mode-toggle"

export default function LandingHeader() {
  return (
    <header className="py-4 flex flex-col">
      <div className="justify-between flex w-full">
        <h1 className="text-3xl font-bold font-heading dark:text-white ">Tenuto</h1>
        <div className="flex gap-4 items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
