# Node.js를 사용하여 빌드
FROM node:18 AS builder
WORKDIR /frontend
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Nginx를 사용하여 정적 파일 제공
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
