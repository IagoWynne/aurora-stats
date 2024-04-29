FROM node:22.0.0-alpine3.18

WORKDIR /app

COPY ./website/package.json package.json
COPY ./website/yarn.lock yarn.lock

RUN yarn install

COPY ./website .

CMD ["yarn", "start"]