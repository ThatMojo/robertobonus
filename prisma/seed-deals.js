const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const casinos = [
  {
    slug: "bitkingz", rank: 1, name: "Bitkingz", logo: "/images/casinos/bitkingz.webp",
    bonusPercent: 200, bonusType: "non-sticky", maxBonus: 10000, maxBet: 5, freeSpins: 100,
    wagerMultiplier: 40, wagerType: "Bonus Only",
    features: ["Crypto Casino", "Novoline Slots", "100 Free Spins"],
    promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true,
    isExclusive: false, badgeText: null,
  },
  {
    slug: "crocoslots", rank: 2, name: "Crocoslots", logo: "/images/casinos/crocoslots.webp",
    bonusPercent: 200, bonusType: "sticky", maxBonus: 10000, maxBet: 5, freeSpins: 100,
    wagerMultiplier: 40, wagerType: "Bonus + Deposit",
    features: ["Novoline Slots", "100 Free Spins", "High Max Bonus"],
    promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true,
    isExclusive: false, badgeText: null,
  },
  {
    slug: "fugu-casino", rank: 3, name: "Fugu Casino", logo: "/images/casinos/fugu-casino.webp",
    bonusPercent: 125, bonusType: "non-sticky", maxBonus: 600, maxBet: 5, freeSpins: 100,
    wagerMultiplier: 35, wagerType: "Bonus Only",
    features: ["100 Free Spins", "Fast Verification", "Live Casino"],
    promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: false,
    isExclusive: false, badgeText: null,
  },
  {
    slug: "tripscasino", rank: 4, name: "Tripscasino", logo: "/images/casinos/tripscasino.webp",
    bonusPercent: 200, bonusType: "sticky", maxBonus: 5000, maxBet: 5, freeSpins: null,
    wagerMultiplier: 40, wagerType: "Bonus + Deposit",
    features: ["Novoline Slots", "VIP Program", "Cashback"],
    promoCode: "ROBERTO", affiliateUrl: "#", hasMerkur: false, hasNovoline: true,
    isExclusive: false, badgeText: null,
  },
  {
    slug: "wunderino", rank: 5, name: "Wunderino", logo: "/images/casinos/wunderino.webp",
    bonusPercent: 100, bonusType: "non-sticky", maxBonus: 500, maxBet: 5, freeSpins: null,
    wagerMultiplier: 30, wagerType: "Bonus Only",
    features: ["Merkur Slots", "German License", "PayPal"],
    promoCode: null, affiliateUrl: "#", hasMerkur: true, hasNovoline: false,
    isExclusive: false, badgeText: null,
  },
  {
    slug: "stake", rank: 6, name: "Stake", logo: "/images/casinos/stake.webp",
    bonusPercent: 200, bonusType: "non-sticky", maxBonus: 1000, maxBet: 5, freeSpins: null,
    wagerMultiplier: 40, wagerType: "Bonus Only",
    features: ["Crypto Casino", "Sports Betting", "VIP Program"],
    promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: false,
    isExclusive: false, badgeText: null,
  },
  {
    slug: "vulkan-vegas", rank: 7, name: "Vulkan Vegas", logo: "/images/casinos/vulkan-vegas.webp",
    bonusPercent: 150, bonusType: "sticky", maxBonus: 1500, maxBet: 5, freeSpins: 50,
    wagerMultiplier: 40, wagerType: "Bonus + Deposit",
    features: ["50 Free Spins", "Tournaments", "Cashback"],
    promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: false,
    isExclusive: false, badgeText: null,
  },
  {
    slug: "ice-casino", rank: 8, name: "Ice Casino", logo: "/images/casinos/ice-casino.webp",
    bonusPercent: 300, bonusType: "non-sticky", maxBonus: 3000, maxBet: 5, freeSpins: 100,
    wagerMultiplier: 45, wagerType: "Bonus Only",
    features: ["300% Bonus", "100 Free Spins", "Fast Withdrawal"],
    promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: false,
    isExclusive: false, badgeText: null,
  },
  {
    slug: "playfortuna", rank: 9, name: "PlayFortuna", logo: "/images/casinos/playfortuna.webp",
    bonusPercent: 200, bonusType: "non-sticky", maxBonus: 500, maxBet: 5, freeSpins: null,
    wagerMultiplier: 35, wagerType: "Bonus Only",
    features: ["Merkur Slots", "Novoline Slots", "Live Casino"],
    promoCode: null, affiliateUrl: "#", hasMerkur: true, hasNovoline: true,
    isExclusive: false, badgeText: null,
  },
  {
    slug: "national-casino", rank: 10, name: "National Casino", logo: "/images/casinos/national-casino.webp",
    bonusPercent: 200, bonusType: "sticky", maxBonus: 2000, maxBet: 5, freeSpins: 100,
    wagerMultiplier: 40, wagerType: "Bonus + Deposit",
    features: ["100 Free Spins", "Crypto", "Tournaments"],
    promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: false,
    isExclusive: false, badgeText: null,
  },
  {
    slug: "20bet", rank: 11, name: "20Bet", logo: "/images/casinos/20bet.webp",
    bonusPercent: 100, bonusType: "non-sticky", maxBonus: 200, maxBet: 5, freeSpins: null,
    wagerMultiplier: 30, wagerType: "Bonus Only",
    features: ["Merkur Slots", "Sports Betting", "Fast Withdrawal"],
    promoCode: null, affiliateUrl: "#", hasMerkur: true, hasNovoline: false,
    isExclusive: false, badgeText: null,
  },
  {
    slug: "mystake", rank: 12, name: "MyStake", logo: "/images/casinos/mystake.webp",
    bonusPercent: 200, bonusType: "non-sticky", maxBonus: 1000, maxBet: 5, freeSpins: null,
    wagerMultiplier: 35, wagerType: "Bonus Only",
    features: ["Minigames", "Crypto", "Sports Betting"],
    promoCode: null, affiliateUrl: "#", hasMerkur: false, hasNovoline: false,
    isExclusive: false, badgeText: null,
  },
  {
    slug: "gamblezen", rank: 13, name: "GambleZen", logo: "/images/casinos/gamblezen.webp",
    bonusPercent: 200, bonusType: "non-sticky", maxBonus: 500, maxBet: 5, freeSpins: null,
    wagerMultiplier: 35, wagerType: "Bonus Only",
    features: ["Fast Withdrawal", "Merkur Slots", "Live Casino"],
    promoCode: null, affiliateUrl: "#", hasMerkur: true, hasNovoline: false,
    isExclusive: true, badgeText: "Exclusive",
  },
  {
    slug: "betflare", rank: 14, name: "BetFlare", logo: "/images/casinos/betflare.webp",
    bonusPercent: 250, bonusType: "non-sticky", maxBonus: 2000, maxBet: 5, freeSpins: null,
    wagerMultiplier: 40, wagerType: "Bonus Only",
    features: ["High Bonus", "Merkur Slots", "Crypto"],
    promoCode: null, affiliateUrl: "#", hasMerkur: true, hasNovoline: false,
    isExclusive: true, badgeText: "Exclusive",
  },
  {
    slug: "lollyspins", rank: 15, name: "LollySpins", logo: "/images/casinos/lollyspins.webp",
    bonusPercent: 400, bonusType: "non-sticky", maxBonus: 2400, maxBet: 5, freeSpins: null,
    wagerMultiplier: 45, wagerType: "Bonus Only",
    features: ["400% Bonus", "Merkur Slots", "VIP Program"],
    promoCode: null, affiliateUrl: "#", hasMerkur: true, hasNovoline: false,
    isExclusive: true, badgeText: "Top Bonus",
  },
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
