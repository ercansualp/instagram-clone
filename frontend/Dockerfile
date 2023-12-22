FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install --ignore-engines

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]