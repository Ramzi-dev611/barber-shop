FROM node:16-alpine

WORKDIR /barbershop

COPY ./package.json .

RUN npm install

COPY . .

ENV PORT=3001


RUN npx nx run auth-micro:build:production

EXPOSE 3001

CMD npx nx run auth-micro:serve:production
