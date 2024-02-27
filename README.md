# Como ejecutar el programa

## Configuracion automatica:

He creado un archivo generico, para poder hacer que se instalen y se generen todas las variables de entrono para poder correr el programa.
Esto con el fin de poder ejecutar senciallamente el programa. La configuración correcta seria crear estos archivos manualmente para poder evitar cualquier tipo de incoveniente con las variables de entorno y DB

> [!NOTE]  
> Porfavor correr este comando una sola vez, de ser necesario volver a correr el servidor, correr `npm run dev`


```bash
npm run easy
```
## Configuracion manual

Para ejecutar este programa es necesario instalar las dependencias primero

```bash
npm i
```

Ademas de eso, es necesario crear el archivo `.env`, en donde se encuentran las variables de entorno.

```bash
touch .env
```

En el archivo `.env` es necesario setear estas variables de entorno

```
MONGODB_CNN='<DB_NAME>'
JWT_SECRET='<SECRET_JWT_TOKEN>'
```

para ejecutar nuestra aplicacion podemos usar

```bash
npm run dev
```

o tambien:

```bash
npx nodemon ./src/server.js
```

# API Docs

Esta es la documentación de la API para un sistema de gestión de cursos y usuarios.

## Endpoints

### Usuarios

#### Obtener todos los usuarios

- URL: `/api/user`
- Método: `GET`
- Query Params:
  - `page` - Número de página de resultados (opcional, debe ser número si se proporciona)
  - `limit` - Límite de resultados por página (opcional, debe ser número si se proporciona)
  - `role` - Filtro por rol de usuario (`TEACHER` o `STUDENT`) (opcional)
- Requiere token de autenticación: No
- Permisos requeridos: Ninguno
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con arreglo de objetos de usuario

#### Obtener usuario por ID

- URL: `/api/user/:id`
- Método: `GET`
- URL Params:
  - `id` - ID de MongoDB del usuario (obligatorio)
- Requiere token de autenticación: No
- Permisos requeridos: Ninguno
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con objeto de usuario

#### Actualizar usuario por ID

- URL: `/api/user/:id`
- Método: `PUT`
- URL Params:
  - `id` - ID de MongoDB del usuario (obligatorio)
- Headers:
  - `token` - Token JWT de autenticación (obligatorio)
- Requiere token de autenticación: Sí
- Permisos requeridos:
  - Usuario autenticado debe tener rol `TEACHER`
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con mensaje de confirmación

#### Eliminar usuario por ID

- URL: `/api/user/:id`
- Método: `DELETE`
- URL Params:
  - `id` - ID de MongoDB del usuario (obligatorio)
- Headers:
  - `token` - Token JWT de autenticación (obligatorio)
- Requiere token de autenticación: Sí
- Permisos requeridos:
  - Usuario autenticado debe tener rol `TEACHER`
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con mensaje de confirmación

### Cursos

#### Obtener todos los cursos

- URL: `/api/course`
- Método: `GET`
- Requiere token de autenticación: No
- Permisos requeridos: Ninguno
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con arreglo de objetos de curso

#### Obtener curso por ID

- URL: `/api/course/:id`
- Método: `GET`
- URL Params:
  - `id` - ID de MongoDB del curso (obligatorio)
- Requiere token de autenticación: No
- Permisos requeridos: Ninguno
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con objeto de curso

#### Crear curso

- URL: `/api/course`
- Método: `POST`
- Headers:
  - `token` - Token JWT de autenticación (obligatorio)
- Body:
  - `title` - Título del curso (obligatorio, mínimo 2 caracteres)
  - `description` - Descripción del curso (obligatorio, mínimo 2 caracteres )
  - `teacher` - ID de MongoDB del profesor (obligatorio)
- Requiere token de autenticación: Sí
- Permisos requeridos:
  - Usuario autenticado debe tener rol `TEACHER`
- Respuesta exitosa:
  - Código: 201
  - Contenido: JSON con objeto de curso creado

#### Actualizar curso por ID

- URL: `/api/course/:id`
- Método: `PUT`
- URL Params:
  - `id` - ID de MongoDB del curso (obligatorio)
- Headers:
  - `token` - Token JWT de autenticación (obligatorio)
- Body:
  - `title` - Título del curso (opcional, mínimo 2 caracteres si se proporciona)
  - `description` - Descripción del curso (opcional, mínimo 2 caracteres si se proporciona)
  - `teacher` - ID de MongoDB del profesor (obligatorio)
- Requiere token de autenticación: Sí
- Permisos requeridos:
  - Usuario autenticado debe tener rol `TEACHER`
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con mensaje de confirmación

#### Eliminar curso por ID

- URL: `/api/course/:id`
- Método: `DELETE`
- URL Params:
  - `id` - ID de MongoDB del curso (obligatorio)
- Headers:
  - `token` - Token JWT de autenticación (obligatorio)
- Requiere token de autenticación: Sí
- Permisos requeridos:
  - Usuario autenticado debe tener rol `TEACHER`
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con mensaje de confirmación

### Inscripciones

#### Obtener todas las inscripciones

- URL: `/api/enrollment`
- Método: `GET`
- Requiere token de autenticación: No
- Permisos requeridos: Ninguno
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con arreglo de objetos de inscripción

#### Inscribir estudiante a curso

- URL: `/api/enrollment/:course`
- Método: `POST`
- URL Params:
  - `course` - ID del curso de MongoDB (obligatorio)
- Headers:
  - `token` - Token JWT de autenticación (obligatorio)
- Body:
  - `student` - ID de MongoDB del estudiante (obligatorio)
- Requiere token de autenticación: Sí
- Permisos requeridos:
  - Usuario autenticado debe tener rol `TEACHER` o `STUDENT`
  - Estudiante no debe estar ya inscrito en el curso
  - Estudiante no debe tener 3 cursos ya inscritos
- Respuesta exitosa:
  - Código: 201
  - Contenido: JSON con objeto de inscripción creado

#### Eliminar inscripción de estudiante a curso

- URL: `/api/enrollment/:course`
- Método: `DELETE`
- URL Params:
  - `course` - ID del curso de MongoDB (obligatorio)
- Headers:
  - `token` - Token JWT de autenticación (obligatorio)
- Body:
  - `student` - ID de MongoDB del estudiante (obligatorio)
- Requiere token de autenticación: Sí
- Permisos requeridos:
  - Usuario autenticado debe tener rol `TEACHER` o `STUDENT`
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con mensaje de confirmación

### Autenticación

#### Login

- URL: `/api/auth/login`
- Método: `POST`
- Body:
  - `email` - Correo electrónico del usuario (obligatorio)
  - `password` - Contraseña del usuario (obligatorio)
- Requiere token de autenticación: No
- Respuesta exitosa:
  - Código: 200
  - Contenido:
    - `user`: Objeto de usuario
    - `token`: Token JWT

#### Registro

- URL: `/api/auth/signup`
- Método: `POST`
- Body:
  - `name` - Nombre de usuario (obligatorio, mínimo 3 caracteres)
  - `email` - Correo electrónico (obligatorio)
  - `password` - Contraseña (obligatorio, mínimo 3 caracteres)
  - `role` - Rol de usuario (`TEACHER` o `STUDENT`)
- Requiere token de autenticación: No
- Respuesta exitosa:
  - Código: 201
  - Contenido: Mensaje de confirmación
