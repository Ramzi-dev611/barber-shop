FROM node:16-alpine

WORKDIR /barbershop

COPY ./package.json .

RUN npm install

COPY . .

ENV PRODUCTION=true
ENV DB_USER=barbershopuser
ENV DB_PASSWD=barbershoppasswd
ENV PORT=3001
ENV DB_HOST=database
ENV DB_PORT=5432
ENV DB_NAME=barbershopdb
ENV JWT_SECRET=qm{[--èrlsdkhjfmqoujhfgpquighkjqrg5678324*/67824*/95sdqkljhg

RUN npx nx run auth-micro:build:production

EXPOSE 3001

CMD npx nx run auth-micro:serve:production
