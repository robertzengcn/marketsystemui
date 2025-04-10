# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn config set network-timeout 300000 && \
    yarn install --network-timeout 300000

# Expose port for Vite dev server
EXPOSE 5173

# Command to run the development server
CMD ["yarn", "dev", "--host", "0.0.0.0"] 