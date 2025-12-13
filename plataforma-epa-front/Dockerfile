# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Variable de entorno para la API
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build de Vite
RUN npm run build

# Stage 2: Serve con Nginx
FROM nginx:alpine

# Copiar build al nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
