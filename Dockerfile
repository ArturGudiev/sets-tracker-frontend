# Stage 1: Build the Vue app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (including devDependencies for the build)
RUN npm ci

# Copy source and build
COPY . .
# Pass API URL at build time: docker build --build-arg VITE_API_BASE_URL=http://api:8001 ...
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

# Stage 2: Serve the app
FROM nginx:alpine
RUN apk add --no-cache apache2-utils

# Copy built assets from build stage (Vite outputs to dist/)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Entrypoint writes env.js from API_HOST/API_PORT at runtime, then starts nginx
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh


EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
ENTRYPOINT ["/docker-entrypoint.sh"]
