
# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the image
COPY package*.json ./

# Install the application dependencies inside the Docker image
RUN npm install

# Copy the rest of the application into the image
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]