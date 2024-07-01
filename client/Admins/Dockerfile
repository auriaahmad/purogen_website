# FROM node:20-alpine AS BUILD_ADMIN

# # Set the working directory
# WORKDIR /app/admin

# # Copy package.json and package-lock.json
# COPY package.json .

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Command to run the application
# RUN npm run build

# FROM node:20-alpine AS BUILD_ADMIN_PRODUCTION

# # Set the working directory
# WORKDIR /app/admin

# COPY --from=BUILD_ADMIN /app/admin/dist/  /app/admin/dist/ 

# # Expose the port the app runs on
# EXPOSE 8080

# COPY package.json .

# COPY vite.config.js .

# # Command to run the application
# CMD ["npm", "run", "preview"]

# ======================================================================================= #

# FROM node:20-alpine

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 8080

# CMD [ "npm", "run", "preview" ]

# ======================================================================================= #

# Use the official Node.js 20 alpine image as a base
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
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