FROM node:18 AS build

RUN mkdir -p /app
WORKDIR /app

COPY . .
RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
