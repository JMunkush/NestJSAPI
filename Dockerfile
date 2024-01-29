FROM node:20

WORKDIR /nestjsapplication

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
