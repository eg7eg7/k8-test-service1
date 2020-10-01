FROM node:12

WORKDIR /usr/src/app

COPY * ./

RUN npm install

RUN npm run tsc

EXPOSE 5000

CMD ["node", "./build/start.js"]