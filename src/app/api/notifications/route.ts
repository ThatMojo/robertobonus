import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/db"

// GET /api/notifications — returns recent 20 notifications and unread count
export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const [notifications, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.notification.count({
      where: { userId: session.user.id, isRead: false },
    }),
  ])

  return NextResponse.json({ notifications, unreadCount })
}

// PATCH /api/notifications — mark one or all as read
// Body: { id: string } or { all: true }
export async function PATCH(req: Request) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json() as { id?: string; all?: boolean }

  if (body.all === true) {
    await prisma.notification.updateMany({
      where: { userId: session.user.id, isRead: false },
      data: { isRead: true },
    })
    return NextResponse.json({ success: true })
  }

  if (body.id && typeof body.id === "string") {
    await prisma.notification.updateMany({
      where: { id: body.id, userId: session.user.id },
      data: { isRead: true },
    })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: "Provide id or all:true" }, { status: 400 })
}
