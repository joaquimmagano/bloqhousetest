FROM node:12.2.0-alpine

WORKDIR /nodeContainer

COPY ./package*.json /nodeContainer/

RUN npm install

COPY ../ .

EXPOSE 5000

CMD ["node", "index.js"]