# Dockerfile
FROM node:22.12.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22.12.0-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/build .
EXPOSE 3000
ENTRYPOINT ["serve", "-s", ".", "-l", "3000"]
