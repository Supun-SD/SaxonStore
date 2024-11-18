# Use Node.js 20 as the base image 
FROM node:20

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the dependencies listed in package.json
RUN npm install

# Copy the rest of the application files into the container's working directory
COPY . .

# Expose port 3000 to allow access to the React development server
EXPOSE 3000

# Set the default command to run the React development server
CMD ["npm", "run", "dev"]
