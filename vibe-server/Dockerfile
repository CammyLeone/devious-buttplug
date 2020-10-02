FROM node:10-alpine as build

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY vibe-server ./vibe-server

WORKDIR /usr/src/app/vibe-server
RUN yarn install --pure-lockfile --non-interactive
RUN yarn run build

FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

COPY --from=build /usr/src/app/vibe-server/package.json /usr/src/app/vibe-server/package.json
COPY --from=build /usr/src/app/vibe-server/dist /usr/src/app/vibe-server/dist

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/src/app/vibe-server

CMD ["node", "dist/index.js"]
