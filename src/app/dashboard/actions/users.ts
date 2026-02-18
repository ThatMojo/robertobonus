"use server"

import { prisma } from "@/lib/db"

export type DashboardUser = {
  id: string
  name: string | null
  email: string
  role: "USER" | "ADMIN"
  points: number
  referralCode: string
  referredBy: string | null
  createdAt: Date
  _count: { referrals: number }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        points: true,
        referralCode: true,
        referredBy: true,
        createdAt: true,
      },
    })

    // Count referrals for each user (users whose referredBy matches this user's referralCode)
    const usersWithReferrals = await Promise.all(
      users.map(async (user) => {
        const referralCount = await prisma.user.count({
          where: { referredBy: user.referralCode },
        })
        return { ...user, _count: { referrals: referralCount } }
      })
    )

    return usersWithReferrals
  } catch {
    return []
  }
}

export async function updateUserRole(userId: string, role: "USER" | "ADMIN") {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    })
    return { success: true }
  } catch {
    return { success: false, error: "Failed to update role" }
  }
}

export async function updateUserPoints(userId: string, points: number) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { points },
    })
    return { success: true }
  } catch {
    return { success: false, error: "Failed to update points" }
  }
}
