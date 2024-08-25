# Step 1: Use an official Node runtime as a parent image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Build the TypeScript code
RUN npm run build  # This runs the build script added to package.json

# Step 7: Expose the application port
EXPOSE 3000

# Step 8: Define the command to run the application
CMD ["npm", "start"]
