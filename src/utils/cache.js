import {
  POKEMON_PAGE_CACHE_PREFIX,
  POKEMON_PAGE_CACHE_TTL,
} from './constants.js';

const getPokemonPageCacheKey = (page) => `${POKEMON_PAGE_CACHE_PREFIX}${page}`;

const isValidPokemon = (pokemon) =>
  pokemon !== null &&
  typeof pokemon === 'object' &&
  Number.isInteger(pokemon.id) &&
  typeof pokemon.name === 'string' &&
  typeof pokemon.image === 'string' &&
  Array.isArray(pokemon.types) &&
  pokemon.types.every((type) => typeof type === 'string');

const isValidCacheEntry = (cacheEntry) =>
  cacheEntry !== null &&
  typeof cacheEntry === 'object' &&
  Number.isFinite(cacheEntry.timestamp) &&
  Number.isFinite(cacheEntry.count) &&
  cacheEntry.count >= 0 &&
  Array.isArray(cacheEntry.pokemon) &&
  cacheEntry.pokemon.every(isValidPokemon);

function getPokemonPageCache(page, { allowExpired = false } = {}) {
  const cacheKey = getPokemonPageCacheKey(page);

  try {
    const storedValue = localStorage.getItem(cacheKey);

    if (!storedValue) {
      return null;
    }

    const cacheEntry = JSON.parse(storedValue);

    if (!isValidCacheEntry(cacheEntry)) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    const isExpired =
      Date.now() - cacheEntry.timestamp > POKEMON_PAGE_CACHE_TTL;

    if (isExpired && !allowExpired) {
      return null;
    }

    return {
      count: cacheEntry.count,
      pokemon: cacheEntry.pokemon,
      timestamp: cacheEntry.timestamp,
      isExpired,
    };
  } catch {
    localStorage.removeItem(cacheKey);
    return null;
  }
}

function setPokemonPageCache(page, { count, pokemon }) {
  const cacheKey = getPokemonPageCacheKey(page);

  const cacheEntry = {
    timestamp: Date.now(),
    count,
    pokemon,
  };

  if (!isValidCacheEntry(cacheEntry)) {
    return false;
  }

  try {
    localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
    return true;
  } catch {
    return false;
  }
}

export { getPokemonPageCache, getPokemonPageCacheKey, setPokemonPageCache };
