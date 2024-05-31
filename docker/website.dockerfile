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

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]