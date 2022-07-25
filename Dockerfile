FROM node:latest AS builder
WORKDIR /app
COPY package.json yarn.lock .yarn .yarnrc.yml ./
RUN yarn install
COPY . .
RUN yarn run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]