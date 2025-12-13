FROM node:18-alpine

# Instala utilidades mínimas (opcional pero útil)
RUN apk add --no-cache curl

# Directorio de trabajo
WORKDIR /usr/src/app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código
COPY . .

# Puerto del backend
EXPOSE 5000

# Variables de entorno (se inyectan desde docker-compose / prod)
ENV NODE_ENV=production

# Comando de arranque
CMD ["npm", "start"]
