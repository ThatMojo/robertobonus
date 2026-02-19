"use server"

import { prisma } from "@/lib/db"

export type LeaderboardUser = {
  rank: number
  id: string
  name: string
  points: number
  referralCount: number
  createdAt: Date
}

export async function getLeaderboard(): Promise<LeaderboardUser[]> {
  const users = await prisma.user.findMany({
    where: {
      points: { gt: 0 },
    },
    orderBy: { points: "desc" },
    take: 50,
    select: {
      id: true,
      name: true,
      email: true,
      points: true,
      referralCode: true,
      createdAt: true,
    },
  })

  // Fetch referral counts: count users whose referredBy matches each user's referralCode
  const referralCounts = await prisma.user.groupBy({
    by: ["referredBy"],
    where: {
      referredBy: {
        in: users.map((u) => u.referralCode),
      },
    },
    _count: { referredBy: true },
  })

  const referralMap = new Map<string, number>()
  for (const row of referralCounts) {
    if (row.referredBy) {
      referralMap.set(row.referredBy, row._count.referredBy)
    }
  }

  return users.map((user, index) => ({
    rank: index + 1,
    id: user.id,
    name: user.name ?? user.email.split("@")[0],
    points: user.points,
    referralCount: referralMap.get(user.referralCode) ?? 0,
    createdAt: user.createdAt,
  }))
}
