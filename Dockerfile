FROM node:lts

#create work directory
WORKDIR /usr/src/app

RUN npm install -g forever
RUN npm install

#Bundle app source
COPY . .

EXPOSE 8001

CMD ["foever", "npm", "start"]