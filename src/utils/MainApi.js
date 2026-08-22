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

async function register({ email, password, name }) {
  const response = await fetch(`${MAIN_API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });

  return checkResponse(response);
}

async function authorize({ email, password }) {
  const response = await fetch(`${MAIN_API_BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return checkResponse(response);
}

async function getCurrentUser(token, signal) {
  const response = await fetch(`${MAIN_API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal,
  });

  return checkResponse(response);
}

async function getTeam(token, signal) {
  const response = await fetch(`${MAIN_API_BASE_URL}/teams`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal,
  });

  return checkResponse(response);
}

async function addPokemonToTeam(pokemon, token, signal) {
  const response = await fetch(`${MAIN_API_BASE_URL}/teams/pokemon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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

async function removePokemonFromTeam(pokemonId, token, signal) {
  const response = await fetch(
    `${MAIN_API_BASE_URL}/teams/pokemon/${pokemonId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    },
  );

  return checkResponse(response);
}

export {
  MAIN_API_BASE_URL,
  register,
  authorize,
  getCurrentUser,
  getTeam,
  addPokemonToTeam,
  removePokemonFromTeam,
};
