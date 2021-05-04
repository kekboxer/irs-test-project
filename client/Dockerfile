FROM node:12.13.0 AS build-frontend
WORKDIR /frontbuild
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM fholzer/nginx-brotli:v1.16.0
WORKDIR /app
COPY --from=build-frontend /frontbuild/build ./
COPY nginx/nginx.production.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
