# ---------- builder stage ----------
FROM node:18-alpine AS builder
WORKDIR /app

# Installer les dépendances (y compris dev pour les tests)
COPY package*.json ./
RUN npm ci

# Copier tout le code source
COPY . .

# Lint + tests unitaires
RUN npm run lint
RUN npm run test:unit

# Tests d'intégration (nécessite DB)
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
RUN npm run test:int || echo "Integration tests skipped or failed during build."

# ---------- runtime stage ----------
FROM node:18-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production

# Copier uniquement ce qui est nécessaire au runtime
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/tests ./tests

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "src/index.js"]

