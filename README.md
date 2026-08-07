# PokeRockerDex Frontend

Frontend de **PokeRockerDex**, una aplicación full stack desarrollada como Proyecto Final de Desarrollo Web de TripleTen.

La aplicación permite explorar Pokémon mediante PokéAPI, realizar búsquedas por nombre o número y consultar información detallada. En etapas posteriores incorporará autenticación y persistencia de un equipo personal mediante una API propia.

## Estado del proyecto

La interfaz base de React y la integración con PokéAPI están implementadas.

Actualmente el proyecto se encuentra finalizando la **Etapa 1.2 — Integración con API**.

### Implementado

- Exploración de Pokémon reales mediante PokéAPI.
- 20 Pokémon por página.
- Paginación con controles Anterior y Siguiente.
- Búsqueda por nombre o número.
- Detalle individual de Pokémon.
- Imagen, tipos, altura, peso, habilidades y estadísticas base.
- Estados de carga mediante preloader.
- Manejo diferenciado de resultados inexistentes y errores de red.
- Botón de reintento.
- Cancelación de solicitudes mediante `AbortController`.
- Caché de páginas en `localStorage`.
- TTL de caché de 24 horas.
- Validación y eliminación de entradas de caché corruptas.
- Uso de caché expirada como contingencia cuando PokéAPI no responde.
- Actualización desde la red cuando existen datos válidos almacenados.
- Fallback visual cuando una imagen Pokémon no puede cargarse.
- Interfaz responsiva desde 320 px.
- Página 404 para rutas inexistentes.
- Vista temporal de equipo personal.

## Equipo personal

La ruta `/my-team` funciona actualmente como una **demostración local de interfaz**.

Utiliza un fixture temporal con Pokémon de ejemplo para probar:

- un equipo de hasta seis integrantes;
- posiciones disponibles;
- eliminación local de integrantes;
- interfaz de tarjetas del equipo.

La autenticación, protección de la ruta y persistencia real del equipo se implementarán en etapas posteriores.

## Funcionalidades pendientes

Las siguientes funcionalidades pertenecen a etapas posteriores del proyecto:

- registro de usuarios;
- inicio de sesión;
- autenticación mediante JWT;
- protección de `/my-team`;
- API propia de PokeRockerDex;
- persistencia del equipo;
- agregar Pokémon al equipo desde la exploración o detalle;
- impedir duplicados mediante la API propia;
- despliegue final del frontend y backend.

## Rutas

| Ruta | Estado | Descripción |
|---|---|---|
| `/` | Pública | Exploración, búsqueda y paginación |
| `/pokemon/:id` | Pública | Información detallada de un Pokémon |
| `/my-team` | Temporalmente pública | Demostración local del equipo personal |
| `*` | Pública | Página 404 |

## PokéAPI

PokeRockerDex utiliza [PokéAPI](https://pokeapi.co/) como API externa para obtener información de los Pokémon.

Las solicitudes se realizan mediante `fetch()` desde un cliente separado en:

```text
src/utils/PokeApi.js
```

El cliente:

- valida `response.ok`;
- transforma los datos recibidos para la interfaz;
- diferencia errores HTTP;
- permite cancelación mediante `AbortSignal`.

## Caché y resiliencia

Las páginas de exploración se almacenan temporalmente en `localStorage` con un TTL de 24 horas.

Prefijo utilizado:

```text
pokerockerdex:pokemon-page:
```

La aplicación:

- muestra datos almacenados mientras comprueba actualizaciones;
- elimina entradas con JSON corrupto;
- no presenta una entrada expirada como información actual;
- puede utilizar una entrada expirada como fallback si falla la red;
- permite reintentar una solicitud;
- muestra un fallback visual cuando una imagen no puede cargarse.

La caché almacena datos y URLs de imágenes, no los archivos de imagen.

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
│   ├── cache.js
│   ├── constants.js
│   └── teamFixture.js
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
- comportamiento responsivo.

## Back-end

El backend de PokeRockerDex se desarrolla en un repositorio independiente:

https://github.com/ai-sprvvnt/pokerockerdex-backend

Su implementación corresponde a una etapa posterior del proyecto.

## Repositorio

https://github.com/ai-sprvvnt/pokerockerdex-frontend

## Aviso

PokeRockerDex es un proyecto educativo no oficial.

No está afiliado, respaldado ni patrocinado por Nintendo, Game Freak, Creatures Inc. o The Pokémon Company.

## Autor

[Felipe García](https://github.com/ai-sprvvnt)
