const OFFICIAL_ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

const createTeamPokemon = (id, name, types) => ({
  id,
  name,
  image: `${OFFICIAL_ARTWORK_URL}/${id}.png`,
  types,
});

export const initialTeamFixture = [
  createTeamPokemon(1, 'bulbasaur', ['grass', 'poison']),
  createTeamPokemon(4, 'charmander', ['fire']),
  createTeamPokemon(7, 'squirtle', ['water']),
];
