import './TeamSlot.css';

function TeamSlot({ position }) {
  return (
    <div className="team-slot" aria-label={`Espacio ${position} disponible`}>
      <span className="team-slot__symbol" aria-hidden="true">
        +
      </span>

      <p className="team-slot__position">Espacio {position}</p>

      <p className="team-slot__description">
        Disponible para agregar un Pokémon
      </p>
    </div>
  );
}

export default TeamSlot;
