# Stage 1: Build React App with Vite
FROM node:22-alpine AS build

WORKDIR /app

# Salin package files dan install dependencies
COPY package*.json ./
RUN npm ci

# Salin seluruh source code
COPY . .

# Argument build untuk environment variable Vite jika dibutuhkan
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Jalankan build production
RUN npm run build

# Stage 2: Serve dengan Nginx
FROM nginx:alpine

# Bersihkan folder html bawaan nginx
RUN rm -rf /usr/share/nginx/html/*

# Salin hasil build dari stage 1 ke direktori Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Salin konfigurasi Nginx kustom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port aplikasi
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]

