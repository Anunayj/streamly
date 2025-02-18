# syntax=docker/dockerfile:1.7-labs
# Stage 1: Build the frontend
FROM node:alpine AS build-frontend

WORKDIR /frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

COPY frontend ./
RUN npm run build

# Stage 2: Install dependencies for the final app
FROM node:alpine AS install-deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Stage 3: Final stage
FROM node:alpine

WORKDIR /app

# Copies node_modules from the install-deps stage 
COPY --from=install-deps /app ./

# Copy frontend files from the build-frontend stage
COPY --from=build-frontend /frontend/dist ./frontend/dist

# Copy shared modules
COPY ./frontend/shared ./frontend/shared
COPY --exclude=frontend . ./

EXPOSE 3000

# Start the application
CMD ["node", "server.mjs"]