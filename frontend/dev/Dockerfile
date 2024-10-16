# Frontend Dockerfile
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY ../package*.json ./

# Install dependencies
RUN npm install

# Copy the project files into the container
COPY .. .

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the development server
CMD ["npm", "run", "dev"]