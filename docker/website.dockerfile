# build environment
FROM node:22.0.0-alpine3.18 as build

WORKDIR /app

COPY ./website/package.json package.json
COPY ./website/yarn.lock yarn.lock

RUN yarn install

ARG REACT_APP_API REACT_APP_API_PORT
ENV REACT_APP_API $REACT_APP_API 
ENV REACT_APP_API_PORT $REACT_APP_API_PORT

COPY ./website .

RUN yarn build

WORKDIR /app/server

RUN yarn install

# production environment
FROM node:22.0.0-alpine3.18
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/server /app/server
WORKDIR /app/server
EXPOSE 8080
CMD ["yarn", "run", "start"]