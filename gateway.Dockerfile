FROM node:16-alpine

WORKDIR /barbershop

COPY ./package.json .

RUN npm install

COPY . .

ENV PORT=3000

RUN npx nx run gateway-api:build:production

EXPOSE 3000

CMD npx nx run gateway-api:serve:production
