# Base image
FROM node:18 AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
RUN npm install
# Bundle app source
COPY . .

# Production stage
FROM base AS production
RUN npm install --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
