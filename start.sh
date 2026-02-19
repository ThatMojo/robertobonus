#!/bin/sh
# Run DB migrations on startup (creates new tables if needed)
npx prisma db push --skip-generate --accept-data-loss 2>&1 || echo "Prisma push skipped or failed"
# Seed admin user if not exists
node prisma/seed-admin.js 2>&1 || echo "Admin seed skipped"
# Seed/sync deals data
node prisma/seed-deals.js 2>&1 || echo "Deals seed skipped"
# Start the app
exec node server.js
