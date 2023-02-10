FROM node:18.14-alpine

WORKDIR /usr/app

COPY package*.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "build" ]
CMD [ "npm", "start" ]