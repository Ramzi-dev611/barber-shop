FROM node:16-alpine

WORKDIR /barbershop

COPY ./package.json .

RUN npm install

COPY . .

ENV PRODUCTION=true
ENV DB_USER=barbershopuser
ENV DB_PASSWD=barbershoppasswd
ENV PORT=3002
ENV DB_HOST=database
ENV DB_PORT=5432
ENV DB_NAME=barbershopdb

RUN npx nx run posts-micro:build:production

EXPOSE 3002

CMD npx nx run posts-micro:serve:production
