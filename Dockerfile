# Use the official Playwright image with dependencies pre-installed
FROM mcr.microsoft.com/playwright:v1.42.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies (including Playwright browsers)
RUN npm install

# Copy all test files and configuration
COPY . .

# Run Playwright tests in headless mode
CMD ["npx", "playwright", "test"]
