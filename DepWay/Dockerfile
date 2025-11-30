FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /app/client
RUN npm install
RUN npm run build

FROM node:18-alpine

RUN apk add --no-cache docker-cli

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY server.js ./

COPY --from=builder /app/client/build ./client/build

RUN mkdir -p temp

EXPOSE 5000

CMD ["npm", "start"]
