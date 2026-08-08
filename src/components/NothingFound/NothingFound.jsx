import './NothingFound.css';

function NothingFound() {
  return (
    <div className="nothing-found" role="status">
      <h2 className="nothing-found__title">No se encontraron Pokémon</h2>

      <p className="nothing-found__description">
        Prueba nuevamente con otros criterios de búsqueda.
      </p>
    </div>
  );
}

export default NothingFound;
