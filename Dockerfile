FROM node:18.14-alpine


# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
# set port
EXPOSE 4000

CMD [ "npm", "start" ]