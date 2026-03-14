export interface CasinoBonus {
  id: string
  rank: number
  name: string
  slug: string
  logo: string
  bonusPercent: number
  bonusType: "sticky" | "non-sticky"
  maxBonus: number
  maxBet: number
  freeSpins: number | null
  wagerMultiplier: number
  wagerType: string
  features: string[]
  promoCode: string | null
  affiliateUrl: string
  currency?: "EUR" | "USD"
  hasMerkur: boolean
  hasNovoline: boolean
  isExclusive: boolean
  badgeText: string | null
}

export const casinos: CasinoBonus[] = [
  {
    id: "stake",
    rank: 1,
    name: "STAKE Casino",
    slug: "stake",
    logo: "/images/casinos/stake.png",
    bonusPercent: 200,
    bonusType: "non-sticky",
    maxBonus: 1000,
    maxBet: 1000,
    freeSpins: null,
    wagerMultiplier: 40,
    wagerType: "Bonus Only",
    features: ["200% Bonus", "Non-Sticky", "Promo Code ROBERTO", "Max Bet $1,000"],
    promoCode: "ROBERTO",
    affiliateUrl: "http://stake.com/?offer=roberto",
    currency: "EUR",
    hasMerkur: false,
    hasNovoline: false,
    isExclusive: false,
    badgeText: null,
  },
  {
    id: "bitkingz",
    rank: 2,
    name: "Bitkingz Casino",
    slug: "bitkingz",
    logo: "/images/casinos/bitkingz.webp",
    bonusPercent: 200,
    bonusType: "non-sticky",
    maxBonus: 10000,
    maxBet: 5,
    freeSpins: 50,
    wagerMultiplier: 40,
    wagerType: "Bonus Only",
    features: ["50 Free Spins", "Non-Sticky", "Promo Code STRONG"],
    promoCode: "STRONG",
    affiliateUrl: "https://www.bitkingzmedia.com/a2gyepik0",
    hasMerkur: false,
    hasNovoline: false,
    isExclusive: false,
    badgeText: null,
  },
  {
    id: "winningz",
    rank: 3,
    name: "Winningz Casino",
    slug: "winningz",
    logo: "/images/casinos/winningz.webp",
    bonusPercent: 200,
    bonusType: "non-sticky",
    maxBonus: 10000,
    maxBet: 5,
    freeSpins: 50,
    wagerMultiplier: 40,
    wagerType: "Bonus Only",
    features: ["50 Free Spins", "Non-Sticky", "Promo Code STRONG"],
    promoCode: "STRONG",
    affiliateUrl: "https://record.ultimate.partners/_c7s9FFsKtNr2Bt63Rqn6jGNd7ZgqdRLk/1/?pg=1",
    hasMerkur: false,
    hasNovoline: false,
    isExclusive: false,
    badgeText: null,
  },
  {
    id: "spinfin",
    rank: 4,
    name: "SpinFin Casino",
    slug: "spinfin",
    logo: "/images/casinos/spinfin.webp",
    bonusPercent: 200,
    bonusType: "non-sticky",
    maxBonus: 10000,
    maxBet: 5,
    freeSpins: 50,
    wagerMultiplier: 40,
    wagerType: "Bonus Only",
    features: ["50 Free Spins", "Non-Sticky", "Promo Code STRONG"],
    promoCode: "STRONG",
    affiliateUrl: "https://go.driveaffiliates.com/visit/?bta=35580&nci=5400",
    hasMerkur: false,
    hasNovoline: false,
    isExclusive: false,
    badgeText: null,
  },
  {
    id: "x3bet",
    rank: 5,
    name: "X3Bet Casino",
    slug: "x3bet",
    logo: "/images/casinos/x3bet.webp",
    bonusPercent: 200,
    bonusType: "non-sticky",
    maxBonus: 750,
    maxBet: 5,
    freeSpins: 55,
    wagerMultiplier: 40,
    wagerType: "Bonus Only",
    features: ["55 Free Spins", "Non-Sticky", "No Code Required"],
    promoCode: null,
    affiliateUrl: "https://go.driveaffiliates.com/visit/?bta=35580&nci=5399",
    hasMerkur: false,
    hasNovoline: false,
    isExclusive: false,
    badgeText: null,
  },
]
