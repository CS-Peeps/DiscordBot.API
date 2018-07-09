FROM node:8.11

 

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm install --loglevel=warn

 

COPY . .
 

EXPOSE 8001:3000

 

# Run npm start to start up the app

CMD [ "npm", "start" ]

 