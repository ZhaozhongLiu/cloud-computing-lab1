FROM node:14-alpine

# Create app directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json /src/

# Install npm dependencies
ENV NODE_ENV=production
RUN npm install --production

# Bundle app source
COPY . /src

# Expose the application port
EXPOSE 8080 9090

# Start the application
CMD ["node", "index.js"]