FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build the frontend
RUN npm run build

EXPOSE 3000

# Start the application
CMD ["node", "server.js"]