<p align="center">
  <a href="https://nodejs.org/en" target="blank">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png" height="200" alt="App Logo" /></a>
</p>

# Proyecto Api con ExpressJS

pruebas de typeorm y otros modulos

> creado en node js

## DEV

1. Clonar repositorio con `git clone`
2. Instalar los paquetes de node js con `npm install`
3. Descargar un service account de `firebase-admin` para usar las funcionalidades de notificaciones
4. Crear un archivo `.env` basado en el `.env.example`
5. Ejecutar el proyecto con `npm run start` o `npm run dev`
   - Opcional: ejecutar los comandos del `package.json` o usando `F5`

## Requisitos

1. Tener instalado node js
2. Base de datos postgresql o conexion a [neondb](https://neon.tech/)

## Scripts

Algunos scripts que pueden ser utilizados

| Comando               | Descripcion              |
| --------------------- | ------------------------ |
| `npm start`           | Iniciar Proyecto         |
| `npm run dev`         | Mode desarrollo          |
| `npm install`         | Instala las dependencias |
| `npm run build`       | Crea un build            |
| `rm -rf node_modules` | Limpia las dependencias  |

#### Otros Scripts

Otros scripts que pueden usar para fines de desarrollo, (acciones de paquetes)

| Comando | Descripcion                                                                |
| ------- | -------------------------------------------------------------------------- |
| `....`  | Insertar scripts que usen los paquetes de terceros si es necesario hacerlo |

## Documentacion

Links de librerias utilizadas

- [NodeJS](https://nodejs.org/en)
  - [Single Executable Files](https://nodejs.org/api/single-executable-applications.html)
  - [Nexe](https://github.com/nexe/nexe)
- [Configurando Winston](https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/)
- [TypeORM with expressjs](https://orkhan.gitbook.io/typeorm/docs/example-with-express)
- [Validation](https://mirzaleka.medium.com/api-validations-in-express-js-5d1d308dceea)
- [Curso de Socketio + React](https://www.udemy.com/course/react-socket-io-fernando/)
- [Curso de React](https://www.udemy.com/course/react-cero-experto/)
- [Firebase Admin](https://www.youtube.com/watch?v=IOFpNI_TLqM)
- [Mail con EJS](https://stackoverflow.com/questions/41304922/sending-ejs-template-using-nodemailer)

#### Winston

- [Logging con Wiston](https://mirzaleka.medium.com/automated-logging-in-express-js-a1f85ca6c5cd)
- [Winston + NestJS](https://www.npmjs.com/package/nest-winston)
- [Winston Formatos](https://dev.to/naineel12/lets-build-a-production-ready-logger-using-winston-oo4)
- [Winston NestJS Style](https://stackoverflow.com/questions/76959383/how-to-simulate-nestjs-color-logs-with-winston-logger)

- Referencia random strings

```js
const crypto = require("crypto");

for (let index = 0; index < 20; index++) {
	const randomString = crypto.randomBytes(4).toString("hex");
	console.log({ tokens: randomString });
}
```
