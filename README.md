cat > README.md <<'EOF'

# PokeRockerDex Frontend

Interfaz de PokeRockerDex, una aplicación full stack que permite explorar información de Pokémon mediante PokéAPI y crear un equipo personal de hasta seis integrantes.

## Estado del proyecto

Proyecto Final de Desarrollo Web de TripleTen. Actualmente se encuentra en la etapa de planificación y preparación.

## Funcionalidades previstas

- Explorar Pokémon en páginas de 20 resultados.
- Buscar Pokémon por nombre o número.
- Consultar información detallada.
- Registrar e iniciar sesión.
- Crear un equipo personal.
- Agregar hasta seis Pokémon sin duplicados.
- Editar el nombre del equipo.
- Eliminar integrantes.

## Rutas previstas

- `/` — exploración y búsqueda.
- `/pokemon/:id` — información detallada.
- `/my-team` — equipo personal protegido.

## Tecnologías previstas

- React
- Vite
- React Router
- JavaScript
- CSS con metodología BEM
- PokéAPI
- API propia de PokeRockerDex

## Instalación

```bash
git clone git@github.com:ai-sprvvnt/pokerockerdex-frontend.git
cd pokerockerdex-frontend
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## API externa

La Pokédex utiliza la API externa PokéAPI (https://pokeapi.co/) para obtener información sobre los Pokémon.

## Back-end

El backend de PokeRockerDex se encuentra en el repositorio https://github.com/ai-sprvvnt/pokerockerdex-backend

## Aviso

PokeRockerDex es un proyecto educativo no oficial. No está afiliado, respaldado ni patrocinado por Nintendo, Game Freak, Creatures Inc. o The Pokémon Company.

## Autor

- [Felipe García](https://github.com/ai-sprvvnt)
- [Correo]: [ai.sprvvnt@gmail.com]
