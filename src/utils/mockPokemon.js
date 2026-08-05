const OFFICIAL_ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

const createPokemon = (id, name, types) => ({
  id,
  name,
  image: `${OFFICIAL_ARTWORK_URL}/${id}.png`,
  types,
});

export const mockPokemon = [
  createPokemon(1, 'bulbasaur', ['grass', 'poison']),
  createPokemon(2, 'ivysaur', ['grass', 'poison']),
  createPokemon(3, 'venusaur', ['grass', 'poison']),
  createPokemon(4, 'charmander', ['fire']),
  createPokemon(5, 'charmeleon', ['fire']),
  createPokemon(6, 'charizard', ['fire', 'flying']),
  createPokemon(7, 'squirtle', ['water']),
  createPokemon(8, 'wartortle', ['water']),
  createPokemon(9, 'blastoise', ['water']),
  createPokemon(10, 'caterpie', ['bug']),
  createPokemon(11, 'metapod', ['bug']),
  createPokemon(12, 'butterfree', ['bug', 'flying']),
  createPokemon(13, 'weedle', ['bug', 'poison']),
  createPokemon(14, 'kakuna', ['bug', 'poison']),
  createPokemon(15, 'beedrill', ['bug', 'poison']),
  createPokemon(16, 'pidgey', ['normal', 'flying']),
  createPokemon(17, 'pidgeotto', ['normal', 'flying']),
  createPokemon(18, 'pidgeot', ['normal', 'flying']),
  createPokemon(19, 'rattata', ['normal']),
  createPokemon(20, 'raticate', ['normal']),
  createPokemon(21, 'spearow', ['normal', 'flying']),
  createPokemon(22, 'fearow', ['normal', 'flying']),
  createPokemon(23, 'ekans', ['poison']),
  createPokemon(24, 'arbok', ['poison']),
  createPokemon(25, 'pikachu', ['electric']),
];
