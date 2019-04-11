FROM node:10

ENV NODE_ENV production

CMD [ "npm", "start" ]

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm install --loglevel=warn

COPY . .