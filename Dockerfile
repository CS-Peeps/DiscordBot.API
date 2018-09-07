FROM node:8.11

 

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm install --loglevel=warn

 

COPY . .

# Arguments
ARG discord_bot

ENV NODE_ENV production
ENV MONGODB_URI mongodb://localhost:27017/DiscordBot
 

# Run npm start to start up the app

CMD [ "npm", "start" ]

 