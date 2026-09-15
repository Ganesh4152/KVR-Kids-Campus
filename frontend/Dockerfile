# =========================================================
# KVR Kids Campus - Frontend Dockerfile
# React 19 + Vite 8
# =========================================================

# ---------------------------------------------------------
# STAGE 1: BUILD
# ---------------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files first for Docker layer caching
COPY package.json package-lock.json ./

# Install exact dependency versions
RUN npm ci

# Copy frontend source
COPY . .

# Build production frontend
RUN npm run build


# ---------------------------------------------------------
# STAGE 2: NGINX RUNTIME
# ---------------------------------------------------------
FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite production build
COPY --from=build /app/dist /usr/share/nginx/html

# Copy KVR Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Frontend container listens on port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
