# Utiliza una imagen base de Node.js
FROM node:18-alpine as build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu proyecto Angular
COPY package*.json ./

# Instala las dependencias de tu aplicación Angular
RUN npm install

# Copia el código fuente de la aplicación Angular
COPY . .

# Construye la aplicación Angular
RUN npm run build --prod

# Utiliza una imagen de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos de la compilación a la carpeta de Nginx
COPY --from=build /app/dist/ /usr/share/nginx/html

# Expón el puerto 80
EXPOSE 80

# Inicia Nginx para servir la aplicación
CMD ["nginx", "-g", "daemon off;"]
