# ===============================
# Stage 1: Builder (based on shared base)
# ===============================
FROM devbhoomi-base:latest AS builder
WORKDIR /app

# Copy only the service source code and shared dependencies
COPY . .

# Generate Prisma client (uses prisma/schema.prisma)
RUN pnpm --filter identity-service prisma:generate

# Build the NestJS application (uses Nest CLI from base)
RUN pnpm --filter identity-service build


# ===============================
# Stage 2: Production runtime
# ===============================
FROM node:20-alpine AS prod
WORKDIR /app

# Install required system packages (for Prisma, OpenSSL, etc.)
RUN apk add --no-cache openssl libc6-compat

# Copy built artifacts and dependencies from builder
COPY --from=builder /app/apps/identity-service/dist ./apps/identity-service/dist
COPY --from=builder /app/apps/identity-service/node_modules ./apps/identity-service/node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Copy the startup script
COPY apps/identity-service/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh

# Expose the service port
EXPOSE 3001

# Define environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Start the application
ENTRYPOINT ["./docker-entrypoint.sh"]
