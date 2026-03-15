# ── Build stage ────────────────────────────────────────────────────
FROM node:20-alpine AS build


WORKDIR /app

# Copy manifests first for better layer caching
COPY package*.json ./

# Clean install — respects package-lock.json, skips devDep audit noise
RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

# ── Production stage ───────────────────────────────────────────────
FROM nginx:1.27-alpine AS production

# Drop to a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Remove default nginx config and default html
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Fix ownership
RUN chown -R appuser:appgroup /usr/share/nginx/html \
    && chown -R appuser:appgroup /var/cache/nginx \
    && chown -R appuser:appgroup /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown appuser:appgroup /var/run/nginx.pid

USER appuser

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]