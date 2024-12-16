FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/server /app/server
COPY package*.json ./
RUN npm install --production

VOLUME ["/data"]
EXPOSE 80

CMD ["node", "server/index.js"]