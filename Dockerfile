# Use Node.js version 20.9.0 as the base image
FROM node:20.9.0

# Set the working directory in the container
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy the package.json and pnpm-lock.yaml files into the container
COPY package.json pnpm-lock.yaml* ./

# Install dependencies in the container
RUN pnpm install

# Copy the rest of your application's source code from your host to your image filesystem.
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app (this can be pnpm run dev, pnpm start, etc.)
CMD ["pnpm", "run", "dev"]