#!/bin/sh
set -e
echo "Running Prisma migrations..."
npx prisma migrate deploy --schema=prisma/schema.prisma
echo "Starting Identity Service..."
node apps/identity-service/dist/main.js
