import PokemonCard from '../PokemonCard/PokemonCard.jsx';
import NothingFound from '../NothingFound/NothingFound.jsx';
import './PokemonCardList.css';

function PokemonCardList({ pokemon }) {
  if (pokemon.length === 0) {
    return <NothingFound />;
  }

  return (
    <ul className="pokemon-list">
      {pokemon.map((pokemonItem) => (
        <li className="pokemon-list__item" key={pokemonItem.id}>
          <PokemonCard pokemon={pokemonItem} />
        </li>
      ))}
    </ul>
  );
}

export default PokemonCardList;
