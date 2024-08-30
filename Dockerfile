# Usa una imagen base de Node.js para la fase de construcción
FROM node:18-alpine as builder

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install --frozen-lockfile

# Copia el resto del código fuente
COPY . .

# Ejecuta el comando de build de la aplicación para generar los archivos necesarios
RUN yarn build

# Inicia un nuevo stage para producción
FROM node:18-alpine as production

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia solo las dependencias instaladas y la aplicación construida desde el stage de builder
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/package.json

# Expone el puerto 3000 para la aplicación
EXPOSE 3007

# Configura las variables de entorno para producción
ENV NODE_ENV=production

# Comando para iniciar la aplicación
CMD ["yarn", "start"]
