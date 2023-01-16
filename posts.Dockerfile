FROM node:16-alpine

WORKDIR /barbershop

COPY ./package.json .

RUN npm install

COPY . .

ENV PORT=3002

RUN npx nx run posts-micro:build:production

EXPOSE 3002

CMD npx nx run posts-micro:serve:production
