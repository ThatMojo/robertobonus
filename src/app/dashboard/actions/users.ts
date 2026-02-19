"use server"

import bcrypt from "bcryptjs"
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

export async function resetUserPassword(userId: string, newPassword: string) {
  try {
    if (newPassword.length < 8) {
      return { success: false, error: "Password must be at least 8 characters" }
    }
    const hashed = await bcrypt.hash(newPassword, 12)
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    })
    return { success: true }
  } catch {
    return { success: false, error: "Failed to reset password" }
  }
}

export async function createUser(data: {
  name: string
  email: string
  password: string
  role: "USER" | "ADMIN"
}) {
  try {
    if (!data.email || !data.password) {
      return { success: false, error: "Email and password are required" }
    }
    if (data.password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters" }
    }

    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing) {
      return { success: false, error: "Email already exists" }
    }

    const hashed = await bcrypt.hash(data.password, 12)
    const user = await prisma.user.create({
      data: {
        name: data.name || null,
        email: data.email,
        password: hashed,
        role: data.role,
        points: 0,
      },
    })

    return { success: true, userId: user.id }
  } catch {
    return { success: false, error: "Failed to create user" }
  }
}
