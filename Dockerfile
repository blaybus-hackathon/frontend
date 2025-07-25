# Node.js를 사용하여 빌드
FROM node:18 AS builder
WORKDIR /frontend
COPY package*.json ./
RUN npm install

COPY . .

# 환경변수 받기
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# .env.production 파일 생성
RUN echo "VITE_API_BASE_URL=$VITE_API_BASE_URL" > .env.production

RUN npm run build

# Nginx를 사용하여 정적 파일 제공
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
