FROM node:10-alpine as build

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY rinse-server ./rinse-server

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/src/app/rinse-server

FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

COPY --from=build /usr/src/app/rinse-server /usr/src/app/rinse-server

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/src/app/rinse-server

CMD ["npm", "start"]
