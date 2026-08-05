import { Link, useParams } from 'react-router';
import { mockPokemon } from '../../utils/mockPokemon.js';
import './PokemonDetail.css';

const STAT_NAMES = [
  'Puntos de salud',
  'Ataque',
  'Defensa',
  'Ataque especial',
  'Defensa especial',
  'Velocidad',
];

function PokemonDetail() {
  const { id } = useParams();
  const pokemonId = Number(id);

  const pokemon = mockPokemon.find(
    (pokemonItem) => pokemonItem.id === pokemonId,
  );

  if (!pokemon) {
    return (
      <section
        className="pokemon-detail pokemon-detail_state_not-found"
        aria-labelledby="pokemon-not-found-title"
      >
        <div className="pokemon-detail__not-found">
          <p className="pokemon-detail__number">Pokémon #{id}</p>

          <h1 className="pokemon-detail__title" id="pokemon-not-found-title">
            Pokémon no encontrado
          </h1>

          <p className="pokemon-detail__description">
            No hay información temporal disponible para este identificador.
          </p>

          <Link className="pokemon-detail__back-link" to="/">
            Volver a la exploración
          </Link>
        </div>
      </section>
    );
  }

  const formattedId = String(pokemon.id).padStart(3, '0');

  return (
    <section className="pokemon-detail" aria-labelledby="pokemon-detail-title">
      <div className="pokemon-detail__container">
        <Link className="pokemon-detail__back-link" to="/">
          ← Volver a la exploración
        </Link>

        <article className="pokemon-detail__card">
          <div className="pokemon-detail__visual">
            <p className="pokemon-detail__number">#{formattedId}</p>

            <img
              className="pokemon-detail__image"
              src={pokemon.image}
              alt={`Ilustración de ${pokemon.name}`}
            />
          </div>

          <div className="pokemon-detail__content">
            <p className="pokemon-detail__eyebrow">Información Pokémon</p>

            <h1 className="pokemon-detail__title" id="pokemon-detail-title">
              {pokemon.name}
            </h1>

            <ul
              className="pokemon-detail__types"
              aria-label={`Tipos de ${pokemon.name}`}
            >
              {pokemon.types.map((type) => (
                <li className="pokemon-detail__type" key={type}>
                  {type}
                </li>
              ))}
            </ul>

            <dl className="pokemon-detail__information">
              <div className="pokemon-detail__information-item">
                <dt className="pokemon-detail__term">Altura</dt>

                <dd className="pokemon-detail__value">Pendiente de PokéAPI</dd>
              </div>

              <div className="pokemon-detail__information-item">
                <dt className="pokemon-detail__term">Peso</dt>

                <dd className="pokemon-detail__value">Pendiente de PokéAPI</dd>
              </div>

              <div className="pokemon-detail__information-item">
                <dt className="pokemon-detail__term">Habilidades</dt>

                <dd className="pokemon-detail__value">Pendiente de PokéAPI</dd>
              </div>
            </dl>

            <button
              className="pokemon-detail__team-button"
              type="button"
              disabled
            >
              Agregar a mi equipo
            </button>

            <p className="pokemon-detail__team-message">
              Esta función estará disponible después de implementar el registro
              y el inicio de sesión.
            </p>
          </div>
        </article>

        <section
          className="pokemon-detail__stats"
          aria-labelledby="pokemon-stats-title"
        >
          <h2 className="pokemon-detail__stats-title" id="pokemon-stats-title">
            Estadísticas básicas
          </h2>

          <ul className="pokemon-detail__stats-list">
            {STAT_NAMES.map((statName) => (
              <li className="pokemon-detail__stat" key={statName}>
                <span className="pokemon-detail__stat-name">{statName}</span>

                <span className="pokemon-detail__stat-placeholder">
                  Pendiente
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default PokemonDetail;
