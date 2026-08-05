import { Link } from 'react-router';
import './TeamPokemonCard.css';

function TeamPokemonCard({ pokemon, onRemove }) {
  const formattedId = String(pokemon.id).padStart(3, '0');

  const handleRemove = () => {
    onRemove(pokemon.id);
  };

  return (
    <article
      className="team-pokemon-card"
      aria-labelledby={`team-pokemon-${pokemon.id}-name`}
    >
      <Link className="team-pokemon-card__link" to={`/pokemon/${pokemon.id}`}>
        <div className="team-pokemon-card__image-container">
          <img
            className="team-pokemon-card__image"
            src={pokemon.image}
            alt={`Ilustración de ${pokemon.name}`}
          />
        </div>

        <div className="team-pokemon-card__content">
          <p className="team-pokemon-card__number">#{formattedId}</p>

          <h2
            className="team-pokemon-card__name"
            id={`team-pokemon-${pokemon.id}-name`}
          >
            {pokemon.name}
          </h2>

          <ul
            className="team-pokemon-card__types"
            aria-label={`Tipos de ${pokemon.name}`}
          >
            {pokemon.types.map((type) => (
              <li className="team-pokemon-card__type" key={type}>
                {type}
              </li>
            ))}
          </ul>
        </div>
      </Link>

      <button
        className="team-pokemon-card__remove-button"
        type="button"
        onClick={handleRemove}
        aria-label={`Retirar a ${pokemon.name} del equipo`}
      >
        Retirar del equipo
      </button>
    </article>
  );
}

export default TeamPokemonCard;
