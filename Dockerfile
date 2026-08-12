# syntax=docker/dockerfile:1

# ---- client build (Create React App) ----
FROM node:22-alpine AS client-build
WORKDIR /app
COPY package.json package-lock.json ./
# react-scripts@5.0.1 peer-depends on TS <5; the project uses TS 5.9.3, so
# strict peer resolution fails without this (same as local installs need).
RUN npm ci --legacy-peer-deps
COPY public ./public
COPY src ./src
COPY tsconfig.json ./
RUN npm run build

# ---- server build (tsc) ----
FROM node:22-alpine AS server-build
WORKDIR /app
COPY server/package.json server/package-lock.json ./server/
RUN npm --prefix server ci
# server/tsconfig.json has rootDir ".." and also compiles these root files
COPY src/utils ./src/utils
COPY src/types ./src/types
COPY server/tsconfig.json server/postbuild.js ./server/
COPY server/src ./server/src
RUN npm --prefix server run build

# ---- server production deps only ----
FROM node:22-alpine AS server-deps
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev

# ---- runtime ----
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
# Origin the client is actually served from in production (needed for
# socket.io's CORS check) - override at `docker run` time if it differs.
ENV CLIENT_ORIGIN=http://localhost:4000

COPY --from=client-build /app/build ./build
COPY --from=server-build /app/server/dist ./server/dist
COPY --from=server-deps /app/server/node_modules ./server/node_modules

EXPOSE 4000
CMD ["node", "server/dist/index.js"]
