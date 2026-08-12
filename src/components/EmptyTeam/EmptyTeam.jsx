import { Link } from 'react-router';
import './EmptyTeam.css';

function EmptyTeam() {
  return (
    <div className="empty-team" role="status">
      <h2 className="empty-team__title">Tu equipo está vacío</h2>

      <p className="empty-team__description">
        Explora la Pokédex y selecciona tus Pokémon favoritos para formar un
        equipo.
      </p>

      <Link className="empty-team__link" to="/">
        Explorar Pokémon
      </Link>
    </div>
  );
}

export default EmptyTeam;
