# Stage 1: Build the Angular application
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files
COPY . .

# Expose port 4200
EXPOSE 4200

# Run Angular application in development mode
CMD ["npm", "run", "start"]
