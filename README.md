# PokeRockerDex Frontend

Frontend de **PokeRockerDex**, una aplicación full stack desarrollada como Proyecto Final de Desarrollo Web de TripleTen.

La aplicación permite explorar Pokémon mediante PokéAPI, realizar búsquedas por nombre o número, consultar información detallada y formar un equipo personal persistente de hasta seis Pokémon mediante la API propia de PokeRockerDex.

## Estado del proyecto

La interfaz de React, la integración con PokéAPI, la autenticación y la integración con la API propia de PokeRockerDex están implementadas.

Actualmente el proyecto se encuentra en la **Etapa 3 — Autorización con React**.

Las Etapas 1 y 2 se encuentran aprobadas y cerradas. La implementación de la Etapa 3 está completada y validada localmente, incluyendo registro, inicio de sesión, persistencia de sesión mediante JWT, rutas protegidas y gestión autenticada del equipo personal.

Quedan pendientes el despliegue actualizado del frontend, la validación pública, la apertura del pull request `stage-react-auth -> main` y la revisión final de TripleTen.

### Implementado

- Exploración de Pokémon reales mediante PokéAPI.
- 20 Pokémon por página en el modo de exploración.
- Paginación con controles Anterior y Siguiente.
- Búsqueda por nombre, coincidencia parcial o número.
- Bloque explícito de resultados de búsqueda.
- Tres resultados iniciales en búsquedas con múltiples coincidencias.
- Botón **Mostrar más** que añade hasta tres resultados por acción.
- Ocultamiento automático de **Mostrar más** al finalizar los resultados.
- Restauración de la última búsqueda mediante `localStorage`.
- Detalle individual de Pokémon.
- Imagen, tipos, altura, peso, habilidades y estadísticas base.
- Estados de carga mediante preloader.
- Manejo diferenciado de resultados inexistentes y errores de red.
- Botón de reintento.
- Cancelación de solicitudes mediante `AbortController`.
- Caché de páginas de exploración en `localStorage`.
- TTL de caché de 24 horas.
- Validación y eliminación de entradas de caché corruptas.
- Uso de caché expirada como contingencia cuando PokéAPI no responde.
- Fallback visual cuando una imagen Pokémon no puede cargarse.
- Registro de usuarios mediante la API propia.
- Inicio de sesión mediante correo electrónico y contraseña.
- Almacenamiento del JWT en `localStorage`.
- Restauración automática de sesión mediante `GET /users/me`.
- Cierre de sesión y eliminación del JWT.
- Protección de la ruta `/my-team`.
- Apertura del modal de inicio de sesión al intentar acceder a una función protegida sin autenticación.
- Prevención del `POST /teams/pokemon` cuando un usuario no autenticado intenta agregar un Pokémon.
- Consulta del equipo mediante `GET /teams`.
- Agregado de Pokémon mediante `POST /teams/pokemon`.
- Eliminación de integrantes mediante `DELETE /teams/pokemon/:id`.
- Persistencia del equipo en MongoDB.
- Asociación del equipo con el usuario propietario.
- Prevención de Pokémon duplicados.
- Límite máximo de seis integrantes.
- Manejo de errores HTTP enviados por la API propia.
- Transición `Eye ↔ EyeOff` para mostrar u ocultar contraseñas.
- Transición `Plus → Check` después de agregar correctamente un Pokémon.
- Respeto de `prefers-reduced-motion` en las transiciones.
- Identidad visual propia de PokeRockerDex mediante favicon y Apple Touch Icon.
- Interfaz responsiva desde 320 px.
- Página 404 para rutas inexistentes.

## Autenticación y sesión

PokeRockerDex utiliza autenticación basada en JWT.

El registro se realiza mediante:

`POST /signup`

El inicio de sesión se realiza mediante:

`POST /signin`

Después de una autenticación correcta, el token JWT se almacena en `localStorage`.

La aplicación utiliza:

`GET /users/me`

para recuperar al usuario asociado al token y restaurar automáticamente la sesión después de recargar la página.

Las solicitudes protegidas utilizan:

`Authorization: Bearer <JWT>`

Al cerrar sesión:

- se elimina el JWT almacenado;
- se limpia el estado del usuario autenticado;
- las rutas protegidas dejan de estar disponibles.

La ruta `/my-team` se protege desde React. Un usuario sin sesión válida no puede acceder al equipo personal.

Si un usuario no autenticado intenta agregar un Pokémon desde su vista de detalle, la aplicación abre el modal de inicio de sesión y no realiza la solicitud `POST /teams/pokemon`.

## Equipo personal

La ruta `/my-team` consume la API propia de PokeRockerDex y está protegida mediante autorización.

Desde la vista de detalle de un Pokémon es posible utilizar **Agregar a mi equipo**, lo que realiza:

`POST /teams/pokemon`

El equipo puede consultarse mediante:

`GET /teams`

Un integrante puede eliminarse mediante:

`DELETE /teams/pokemon/:id`

Todas estas solicitudes utilizan el JWT del usuario autenticado.

El equipo se almacena de forma persistente en MongoDB y está asociado al usuario propietario.

Reglas implementadas:

- máximo de seis Pokémon;
- no se permiten integrantes duplicados por usuario;
- cada usuario mantiene su propio equipo;
- solamente el propietario puede administrar sus recursos;
- los errores HTTP del backend se muestran en la interfaz;
- `/my-team` refleja los datos persistidos por la API propia.

## Funcionalidades pendientes

La implementación local de la Etapa 3 está completada.

Pendientes para cerrar la entrega:

- generar el build productivo con la URL de la API de producción;
- desplegar la versión actualizada del frontend;
- validar públicamente autenticación y gestión del equipo;
- abrir el pull request `stage-react-auth -> main`;
- completar la revisión de TripleTen.

## Rutas

| Ruta           | Estado    | Descripción                                                     |
| -------------- | --------- | --------------------------------------------------------------- |
| `/`            | Pública   | Exploración paginada y búsqueda de Pokémon                      |
| `/pokemon/:id` | Pública   | Información detallada; agregar al equipo requiere autenticación |
| `/my-team`     | Protegida | Equipo personal del usuario autenticado                         |
| `*`            | Pública   | Página 404                                                      |

## PokéAPI

PokeRockerDex utiliza [PokéAPI](https://pokeapi.co/) como API externa para obtener información de los Pokémon.

Las solicitudes se realizan mediante `fetch()` desde:

`src/utils/PokeApi.js`

El cliente:

- valida `response.ok`;
- transforma los datos recibidos para la interfaz;
- diferencia errores HTTP;
- permite cancelación mediante `AbortSignal`.

## API propia de PokeRockerDex

Además de PokéAPI, el frontend utiliza un backend propio desarrollado con Node.js y Express.

El cliente se encuentra en:

`src/utils/MainApi.js`

Endpoints utilizados:

- `POST /signup` para registrar usuarios;
- `POST /signin` para iniciar sesión;
- `GET /users/me` para recuperar al usuario autenticado;
- `GET /teams` para consultar el equipo;
- `POST /teams/pokemon` para agregar un Pokémon;
- `DELETE /teams/pokemon/:id` para eliminar un integrante.

Las rutas protegidas utilizan:

`Authorization: Bearer <JWT>`

El backend utiliza MongoDB para persistir usuarios y equipos, y cada Pokémon guardado queda asociado a su propietario.

## Configuración de la API

El cliente de la API propia utiliza la variable de entorno:

`VITE_API_BASE_URL`

Para desarrollo puede configurarse, por ejemplo:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Si la variable no está definida, el frontend utiliza como fallback:

```text
http://localhost:3001
```

Otra opción para desarrollo es iniciar el backend explícitamente en ese puerto:

```bash
PORT=3001 npm run dev
```

Para producción se utiliza:

```env
VITE_API_BASE_URL=https://api.sprvvnt.mooo.com
```

## Caché y resiliencia

Las páginas de exploración se almacenan temporalmente en `localStorage` con un TTL de 24 horas.

Prefijo utilizado:

`pokerockerdex:pokemon-page:`

La aplicación:

- muestra datos almacenados mientras comprueba actualizaciones;
- elimina entradas con JSON corrupto;
- no presenta una entrada expirada como información actual;
- puede utilizar una entrada expirada como fallback si falla la red;
- permite reintentar una solicitud;
- muestra un fallback visual cuando una imagen no puede cargarse.

La última búsqueda se almacena por separado utilizando:

`pokerockerdex:last-search`

Se conservan la consulta, los resultados necesarios y la cantidad actualmente visible para restaurar el estado de búsqueda después de recargar la aplicación.

## Tecnologías

- React 19
- React DOM 19
- React Router 8
- Vite 8
- JavaScript
- CSS
- metodología BEM
- Flexbox
- CSS Grid
- PokéAPI
- `fetch()`
- `localStorage`
- JWT
- Morphicons
- Lucide
- ESLint

## Instalación

Clona el repositorio:

```bash
git clone git@github.com:ai-sprvvnt/pokerockerdex-frontend.git
cd pokerockerdex-frontend
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Si se utiliza el backend local en su puerto predeterminado, configura previamente:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Scripts

### Desarrollo

```bash
npm run dev
```

### ESLint

```bash
npm run lint
```

### Build de producción

```bash
npm run build
```

### Vista previa del build

```bash
npm run preview
```

## Estructura principal

```text
src/
├── components/
│   ├── About/
│   ├── App/
│   ├── EmptyTeam/
│   ├── ErrorMessage/
│   ├── Footer/
│   ├── Header/
│   ├── Home/
│   ├── Login/
│   ├── Main/
│   ├── MyTeam/
│   ├── Navigation/
│   ├── NotFound/
│   ├── NothingFound/
│   ├── Pagination/
│   ├── PokemonCard/
│   ├── PokemonCardList/
│   ├── PokemonDetail/
│   ├── PokemonImage/
│   ├── Preloader/
│   ├── ProtectedRoute/
│   ├── Register/
│   ├── RegistrationSuccess/
│   ├── SearchForm/
│   ├── TeamPokemonCard/
│   └── TeamSlot/
├── contexts/
│   └── CurrentUserContext.js
├── images/
├── utils/
│   ├── PokeApi.js
│   ├── MainApi.js
│   ├── constants.js
│   └── cache.js
├── vendor/
├── index.css
└── main.jsx
```

## Responsive

La interfaz está diseñada para funcionar desde dispositivos móviles hasta escritorio.

Durante las pruebas se revisaron los siguientes anchos:

```text
320 px
480 px
768 px
1024 px
1440 px
```

En esos tamaños no se detectó overflow horizontal.

La navegación adapta su distribución en pantallas pequeñas para mantener visibles y accesibles las opciones de autenticación y navegación.

## Calidad

Antes de integrar cambios se utilizan:

```bash
npm run lint
npm run build
git diff --check
```

También se han probado:

- búsqueda válida e inexistente;
- error de red;
- reintento;
- caché válida;
- caché corrupta;
- caché expirada;
- imágenes faltantes;
- conexión 3G simulada;
- navegación entre rutas;
- página 404;
- comportamiento responsivo desde 320 px;
- ausencia de overflow horizontal en móvil;
- búsqueda con múltiples coincidencias;
- patrón Mostrar más 3 + 3;
- restauración de última búsqueda;
- registro exitoso;
- prevención de registro duplicado;
- inicio de sesión válido;
- inicio de sesión con credenciales incorrectas;
- almacenamiento del JWT;
- recuperación del usuario mediante `GET /users/me`;
- restauración de sesión después de recargar;
- cierre de sesión;
- eliminación del JWT al cerrar sesión;
- protección de `/my-team`;
- acceso autenticado a `/my-team`;
- intento de agregar un Pokémon sin sesión;
- apertura del modal de Login sin ejecutar el POST protegido;
- POST exitoso al equipo;
- transición `Plus → Check` después de un POST exitoso;
- prevención de duplicados mediante respuesta `409`;
- conservación de `Plus` cuando el POST falla;
- límite máximo de seis Pokémon;
- carga del equipo desde la API propia;
- eliminación de integrantes del equipo;
- actualización de la interfaz después de eliminar;
- error de backend y reintento en `/my-team`;
- comportamiento de `Eye ↔ EyeOff`;
- respeto de `prefers-reduced-motion`.

## Back-end

El backend de PokeRockerDex se desarrolla en un repositorio independiente:

[Repositorio del backend](https://github.com/ai-sprvvnt/pokerockerdex-backend)

El backend definitivo está desarrollado con Node.js, Express y MongoDB.

Actualmente proporciona:

- `POST /signup`;
- `POST /signin`;
- `GET /users/me`;
- `GET /teams`;
- `POST /teams/pokemon`;
- `DELETE /teams/pokemon/:id`;
- autenticación mediante JWT;
- persistencia mediante MongoDB;
- asociación de recursos por usuario;
- prevención de duplicados;
- límite de seis Pokémon;
- ownership al eliminar integrantes.

## Repositorio

[Repositorio del frontend](https://github.com/ai-sprvvnt/pokerockerdex-frontend)

## Deploy

PokeRockerDex se encuentra desplegado públicamente en una VM de Google Cloud.

### Frontend

https://sprvvnt.mooo.com

El frontend React/Vite se compila para producción y se sirve mediante Nginx con HTTPS y fallback para las rutas de React Router.

### API propia

https://api.sprvvnt.mooo.com

La API propia utiliza el backend definitivo de PokeRockerDex con Node.js, Express, MongoDB, autenticación JWT y persistencia por usuario. Se ejecuta mediante PM2 y se expone a través de Nginx con HTTPS.

Endpoints disponibles:

- `POST /signup`;
- `POST /signin`;
- `GET /users/me`;
- `GET /teams`;
- `POST /teams/pokemon`;
- `DELETE /teams/pokemon/:id`.

## Aviso

PokeRockerDex es un proyecto educativo no oficial.

No está afiliado, respaldado ni patrocinado por Nintendo, Game Freak, Creatures Inc. o The Pokémon Company.

## Autor

[Felipe García](https://github.com/ai-sprvvnt)
