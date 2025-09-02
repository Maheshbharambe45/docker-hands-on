FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p /usr/src/app/logs

EXPOSE 3000

CMD ["node", "server.js"]
