# Usa una imagen base de Node
FROM node:16 AS build

WORKDIR /app

# Copia los archivos de configuración y instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos y construye la aplicación
COPY . .
RUN npm run build

# Configura un servidor Nginx para servir la aplicación de React
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]