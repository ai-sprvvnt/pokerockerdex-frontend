const MAIN_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

async function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  let responseBody;

  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  const error = new Error(
    responseBody?.message ??
      `La solicitud a PokeRockerDex falló con el estado ${response.status}.`,
  );

  error.status = response.status;

  throw error;
}

async function getTeam(signal) {
  const response = await fetch(`${MAIN_API_BASE_URL}/teams`, {
    signal,
  });

  return checkResponse(response);
}

async function addPokemonToTeam(pokemon, signal) {
  const response = await fetch(`${MAIN_API_BASE_URL}/teams/pokemon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      types: pokemon.types,
    }),
    signal,
  });

  return checkResponse(response);
}

export { MAIN_API_BASE_URL, getTeam, addPokemonToTeam };
