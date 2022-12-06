FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm ci && npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]