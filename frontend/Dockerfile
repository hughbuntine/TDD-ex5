# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app code
COPY . .

# Expose the port React will use
EXPOSE 3000

# Run the React development server
CMD ["npm", "start"]
