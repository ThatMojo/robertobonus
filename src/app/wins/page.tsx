import type { Metadata } from "next"
import { ImageIcon } from "lucide-react"
import ComingSoon from "@/components/shared/ComingSoon"

export const metadata: Metadata = {
  title: "Win Gallery",
  description: "Community win screenshots and big win highlights are coming soon.",
}

export default function WinsPage() {
  return (
    <ComingSoon
      title="Win Gallery"
      description="Share your biggest wins with the community. Screenshots, highlights, and leaderboard entries — all coming soon!"
      icon={<ImageIcon className="w-8 h-8 text-purple-400" />}
    />
  )
}
