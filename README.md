# PokeRockerDex Frontend

Frontend de **PokeRockerDex**, una aplicación full stack desarrollada como Proyecto Final de Desarrollo Web de TripleTen.

La aplicación permite explorar Pokémon mediante PokéAPI, realizar búsquedas por nombre o número, consultar información detallada y formar temporalmente un equipo personal de hasta seis Pokémon mediante la API propia de PokeRockerDex.

## Estado del proyecto

La interfaz de React, la integración con PokéAPI y la integración mínima con la API propia están implementadas.

Actualmente el proyecto se encuentra finalizando las correcciones de la **Etapa 1.2 — Integración con API** después de la primera revisión de TripleTen.

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

La ruta `/my-team` consume actualmente la API propia de PokeRockerDex.

Desde la vista de detalle de un Pokémon es posible utilizar **Agregar a mi equipo**, lo que realiza una solicitud:

`POST /teams/pokemon`

El equipo puede consultarse mediante:

`GET /teams`

Durante esta etapa el equipo se mantiene temporalmente en memoria dentro del servidor.

Reglas implementadas:

- máximo de seis Pokémon;
- no se permiten integrantes duplicados;
- los errores HTTP del backend se muestran en la interfaz;
- `/my-team` refleja los datos recibidos desde la API propia.

La persistencia mediante MongoDB, autenticación, usuarios y eliminación definitiva de integrantes pertenecen a etapas posteriores.

## Funcionalidades pendientes

Las siguientes funcionalidades pertenecen a etapas posteriores del proyecto:

- registro de usuarios;
- inicio de sesión;
- autenticación mediante JWT;
- protección de `/my-team`;
- persistencia del equipo mediante base de datos;
- asociación de equipos con usuarios;
- eliminación de integrantes mediante la API propia;
- despliegue final coordinado del frontend y backend.

## Rutas

| Ruta           | Estado                | Descripción                                         |
| -------------- | --------------------- | --------------------------------------------------- |
| `/`            | Pública               | Exploración paginada y búsqueda de Pokémon          |
| `/pokemon/:id` | Pública               | Información detallada y agregado temporal al equipo |
| `/my-team`     | Temporalmente pública | Equipo obtenido desde la API propia                 |
| `*`            | Pública               | Página 404                                          |

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

- `GET /teams` para consultar el equipo;
- `POST /teams/pokemon` para agregar un Pokémon.

El backend valida los datos recibidos, impide duplicados y limita el equipo a seis integrantes.

Durante la Etapa 1.2 los datos se almacenan temporalmente en memoria. La persistencia definitiva se implementará posteriormente mediante base de datos.

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

- `GET /teams`;
- `POST /teams/pokemon`;
- validación de datos;
- prevención de duplicados;
- límite de seis Pokémon.

El equipo se almacena temporalmente en memoria. MongoDB, autenticación y persistencia por usuario pertenecen a etapas posteriores.

## Repositorio

[Repositorio del frontend](https://github.com/ai-sprvvnt/pokerockerdex-frontend)

## Deploy

El despliegue público final se encuentra pendiente.

Actualmente el frontend y el backend se ejecutan de forma local durante el desarrollo y las pruebas de la Etapa 1.2.

El despliegue coordinado de ambos servicios se realizará en una etapa posterior, cuando se implemente la persistencia definitiva y la configuración de producción.

## Aviso

PokeRockerDex es un proyecto educativo no oficial.

No está afiliado, respaldado ni patrocinado por Nintendo, Game Freak, Creatures Inc. o The Pokémon Company.

## Autor

[Felipe García](https://github.com/ai-sprvvnt)
