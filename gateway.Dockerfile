FROM node:16-alpine

WORKDIR /barbershop

COPY ./package.json .

RUN npm install

COPY . .

ENV PRODUCTION=true
ENV PORT=3000
ENV JWT_SECRET=qm{[--èrlsdkhjfmqoujhfgpquighkjqrg5678324*/67824*/95sdqkljhg
ENV POSTS_MICRO_PORT=3002
ENV POSTS_MICRO_HOST=posts
ENV AUTH_MICRO_PORT=3001
ENV AUTH_MICRO_HOST=auth

RUN npx nx run gateway-api:build:production

EXPOSE 3000

CMD npx nx run gateway-api:serve:production
