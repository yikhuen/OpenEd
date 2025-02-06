import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">OpenEd</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/practice">Practice</Link>
          <Link href="/leaderboard">Leaderboard</Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

