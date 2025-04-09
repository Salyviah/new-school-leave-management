import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export function BackToHome() {
  return (
    <Link href="/">
      <Button variant="outline" size="sm" className="gap-2">
        <Home size={16} />
        <span>Back to Home</span>
      </Button>
    </Link>
  )
}