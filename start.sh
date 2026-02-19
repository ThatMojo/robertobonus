#!/bin/sh
# Run DB migrations on startup (creates new tables if needed)
npx prisma db push --skip-generate --accept-data-loss 2>&1 || echo "Prisma push skipped or failed"
# Start the app
exec node server.js
