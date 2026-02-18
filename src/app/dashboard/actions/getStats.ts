"use server"

import { prisma } from "@/lib/db"

export type DashboardStats = {
  activeDeals: number
  totalUsers: number
  totalDeals: number
  recentUsers: { id: string; name: string | null; email: string; createdAt: Date }[]
  recentDeals: { id: string; name: string; updatedAt: Date; createdAt: Date }[]
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [activeDeals, totalUsers, totalDeals, recentUsers, recentDeals] =
      await Promise.all([
        prisma.deal.count({ where: { isActive: true } }),
        prisma.user.count(),
        prisma.deal.count(),
        prisma.user.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          select: { id: true, name: true, email: true, createdAt: true },
        }),
        prisma.deal.findMany({
          take: 5,
          orderBy: { updatedAt: "desc" },
          select: { id: true, name: true, updatedAt: true, createdAt: true },
        }),
      ])

    return { activeDeals, totalUsers, totalDeals, recentUsers, recentDeals }
  } catch {
    return {
      activeDeals: 0,
      totalUsers: 0,
      totalDeals: 0,
      recentUsers: [],
      recentDeals: [],
    }
  }
}
