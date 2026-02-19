import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { name, email, password, referralCode } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    // Create the user with 100 registration bonus points
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        referredBy: referralCode || null,
        points: 100,
      },
    })

    // Log the registration points
    await prisma.pointsLog.create({
      data: {
        userId: newUser.id,
        amount: 100,
        reason: "registration",
      },
    })

    // Welcome notification for the new user
    await prisma.notification.create({
      data: {
        userId: newUser.id,
        title: "Welcome to Robertobonus!",
        message: "You earned 100 points for signing up. Claim daily bonuses to earn more!",
        type: "welcome",
        link: "/leaderboard",
      },
    })

    // Handle referral bonus
    if (referralCode) {
      const referrer = await prisma.user.findFirst({
        where: { referralCode },
        select: { id: true, name: true },
      })

      if (referrer) {
        // Give referrer 200 points
        await prisma.user.update({
          where: { id: referrer.id },
          data: { points: { increment: 200 } },
        })

        // Log referral points
        await prisma.pointsLog.create({
          data: {
            userId: referrer.id,
            amount: 200,
            reason: "referral_bonus",
          },
        })

        // Notify the referrer
        await prisma.notification.create({
          data: {
            userId: referrer.id,
            title: "New Referral!",
            message: `${name || email} registered with your referral code. You earned 200 points!`,
            type: "points_earned",
            link: "/leaderboard",
          },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    )
  }
}
