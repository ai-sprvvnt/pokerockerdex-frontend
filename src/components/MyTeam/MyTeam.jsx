import { useState } from 'react';
import EmptyTeam from '../EmptyTeam/EmptyTeam.jsx';
import TeamPokemonCard from '../TeamPokemonCard/TeamPokemonCard.jsx';
import TeamSlot from '../TeamSlot/TeamSlot.jsx';
import { MAX_TEAM_SIZE } from '../../utils/constants.js';
import { initialTeamFixture } from '../../utils/teamFixture.js';
import './MyTeam.css';

function MyTeam() {
  const [team, setTeam] = useState(initialTeamFixture);

  const availableSlots = MAX_TEAM_SIZE - team.length;

  const handleRemovePokemon = (pokemonId) => {
    setTeam((currentTeam) =>
      currentTeam.filter((pokemon) => pokemon.id !== pokemonId),
    );
  };

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

        <aside className="my-team__notice" role="note">
          Esta es una demostración local. La autenticación y la persistencia del
          equipo se implementarán en las siguientes etapas.
        </aside>

        {team.length === 0 && <EmptyTeam />}

        <ul
          className="my-team__grid"
          aria-label="Integrantes y espacios del equipo"
        >
          {team.map((pokemon) => (
            <li className="my-team__item" key={pokemon.id}>
              <TeamPokemonCard
                pokemon={pokemon}
                onRemove={handleRemovePokemon}
              />
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
