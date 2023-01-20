FROM node:18:12:1

WORKDIR /nodejs-hw-rest-api

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server"]