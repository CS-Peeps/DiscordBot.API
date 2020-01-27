FROM node:13-alpine

ENV NODE_ENV production

CMD [ "npm", "start" ]

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm ci

COPY . .
