import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/db"

// GET /api/favorites — returns array of favorited deal IDs for the current user
export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    select: { dealId: true },
  })

  return NextResponse.json({ favoriteIds: favorites.map((f) => f.dealId) })
}

// POST /api/favorites — toggles a favorite; body: { dealId: string }
export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { dealId } = body as { dealId: string }

  if (!dealId || typeof dealId !== "string") {
    return NextResponse.json({ error: "dealId is required" }, { status: 400 })
  }

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_dealId: {
        userId: session.user.id,
        dealId,
      },
    },
  })

  if (existing) {
    // Already favorited — remove it
    await prisma.favorite.delete({
      where: {
        userId_dealId: {
          userId: session.user.id,
          dealId,
        },
      },
    })
    return NextResponse.json({ favorited: false })
  } else {
    // Not yet favorited — add it
    await prisma.favorite.create({
      data: {
        userId: session.user.id,
        dealId,
      },
    })
    return NextResponse.json({ favorited: true })
  }
}
