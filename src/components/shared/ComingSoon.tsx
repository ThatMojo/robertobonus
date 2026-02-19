import Link from "next/link"
import { Construction, ArrowLeft } from "lucide-react"

interface ComingSoonProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export default function ComingSoon({ title, description, icon }: ComingSoonProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-6">
          {icon || <Construction className="w-8 h-8 text-purple-400" />}
        </div>

        <div className="inline-block bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Coming Soon
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
          {title}
        </h1>

        <p className="text-gray-400 mb-8 leading-relaxed">{description}</p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}
