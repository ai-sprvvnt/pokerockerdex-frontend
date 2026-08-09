import {
  LAST_SEARCH_CACHE_KEY,
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

const isValidSearchReference = (reference) =>
  reference !== null &&
  typeof reference === 'object' &&
  typeof reference.name === 'string' &&
  reference.name.length > 0 &&
  typeof reference.url === 'string' &&
  reference.url.length > 0;

const isValidLastSearchEntry = (cacheEntry) => {
  if (
    cacheEntry === null ||
    typeof cacheEntry !== 'object' ||
    !Number.isFinite(cacheEntry.timestamp) ||
    typeof cacheEntry.query !== 'string' ||
    cacheEntry.query.length === 0 ||
    !Array.isArray(cacheEntry.results) ||
    !cacheEntry.results.every(isValidPokemon) ||
    !Array.isArray(cacheEntry.searchMatches) ||
    !cacheEntry.searchMatches.every(isValidSearchReference) ||
    !Number.isInteger(cacheEntry.visibleCount) ||
    cacheEntry.visibleCount < 0 ||
    !Number.isInteger(cacheEntry.totalPokemon) ||
    cacheEntry.totalPokemon < 0
  ) {
    return false;
  }

  if (cacheEntry.visibleCount !== cacheEntry.results.length) {
    return false;
  }

  if (cacheEntry.totalPokemon < cacheEntry.results.length) {
    return false;
  }

  if (cacheEntry.searchMatches.length > 0) {
    return (
      cacheEntry.searchMatches.length === cacheEntry.totalPokemon &&
      cacheEntry.visibleCount <= cacheEntry.searchMatches.length
    );
  }

  return cacheEntry.totalPokemon === cacheEntry.results.length;
};

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

function getLastSearchCache() {
  try {
    const storedValue = localStorage.getItem(LAST_SEARCH_CACHE_KEY);

    if (!storedValue) {
      return null;
    }

    const cacheEntry = JSON.parse(storedValue);

    if (!isValidLastSearchEntry(cacheEntry)) {
      localStorage.removeItem(LAST_SEARCH_CACHE_KEY);
      return null;
    }

    return cacheEntry;
  } catch {
    localStorage.removeItem(LAST_SEARCH_CACHE_KEY);
    return null;
  }
}

function setLastSearchCache({
  query,
  results,
  searchMatches,
  visibleCount,
  totalPokemon,
}) {
  const cacheEntry = {
    timestamp: Date.now(),
    query,
    results,
    searchMatches,
    visibleCount,
    totalPokemon,
  };

  if (!isValidLastSearchEntry(cacheEntry)) {
    return false;
  }

  try {
    localStorage.setItem(LAST_SEARCH_CACHE_KEY, JSON.stringify(cacheEntry));
    return true;
  } catch {
    return false;
  }
}

function clearLastSearchCache() {
  try {
    localStorage.removeItem(LAST_SEARCH_CACHE_KEY);
    return true;
  } catch {
    return false;
  }
}

export {
  clearLastSearchCache,
  getLastSearchCache,
  getPokemonPageCache,
  getPokemonPageCacheKey,
  setLastSearchCache,
  setPokemonPageCache,
};
