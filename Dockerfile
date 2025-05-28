FROM node:18

# Set the working directory
WORKDIR /app

COPY . .

# Install dependencies
RUN npm install

RUN npx hardhat compile

# Set the default command to start the application
CMD ["npm", "run", "start"]