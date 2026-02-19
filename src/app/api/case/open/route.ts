import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/db"

// Rarity tiers with weighted probabilities
const RARITIES = [
  { name: "common", label: "Common", color: "#a855f7", weight: 70, min: 5, max: 20 },
  { name: "rare", label: "Rare", color: "#3b82f6", weight: 22, min: 25, max: 50 },
  { name: "legendary", label: "Legendary", color: "#f59e0b", weight: 8, min: 75, max: 100 },
] as const

const COOLDOWN_MS = 24 * 60 * 60 * 1000 // 24 hours

function pickRarity() {
  const roll = Math.random() * 100
  let cumulative = 0
  for (const r of RARITIES) {
    cumulative += r.weight
    if (roll < cumulative) return r
  }
  return RARITIES[0]
}

function randomPoints(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate slider items (visual strip for animation)
function generateSliderItems(winIndex: number, winRarity: typeof RARITIES[number]) {
  const items = []
  for (let i = 0; i < 35; i++) {
    if (i === winIndex) {
      items.push({
        rarity: winRarity.name,
        label: winRarity.label,
        color: winRarity.color,
        points: randomPoints(winRarity.min, winRarity.max),
      })
    } else {
      const r = pickRarity()
      items.push({
        rarity: r.name,
        label: r.label,
        color: r.color,
        points: randomPoints(r.min, r.max),
      })
    }
  }
  return items
}

// GET /api/case/open — check case opening status
export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ canOpen: false, loggedIn: false })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { lastCaseOpening: true, points: true },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const now = Date.now()
  const lastOpening = user.lastCaseOpening ? user.lastCaseOpening.getTime() : 0
  const canOpen = now - lastOpening >= COOLDOWN_MS
  const nextOpenAt = canOpen ? null : new Date(lastOpening + COOLDOWN_MS).toISOString()

  return NextResponse.json({
    canOpen,
    loggedIn: true,
    nextOpenAt,
    points: user.points,
  })
}

// POST /api/case/open — open a case
export async function POST() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { lastCaseOpening: true, points: true },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Cooldown check
  const now = Date.now()
  const lastOpening = user.lastCaseOpening ? user.lastCaseOpening.getTime() : 0

  if (now - lastOpening < COOLDOWN_MS) {
    return NextResponse.json(
      { error: "Cooldown active", nextOpenAt: new Date(lastOpening + COOLDOWN_MS).toISOString() },
      { status: 429 }
    )
  }

  // Pick winning rarity and points
  const winRarity = pickRarity()
  const pointsWon = randomPoints(winRarity.min, winRarity.max)

  // Generate slider items with winner at position ~25 (near end for suspense)
  const winIndex = 25
  const items = generateSliderItems(winIndex, winRarity)
  // Override the winning item's points with the actual award
  items[winIndex].points = pointsWon

  // Award points in transaction
  const [updatedUser] = await prisma.$transaction([
    prisma.user.update({
      where: { id: session.user.id },
      data: {
        points: { increment: pointsWon },
        lastCaseOpening: new Date(),
      },
      select: { points: true },
    }),
    prisma.pointsLog.create({
      data: {
        userId: session.user.id,
        amount: pointsWon,
        reason: "case_opening",
      },
    }),
  ])

  return NextResponse.json({
    rarity: winRarity.name,
    rarityLabel: winRarity.label,
    rarityColor: winRarity.color,
    pointsWon,
    totalPoints: updatedUser.points,
    items,
    winIndex,
  })
}
