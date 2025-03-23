# Usa Node.js como imagen base para construir
FROM node:18 AS build

WORKDIR /app
COPY . . 

RUN npm ci
RUN npm run build --configuration=production

# Usa NGINX para servir la app
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf 

# Copia la aplicación compilada
COPY --from=build /app/dist/app-name/browser/ /usr/share/nginx/html/

# 🔹 Cambia el puerto a 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
