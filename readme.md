# Budget API

API para la gestión de presupuestos, desarrollada como parte del trabajo práctico final de Backend para la diplomatura Full Stack de la UTN BA.

## Descripción

Esta API permite a los usuarios gestionar presupuestos, incluyendo la creación, lectura, actualización y eliminación de los mismos. Además, implementa un sistema de autenticación para asegurar que solo usuarios autorizados puedan acceder y modificar los datos.

## Características

-  CRUD de presupuestos.
-  Autenticación de usuarios mediante JWT.
-  Validación de datos de entrada.
-  Manejo de errores centralizado.

## Tecnologías Utilizadas

-  Node.js
-  Express
-  MongoDB con Mongoose
-  TypeScript
-  JWT para autenticación
-  bcrypt para hashing de contraseñas

## Requisitos Previos

-  Node.js v14 o superior
-  MongoDB v4 o superior

## Documentación

La API está documentada en Postman y se puede acceder a través de los siguientes enlaces:

-  [Presupuestos - CRUD Principal](https://documenter.getpostman.com/view/27668634/2sAYBa99Ud)
-  [Usuarios - Registro y Autenticación](https://documenter.getpostman.com/view/27668634/2sAYBa99Ue)

Cada enlace incluye ejemplos de requests, responses y descripciones detalladas de cada endpoint.

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/NicoPicotto/budget-api.git
   ```

2. Navegar al directorio del proyecto:

   ```bash
   cd budget-api
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Configurar las variables de entorno:

   -  Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

      ```env
      PORT=3000
      MONGO_URI=mongodb://localhost:27017/budget-api
      JWT_SECRET=clave
      ```

## Uso

1. Iniciar el servidor:

   ```bash
   npm start
   ```

2. La API estará disponible en `http://localhost:3000`.

## Rutas de la API

-  **Usuarios**

   -  `POST /api/users/register`: Registro de un nuevo usuario.
   -  `POST /api/users/login`: Inicio de sesión de un usuario.

-  **Presupuestos**

   -  `GET /api/budgets`: Obtener todos los presupuestos.
   -  `GET /api/budgets/:id`: Obtener un presupuesto por ID.
   -  `POST /api/budgets`: Crear un nuevo presupuesto.
   -  `PUT /api/budgets/:id`: Actualizar un presupuesto existente.
   -  `DELETE /api/budgets/:id`: Eliminar un presupuesto.

## Autenticación

Las rutas de presupuestos requieren autenticación mediante un token JWT. Para acceder a estas rutas:

1. Registrar un nuevo usuario o iniciar sesión para obtener un token.
2. Incluir el token en el encabezado de las solicitudes protegidas:

   ```http
   Authorization: Bearer <token>
   ```

## Autor

-  Nico Picotto
