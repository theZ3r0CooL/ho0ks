FROM node:18 AS build

RUN mkdir -p /app
WORKDIR /app

COPY . .
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
