import { useEffect, useState } from 'react';
import EmptyTeam from '../EmptyTeam/EmptyTeam.jsx';
import TeamPokemonCard from '../TeamPokemonCard/TeamPokemonCard.jsx';
import TeamSlot from '../TeamSlot/TeamSlot.jsx';
import { MAX_TEAM_SIZE } from '../../utils/constants.js';
import './MyTeam.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import { getTeam } from '../../utils/MainApi.js';

function MyTeam() {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [retryRequest, setRetryRequest] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadTeam = async () => {
      setIsLoading(true);
      setApiError(null);

      try {
        const teamData = await getTeam(controller.signal);

        if (!controller.signal.aborted) {
          setTeam(teamData.pokemon);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        setApiError(error);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadTeam();

    return () => {
      controller.abort();
    };
  }, [retryRequest]);

  const handleRetry = () => {
    setRetryRequest((request) => request + 1);
  };

  const availableSlots = MAX_TEAM_SIZE - team.length;

  if (isLoading) {
    return (
      <section className="my-team" aria-label="Cargando equipo Pokémon">
        <Preloader />
      </section>
    );
  }

  if (apiError) {
    return (
      <section
        className="my-team"
        aria-label="Error al cargar el equipo Pokémon"
      >
        <ErrorMessage onRetry={handleRetry} />
      </section>
    );
  }

  return (
    <section className="my-team" aria-labelledby="my-team-title">
      <div className="my-team__container">
        <header className="my-team__header">
          <div>
            <p className="my-team__eyebrow">Equipo personal</p>

            <h1 className="my-team__title" id="my-team-title">
              Mi equipo
            </h1>

            <p className="my-team__description">
              Forma un equipo de hasta seis Pokémon sin integrantes duplicados.
            </p>
          </div>

          <p className="my-team__counter" aria-live="polite">
            {team.length} de {MAX_TEAM_SIZE}
          </p>
        </header>

        <p className="my-team__notice">
          El equipo se guarda temporalmente en el servidor durante esta etapa.
          Se reiniciará cuando el backend vuelva a iniciarse.
        </p>

        {team.length === 0 && <EmptyTeam />}

        <ul
          className="my-team__grid"
          aria-label="Integrantes y espacios del equipo"
        >
          {team.map((pokemon) => (
            <li className="my-team__item" key={pokemon.id}>
<TeamPokemonCard pokemon={pokemon} />
            </li>
          ))}

          {Array.from({ length: availableSlots }, (_, index) => {
            const position = team.length + index + 1;

            return (
              <li className="my-team__item" key={`available-slot-${position}`}>
                <TeamSlot position={position} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default MyTeam;
