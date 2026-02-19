import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/db"

// GET /api/points/daily — check if daily bonus is already claimed today
export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { lastDailyLogin: true, points: true },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const today = new Date().toISOString().slice(0, 10)
  const lastClaim = user.lastDailyLogin
    ? user.lastDailyLogin.toISOString().slice(0, 10)
    : null

  return NextResponse.json({
    claimed: lastClaim === today,
    points: user.points,
  })
}

// POST /api/points/daily — claim daily login bonus (50 points)
export async function POST() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { lastDailyLogin: true, points: true },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Check if already claimed today (UTC date comparison)
  const today = new Date().toISOString().slice(0, 10)
  const lastClaim = user.lastDailyLogin
    ? user.lastDailyLogin.toISOString().slice(0, 10)
    : null

  if (lastClaim === today) {
    return NextResponse.json(
      { error: "Already claimed today", claimed: true },
      { status: 400 }
    )
  }

  // Award 50 points
  const now = new Date()

  const [updatedUser] = await prisma.$transaction([
    prisma.user.update({
      where: { id: session.user.id },
      data: {
        points: { increment: 50 },
        lastDailyLogin: now,
      },
      select: { points: true },
    }),
    prisma.pointsLog.create({
      data: {
        userId: session.user.id,
        amount: 50,
        reason: "daily_login",
      },
    }),
  ])

  return NextResponse.json({
    success: true,
    claimed: true,
    pointsAwarded: 50,
    totalPoints: updatedUser.points,
  })
}
