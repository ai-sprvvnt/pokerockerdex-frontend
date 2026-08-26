import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import { getPokemonByNameOrId } from '../../utils/PokeApi.js';
import { addPokemonToTeam } from '../../utils/MainApi.js';
import './PokemonDetail.css';
import PokemonImage from '../PokemonImage/PokemonImage.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import { Check, Plus } from 'lucide';
import { MorphIcon } from 'morphicons/react';

const STAT_LABELS = {
  hp: 'Puntos de salud',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque especial',
  'special-defense': 'Defensa especial',
  speed: 'Velocidad',
};

const measurementFormatter = new Intl.NumberFormat('es-MX', {
  maximumFractionDigits: 1,
});

const formatApiName = (name) => name.replaceAll('-', ' ');

function PokemonDetail({ onLoginRequired }) {
  const { id } = useParams();
  const { loggedIn } = useContext(CurrentUserContext);

  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [retryRequest, setRetryRequest] = useState(0);

  const [isAddingToTeam, setIsAddingToTeam] = useState(false);
  const [isAddedToTeam, setIsAddedToTeam] = useState(false);
  const [teamMessage, setTeamMessage] = useState('');
  const [teamMessageType, setTeamMessageType] = useState('');

  const teamControllerRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadPokemonDetail = async () => {
      teamControllerRef.current?.abort();
      teamControllerRef.current = null;

      setIsLoading(true);
      setApiError(null);
      setIsNotFound(false);
      setPokemon(null);

      setIsAddingToTeam(false);
      setIsAddedToTeam(false);
      setTeamMessage('');
      setTeamMessageType('');

      try {
        const pokemonData = await getPokemonByNameOrId(id, controller.signal);

        if (!controller.signal.aborted) {
          setPokemon(pokemonData);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        if (error.status === 404) {
          setIsNotFound(true);
          return;
        }

        setApiError(error);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadPokemonDetail();

    return () => {
      controller.abort();
      teamControllerRef.current?.abort();
      teamControllerRef.current = null;
    };
  }, [id, retryRequest]);

  const handleRetry = () => {
    setRetryRequest((request) => request + 1);
  };

  const handleAddToTeam = async () => {
    if (!loggedIn) {
      onLoginRequired();
      return;
    }

    if (!pokemon || isAddingToTeam || isAddedToTeam) {
      return;
    }

    teamControllerRef.current?.abort();

    const controller = new AbortController();

    teamControllerRef.current = controller;

    setIsAddingToTeam(true);
    setTeamMessage('');
    setTeamMessageType('');

    const token = localStorage.getItem('jwt');

    try {
      const teamData = await addPokemonToTeam(
        pokemon,
        token,
        controller.signal,
      );

      if (controller.signal.aborted) {
        return;
      }

      setIsAddedToTeam(true);
      setTeamMessage(
        `${teamData.pokemon.name} se agregó a tu equipo. ` +
          `Equipo: ${teamData.teamSize}/${teamData.maxTeamSize}.`,
      );
      setTeamMessageType('success');
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }

      setTeamMessage(error.message);
      setTeamMessageType('error');
    } finally {
      if (teamControllerRef.current === controller) {
        teamControllerRef.current = null;
        setIsAddingToTeam(false);
      }
    }
  };

  if (isLoading) {
    return (
      <section
        className="pokemon-detail pokemon-detail_state_loading"
        aria-label="Cargando información del Pokémon"
      >
        <Preloader />
      </section>
    );
  }

  if (apiError) {
    return (
      <section
        className="pokemon-detail pokemon-detail_state_error"
        aria-label="Error al cargar el Pokémon"
      >
        <ErrorMessage onRetry={handleRetry} />
      </section>
    );
  }

  if (isNotFound || !pokemon) {
    return (
      <section
        className="pokemon-detail pokemon-detail_state_not-found"
        aria-labelledby="pokemon-not-found-title"
      >
        <div className="pokemon-detail__not-found">
          <p className="pokemon-detail__number">Consulta: {id}</p>

          <h1 className="pokemon-detail__title" id="pokemon-not-found-title">
            Pokémon no encontrado
          </h1>

          <p className="pokemon-detail__description">
            PokéAPI no encontró información para este nombre o identificador.
          </p>

          <Link className="pokemon-detail__back-link" to="/">
            Volver a la exploración
          </Link>
        </div>
      </section>
    );
  }

  const formattedId = String(pokemon.id).padStart(3, '0');

  const formattedAbilities = pokemon.abilities.map(formatApiName).join(', ');

  return (
    <section className="pokemon-detail" aria-labelledby="pokemon-detail-title">
      <div className="pokemon-detail__container">
        <Link className="pokemon-detail__back-link" to="/">
          ← Volver a la exploración
        </Link>

        <article className="pokemon-detail__card">
          <div className="pokemon-detail__visual">
            <p className="pokemon-detail__number">#{formattedId}</p>

            <PokemonImage
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

                <dd className="pokemon-detail__value">
                  {measurementFormatter.format(pokemon.heightMeters)} m
                </dd>
              </div>

              <div className="pokemon-detail__information-item">
                <dt className="pokemon-detail__term">Peso</dt>

                <dd className="pokemon-detail__value">
                  {measurementFormatter.format(pokemon.weightKilograms)} kg
                </dd>
              </div>

              <div className="pokemon-detail__information-item">
                <dt className="pokemon-detail__term">Habilidades</dt>

                <dd className="pokemon-detail__value">{formattedAbilities}</dd>
              </div>
            </dl>

            <button
              className="pokemon-detail__team-button"
              type="button"
              onClick={handleAddToTeam}
              disabled={isAddingToTeam || isAddedToTeam}
            >
              <MorphIcon
                icon={isAddedToTeam ? Check : Plus}
                size={20}
                strokeWidth={2}
                spring={{ stiffness: 90, damping: 18 }}
                reducedMotion="user"
              />

              <span>
                {isAddingToTeam
                  ? 'Agregando...'
                  : isAddedToTeam
                    ? 'Agregado al equipo'
                    : 'Agregar a mi equipo'}
              </span>
            </button>

            <p
              className={`pokemon-detail__team-message${
                teamMessageType
                  ? ` pokemon-detail__team-message_type_${teamMessageType}`
                  : ''
              }`}
              aria-live="polite"
            >
              {teamMessage ||
                'Los Pokémon que agregues se guardarán en tu equipo personal.'}
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
            {pokemon.stats.map((stat) => (
              <li className="pokemon-detail__stat" key={stat.name}>
                <span className="pokemon-detail__stat-name">
                  {STAT_LABELS[stat.name] ?? formatApiName(stat.name)}
                </span>

                <span className="pokemon-detail__stat-placeholder">
                  {stat.value}
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
