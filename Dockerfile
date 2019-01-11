FROM node:10

ENV NODE_ENV production

CMD [ "npm", "start" ]

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm install --loglevel=warn

COPY . .

ENV MONGODB_URI mongodb://159.89.143.28:27017/DiscordBot
