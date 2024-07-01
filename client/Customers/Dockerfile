# Use the official Node.js 20 alpine image as a base
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Command to run the application with --host flag

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
