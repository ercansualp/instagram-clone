FROM node:14-alpine
 
WORKDIR /app
 
COPY package*.json ./

RUN npm install

COPY . .
 
EXPOSE 3000

# "node" kullanıcısını ve "node" grubunu kullanarak çalıştır
USER node
 
CMD ["npm", "start"]