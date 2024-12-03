# Use an x86_64 image explicitly
FROM --platform=linux/amd64 node:21

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install PhantomJS
RUN apt-get update && apt-get install -y wget \
    && wget https://github.com/Medium/phantomjs/releases/download/v2.1.1/phantomjs-2.1.1-linux-x86_64.tar.bz2 \
    && tar -xvjf phantomjs-2.1.1-linux-x86_64.tar.bz2 \
    && mv phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin \
    && rm -rf phantomjs-2.1.1-linux-x86_64*


# Copy other necessary files
COPY tsconfig.json ./

# Copy the .env file
COPY .env ./

# Copy the application source code into the container
COPY ./src ./src

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port the app runs on
EXPOSE 12345

# Set the default command to start the application
CMD ["npm", "start"]
