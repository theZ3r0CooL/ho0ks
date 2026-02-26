FROM node:20.20.0 AS build

RUN mkdir -p /app
WORKDIR /app

COPY . .
RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
