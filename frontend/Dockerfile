FROM node:20-alpine AS builder
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM cgr.dev/chainguard/nginx:latest
WORKDIR /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder  /app/dist /usr/share/nginx/html
EXPOSE 8080