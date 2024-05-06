# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json /app

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the working directory
COPY . /app

# Expose the port on which the app will run
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]