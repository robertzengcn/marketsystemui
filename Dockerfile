# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Expose port for Vite dev server
EXPOSE 5173

# Command to run the development server
CMD ["yarn", "dev", "--host", "0.0.0.0"] 