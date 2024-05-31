# build environment
FROM node:22.0.0-alpine3.18 as build

WORKDIR /app

COPY ./website/package.json package.json
COPY ./website/yarn.lock yarn.lock

RUN yarn install

COPY ./website .
RUN rm ./src/config.json
# TODO: find a way to avoid hard coding this
RUN echo '{"api_host": "localhost", "api_port": 8080}' > ./src/config.json

RUN yarn build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]