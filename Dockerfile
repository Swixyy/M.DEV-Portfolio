# Use Node.js 22 (LTS) which is fully supported by Astro
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 4321

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
