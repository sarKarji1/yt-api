# Base image
FROM node:18

# Set working directory to root (home)
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Expose port (optional, default 3000 agar aapki app wahan chalti hai)
EXPOSE 3000

# Run the application
CMD ["node", "index.js"]
