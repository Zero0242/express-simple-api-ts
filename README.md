# Express + Typescript Server

Servidor de express que usa typescript para desarrollar un api con Mongo DB

# Requisitos

Tener instalado **NodeJS** e idealmente tener **Docker Desktop (Recomendado)**.

En caso de no instalar DOCKER, seguir esta guia para usar [Mongo Atlas](https://youtu.be/d6wv1Utj5BE?si=PdiGLjGECGip2XnT).

Tener instalado **yarn**

```bash
npm install -g yarn
```

# Docker

Correr todo desde docker

```bash
docker-compose -f docker-compose.prod.yaml up -d
```

# Configuracion

1. Configurar el archivo **.env** copiando el de ejemplo. El archivo de ejemplo apunta de forma local.
2. Instalar dependencias

   ```bash
   npm i        # Si usan npm (default)
   yarn         # Si usan yarn
   ```

3. Importar las peticiones a su client
   - [Thunder Client](https://www.thunderclient.com/)
     - thunder-collection (...) .json para cargar las colecciones en thunder
   - [Postman](https://www.postman.com/)
     - postman-collection (...) .json para cargar las colecciones en postman

# Comandos del proyecto

> Para correr comandos, en npm se usa `npm run <comando>` y en el caso de yarn se utiliza `yarn <comando>`

- Correr server en modo desarrollo

  ```bash
  yarn dev
  npm run dev
  ```

- Gestion contenedores de docker desktop

  ```bash
  yarn db:up            # Encender contenedores
  npm run db:up         # Encender contenedores

  yarn db:down          # Apagar contenedores
  npm run db:down       # Apagar contenedores

  yarn db:destroy       # Eliminar contenedores con datos incluidos
  npm run db:destroy    # Eliminar contenedores con datos incluidos
  ```

- Realizar los testing del server

  ```bash
  yarn test         # Correr pruebas
  npm run test      # Correr pruebas

  yarn coverage     # Generar coverage de las pruebas
  npm run coverage  # Generar coverage de las pruebas
  ```

- Construir build de produccion

  ```bash
  yarn build        # Transpilar de Typescript a Javascript
  npm run build     # Transpilar de Typescript a Javascript

  yarn serve        # Correr server en modo produccion
  npm run serve     # Correr server en modo produccion
  ```
