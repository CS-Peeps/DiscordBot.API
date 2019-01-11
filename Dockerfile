FROM node:10

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm install --loglevel=warn

COPY . .

ENV NODE_ENV production
ENV MONGODB_URI mongodb://159.89.143.28:27017/DiscordBot

# Run npm start to start up the app

CMD [ "npm", "start" ]
