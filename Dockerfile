# Usa Node.js como imagen base
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia todos los archivos del proyecto
COPY . . 

# Instala dependencias y construye la aplicación Angular
RUN npm ci
RUN npm run build --configuration=production

# Usa NGINX para servir la app
FROM nginx:alpine

# Copia el archivo de configuración personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf 

# Copia la aplicación compilada
COPY --from=build /app/dist/app-name/browser/ /usr/share/nginx/html/

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
