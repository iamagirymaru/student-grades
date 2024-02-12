FROM node:20.11.0

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . ./

CMD ["npm", "run", "dev"]