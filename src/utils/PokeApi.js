const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';
const DEFAULT_PAGE_LIMIT = 20;

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  const error = new Error(
    `La solicitud a PokéAPI falló con el estado ${response.status}.`,
  );

  error.status = response.status;

  throw error;
}

async function getPokemonByUrl(url, signal) {
  const response = await fetch(url, { signal });

  return checkResponse(response);
}

function transformPokemon(pokemonData) {
  return {
    id: pokemonData.id,
    name: pokemonData.name,
    image:
      pokemonData.sprites.other?.['official-artwork']?.front_default ??
      pokemonData.sprites.front_default ??
      '',
    types: pokemonData.types.map(({ type }) => type.name),
  };
}

async function getPokemonPage({
  limit = DEFAULT_PAGE_LIMIT,
  offset = 0,
  signal,
} = {}) {
  const searchParams = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon?${searchParams.toString()}`,
    { signal },
  );

  const pageData = await checkResponse(response);

  const pokemonDetails = await Promise.all(
    pageData.results.map(({ url }) => getPokemonByUrl(url, signal)),
  );

  return {
    count: pageData.count,
    pokemon: pokemonDetails.map(transformPokemon),
  };
}

async function getPokemonByNameOrId(query, signal) {
  const normalizedQuery = String(query).trim().toLowerCase();

  if (!normalizedQuery) {
    const error = new Error('Escribe el nombre o número de un Pokémon.');

    error.status = 400;

    throw error;
  }

  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon/${encodeURIComponent(normalizedQuery)}`,
    { signal },
  );

  const pokemonData = await checkResponse(response);

  return transformPokemon(pokemonData);
}

export {
  POKE_API_BASE_URL,
  getPokemonPage,
  getPokemonByNameOrId,
  transformPokemon,
};
