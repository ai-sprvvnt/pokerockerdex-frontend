import { Link } from 'react-router';
import './PokemonCard.css';

function PokemonCard({ pokemon }) {
  const formattedId = String(pokemon.id).padStart(3, '0');

  return (
    <article
      className="pokemon-card"
      aria-labelledby={`pokemon-${pokemon.id}-name`}
    >
      <Link className="pokemon-card__link" to={`/pokemon/${pokemon.id}`}>
        <div className="pokemon-card__image-container">
          <img
            className="pokemon-card__image"
            src={pokemon.image}
            alt={`Ilustración de ${pokemon.name}`}
            loading="lazy"
          />
        </div>

        <div className="pokemon-card__content">
          <p className="pokemon-card__number">#{formattedId}</p>

          <h2 className="pokemon-card__name" id={`pokemon-${pokemon.id}-name`}>
            {pokemon.name}
          </h2>

          <ul
            className="pokemon-card__types"
            aria-label={`Tipos de ${pokemon.name}`}
          >
            {pokemon.types.map((type) => (
              <li className="pokemon-card__type" key={type}>
                {type}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}

export default PokemonCard;
