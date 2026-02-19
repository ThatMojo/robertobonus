const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const casinos = [
  { slug: "gamblezen", rank: 1, name: "GambleZen", logo: "/images/casinos/gamblezen.webp", bonusPercent: 200, bonusType: "non-sticky", maxBonus: 500, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus + Deposit", features: ["Merkur Slots", "Many Offers", "Large Game Selection"], promoCode: null, affiliateUrl: "#", hasMerkur: true, hasNovoline: true, isExclusive: true, badgeText: "Exclusive" },
  { slug: "windetta", rank: 2, name: "Windetta", logo: "/images/casinos/windetta.webp", bonusPercent: 230, bonusType: "non-sticky", maxBonus: 2000, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["Eye of Horus", "Many Bonus Offers", "Paysafecard"], promoCode: null, affiliateUrl: "#", hasMerkur: true, hasNovoline: true, isExclusive: true, badgeText: "New" },
  { slug: "betflare", rank: 3, name: "BetFlare", logo: "/images/casinos/betflare.webp", bonusPercent: 250, bonusType: "non-sticky", maxBonus: 2000, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus + Deposit", features: ["Merkur Slots", "Many Bonus Offers", "Large Game Selection"], promoCode: null, affiliateUrl: "#", hasMerkur: true, hasNovoline: true, isExclusive: true, badgeText: "Exclusive" },
  { slug: "lollyspins", rank: 4, name: "LollySpins", logo: "/images/casinos/lollyspins.webp", bonusPercent: 400, bonusType: "non-sticky", maxBonus: 2400, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus + Deposit", features: ["400% Bonus", "Merkur Slots", "Large Game Selection"], promoCode: null, affiliateUrl: "#", hasMerkur: true, hasNovoline: true, isExclusive: false, badgeText: "Top Bonus" },
  { slug: "bitkingz", rank: 5, name: "Bitkingz", logo: "/images/casinos/bitkingz.webp", bonusPercent: 200, bonusType: "non-sticky", maxBonus: 10000, maxBet: 5, freeSpins: 100, wagerMultiplier: 45, wagerType: "Bonus Only", features: ["100 Free Spins", "Novoline Slots", "Paysafecard"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "crocoslots", rank: 6, name: "Crocoslots", logo: "/images/casinos/crocoslots.png", bonusPercent: 200, bonusType: "sticky", maxBonus: 10000, maxBet: 5, freeSpins: 100, wagerMultiplier: 45, wagerType: "Bonus Only", features: ["100 Free Spins", "Novoline Slots", "Paysafecard"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "fugu-casino", rank: 7, name: "Fugu Casino", logo: "/images/casinos/fugu-casino.png", bonusPercent: 125, bonusType: "non-sticky", maxBonus: 600, maxBet: 5, freeSpins: 100, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["100 Free Spins", "Instant Withdrawals", "Many Bonus Offers"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "tripscasino", rank: 8, name: "Tripscasino", logo: "/images/casinos/tripscasino.png", bonusPercent: 200, bonusType: "sticky", maxBonus: 5000, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["Fast Withdrawals", "Novoline Slots", "Many Offers"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "luckywins", rank: 9, name: "LuckyWins", logo: "/images/casinos/luckywins.webp", bonusPercent: 200, bonusType: "sticky", maxBonus: 500, maxBet: 5, freeSpins: 50, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["50 Free Spins", "Exclusive Bonus", "Large Game Selection"], promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "winz", rank: 10, name: "Winz", logo: "/images/casinos/winz.png", bonusPercent: 200, bonusType: "sticky", maxBonus: 500, maxBet: 5, freeSpins: null, wagerMultiplier: 45, wagerType: "Bonus Only", features: ["5 Min. Withdrawals", "Novoline Slots", "Wager-Free Spins"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "biggg", rank: 11, name: "Biggg", logo: "/images/casinos/biggg.png", bonusPercent: 200, bonusType: "non-sticky", maxBonus: 1000, maxBet: 5, freeSpins: 50, wagerMultiplier: 35, wagerType: "Bonus Only", features: ["50 Free Spins", "Novoline Slots", "Paysafecard"], promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "onlyspins", rank: 12, name: "Onlyspins", logo: "/images/casinos/onlyspins.png", bonusPercent: 200, bonusType: "non-sticky", maxBonus: 500, maxBet: 5, freeSpins: null, wagerMultiplier: 35, wagerType: "Bonus + Deposit", features: ["Merkur Slots", "Novoline Slots", "Paysafecard"], promoCode: null, affiliateUrl: "#", hasMerkur: true, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "magius", rank: 13, name: "Magius", logo: "/images/casinos/magius.jpg", bonusPercent: 250, bonusType: "non-sticky", maxBonus: 500, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["Merkur Slots", "Novoline Slots", "Paysafecard"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: true, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "bassbet", rank: 14, name: "Bassbet", logo: "/images/casinos/bassbet.webp", bonusPercent: 200, bonusType: "non-sticky", maxBonus: 500, maxBet: 5, freeSpins: null, wagerMultiplier: 35, wagerType: "Bonus + Deposit", features: ["Merkur Slots", "Novoline Slots", "Paysafecard"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: true, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "spinanga", rank: 15, name: "Spinanga", logo: "/images/casinos/spinanga.webp", bonusPercent: 200, bonusType: "non-sticky", maxBonus: 500, maxBet: 5, freeSpins: null, wagerMultiplier: 35, wagerType: "Bonus + Deposit", features: ["Merkur Slots", "Novoline Slots", "Paysafecard"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: true, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "spinit", rank: 16, name: "Spinit", logo: "/images/casinos/spinit.jpg", bonusPercent: 200, bonusType: "non-sticky", maxBonus: 500, maxBet: 5, freeSpins: null, wagerMultiplier: 35, wagerType: "Bonus + Deposit", features: ["Merkur Slots", "Novoline Slots", "Paysafecard"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: true, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "beef-casino", rank: 17, name: "Beef Casino", logo: "/images/casinos/beef-casino.webp", bonusPercent: 125, bonusType: "non-sticky", maxBonus: 600, maxBet: 5, freeSpins: 100, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["100 Free Spins", "5 Min. Withdrawals"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "rocketspin", rank: 18, name: "Rocketspin", logo: "/images/casinos/rocketspin.webp", bonusPercent: 100, bonusType: "sticky", maxBonus: 1000, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["Fast Withdrawals", "Novoline Slots", "Paysafecard"], promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "playmojo", rank: 19, name: "Playmojo", logo: "/images/casinos/playmojo.webp", bonusPercent: 100, bonusType: "sticky", maxBonus: 1000, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["Fast Withdrawals", "Novoline Slots", "Paysafecard"], promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "martin-casino", rank: 20, name: "Martin Casino", logo: "/images/casinos/martin-casino.png", bonusPercent: 150, bonusType: "non-sticky", maxBonus: 600, maxBet: 5, freeSpins: 100, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["100 Free Spins", "5 Min. Withdrawals"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "flagman-casino", rank: 21, name: "Flagman Casino", logo: "/images/casinos/flagman-casino.webp", bonusPercent: 150, bonusType: "non-sticky", maxBonus: 600, maxBet: 5, freeSpins: 100, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["100 Free Spins", "5 Min. Withdrawals"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "rollero", rank: 22, name: "Rollero", logo: "/images/casinos/rollero.webp", bonusPercent: 100, bonusType: "sticky", maxBonus: 1000, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["Fast Withdrawals", "Novoline Slots", "Paysafecard"], promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "fortuneplay", rank: 23, name: "Fortuneplay", logo: "/images/casinos/fortuneplay.webp", bonusPercent: 100, bonusType: "sticky", maxBonus: 1000, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["Fast Withdrawals", "Novoline Slots", "Paysafecard"], promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "monro-casino", rank: 24, name: "Monro Casino", logo: "/images/casinos/monro-casino.webp", bonusPercent: 150, bonusType: "sticky", maxBonus: 600, maxBet: 5, freeSpins: 100, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["100 Free Spins", "5 Min. Withdrawals"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "drip-casino", rank: 25, name: "Drip Casino", logo: "/images/casinos/drip-casino.webp", bonusPercent: 150, bonusType: "sticky", maxBonus: 600, maxBet: 5, freeSpins: 100, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["100 Free Spins", "5 Min. Withdrawals"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "1go-casino", rank: 26, name: "1GO Casino", logo: "/images/casinos/1go-casino.webp", bonusPercent: 150, bonusType: "sticky", maxBonus: 600, maxBet: 5, freeSpins: 100, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["100 Free Spins", "5 Min. Withdrawals"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "irwin-casino", rank: 27, name: "Irwin Casino", logo: "/images/casinos/irwin-casino.png", bonusPercent: 150, bonusType: "sticky", maxBonus: 600, maxBet: 5, freeSpins: 100, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["100 Free Spins", "5 Min. Withdrawals"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "luckyvibe", rank: 28, name: "Luckyvibe", logo: "/images/casinos/luckyvibe.webp", bonusPercent: 100, bonusType: "sticky", maxBonus: 1000, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["Fast Withdrawals", "Novoline Slots", "Paysafecard"], promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "gizbo-casino", rank: 29, name: "Gizbo Casino", logo: "/images/casinos/gizbo-casino.webp", bonusPercent: 150, bonusType: "sticky", maxBonus: 600, maxBet: 5, freeSpins: 100, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["100 Free Spins", "5 Min. Withdrawals"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "starda-casino", rank: 30, name: "Starda Casino", logo: "/images/casinos/starda-casino.webp", bonusPercent: 100, bonusType: "sticky", maxBonus: 600, maxBet: 5, freeSpins: 100, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["100 Free Spins", "5 Min. Withdrawals"], promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "slotoro", rank: 31, name: "Slotoro", logo: "/images/casinos/slotoro.png", bonusPercent: 150, bonusType: "non-sticky", maxBonus: 500, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["Large Game Selection", "Novoline Slots", "Paysafecard"], promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "verde-casino", rank: 32, name: "Verde Casino", logo: "/images/casinos/verde-casino.jpg", bonusPercent: 120, bonusType: "non-sticky", maxBonus: 300, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["No Deposit Bonus", "Novoline Slots", "Paysafecard"], promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "hitnspin", rank: 33, name: "HitnSpin", logo: "/images/casinos/hitnspin.png", bonusPercent: 150, bonusType: "non-sticky", maxBonus: 300, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["No Deposit Bonus", "Novoline Slots", "Paysafecard"], promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "ice-casino", rank: 34, name: "Ice Casino", logo: "/images/casinos/ice-casino.jpg", bonusPercent: 120, bonusType: "non-sticky", maxBonus: 500, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["No Deposit Bonus", "Novoline Slots", "Paysafecard"], promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
  { slug: "vulkanvegas-casino", rank: 35, name: "VulkanVegas Casino", logo: "/images/casinos/vulkanvegas-casino.png", bonusPercent: 120, bonusType: "non-sticky", maxBonus: 500, maxBet: 5, freeSpins: null, wagerMultiplier: 40, wagerType: "Bonus Only", features: ["No Deposit Bonus", "Novoline Slots", "Paysafecard"], promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: true, isExclusive: false, badgeText: null },
]

async function main() {
  for (const c of casinos) {
    await prisma.deal.upsert({
      where: { slug: c.slug },
      update: {
        rank: c.rank,
        name: c.name,
        logo: c.logo,
        bonusPercent: c.bonusPercent,
        bonusType: c.bonusType,
        maxBonus: c.maxBonus,
        maxBet: c.maxBet,
        freeSpins: c.freeSpins,
        wagerMultiplier: c.wagerMultiplier,
        wagerType: c.wagerType,
        features: c.features,
        promoCode: c.promoCode,
        affiliateUrl: c.affiliateUrl,
        hasMerkur: c.hasMerkur,
        hasNovoline: c.hasNovoline,
        isExclusive: c.isExclusive,
        badgeText: c.badgeText,
      },
      create: c,
    })
  }
  console.log("Deals seeded:", casinos.length, "deals")
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("Deal seed failed:", e)
    prisma.$disconnect()
  })
