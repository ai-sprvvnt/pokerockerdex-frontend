# PokeRockerDex Frontend

Frontend de **PokeRockerDex**, una aplicación full stack desarrollada como Proyecto Final de Desarrollo Web de TripleTen.

La aplicación permite explorar Pokémon mediante PokéAPI, realizar búsquedas por nombre o número, consultar información detallada y formar un equipo personal persistente de hasta seis Pokémon mediante la API propia de PokeRockerDex.

## Estado del proyecto

La interfaz de React, la integración con PokéAPI y la integración mínima con la API propia están implementadas.

Actualmente el proyecto se encuentra en la **Etapa 3 — Autorización con React**.
La etapa 1 y la etapa 2 se encuentran aprobadas y cerradas. Durante esta etapa se está implementando en el frontend el registro, inicio de sesión, persistencia de sesión mediante JWT, rutas protegidas y gestión autenticada del equipo personal.

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
- Solicitud POST asíncrona real hacia la API propia de PokeRockerDex.
- Agregado de Pokémon al equipo desde la vista de detalle.
- Prevención de Pokémon duplicados en el backend.
- Límite máximo de seis integrantes.
- Consulta del equipo mediante `GET /teams`.
- Vista `/my-team` alimentada por la API propia.
- Manejo de error y reintento al consultar el equipo.
- Interfaz responsiva desde 320 px.
- Página 404 para rutas inexistentes.

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
- los errores HTTP del backend se muestran en la interfaz;
- `/my-team` refleja los datos persistidos por la API propia.

## Funcionalidades pendientes

La Etapa 3 se encuentra en desarrollo.

Pendientes principales:

- completar los ajustes finales de autorización solicitados por la rúbrica;
- finalizar QA responsivo de autenticación;
- actualizar documentación de la Etapa 3;
- desplegar la versión actualizada del frontend;
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

Actualmente utiliza:

- `POST /signup` para registrar usuarios;
- `POST /signin` para iniciar sesión;
- `GET /users/me` para recuperar al usuario autenticado;
- `GET /teams` para consultar el equipo;
- `POST /teams/pokemon` para agregar un Pokémon;
- `DELETE /teams/pokemon/:id` para eliminar un integrante.

Las rutas protegidas utilizan:

`Authorization: Bearer <JWT>`

El backend utiliza MongoDB para persistir usuarios y equipos, y cada Pokémon guardado queda asociado a su propietario.

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
- `localStorage`
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
│   ├── App/
│   ├── ErrorMessage/
│   ├── Header/
│   ├── Home/
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
│   ├── SearchForm/
│   ├── TeamPokemonCard/
│   └── TeamSlot/
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
- comportamiento responsivo;
- búsqueda con múltiples coincidencias;
- patrón Mostrar más 3 + 3;
- restauración de última búsqueda;
- POST exitoso al equipo;
- prevención de duplicados;
- límite máximo de seis Pokémon;
- carga del equipo desde la API propia;
- error de backend y reintento en `/my-team`;

## Back-end

El backend de PokeRockerDex se desarrolla en un repositorio independiente:

[Repositorio del backend](https://github.com/ai-sprvvnt/pokerockerdex-backend)

Para completar los requisitos de integración de la Etapa 1.2 se implementó una API mínima con Node.js y Express.

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

- `GET /teams`;
- `POST /teams/pokemon`.

## Aviso

PokeRockerDex es un proyecto educativo no oficial.

No está afiliado, respaldado ni patrocinado por Nintendo, Game Freak, Creatures Inc. o The Pokémon Company.

## Autor

[Felipe García](https://github.com/ai-sprvvnt)
