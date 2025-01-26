# Base image
FROM node:18-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with retry mechanism
RUN --mount=type=cache,target=/root/.npm \
    npm config set network-timeout 600000 && \
    for i in 1 2 3; \
    do \
      npm install && break || \
      sleep 15; \
    done

# Copy project files
COPY . .

# Build the application with retry mechanism
RUN for i in 1 2 3; \
    do \
      npm run build && break || \
      sleep 15; \
    done

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]



CREATE USER 'root'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;