FROM node:latest

WORKDIR /user/src/app

COPY package*.json ./

COPY . .

RUN npm install

CMD [ "tail", "-f", "/dev/null"]