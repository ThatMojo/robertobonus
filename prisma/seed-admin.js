const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
  const hash = await bcrypt.hash("Roberto2024!", 12)
  const user = await prisma.user.upsert({
    where: { email: "admin@robertobonus.com" },
    update: { password: hash, role: "ADMIN" },
    create: {
      email: "admin@robertobonus.com",
      name: "Admin",
      password: hash,
      role: "ADMIN",
      points: 1000,
    },
  })
  console.log("Admin seeded:", user.email, user.role)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("Seed failed:", e)
    prisma.$disconnect()
  })
