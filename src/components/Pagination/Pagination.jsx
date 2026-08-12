import './Pagination.css';

function Pagination({ currentPage, totalPages, onPrevious, onNext }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination" aria-label="Paginación de Pokémon">
      <button
        className="pagination__button"
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      <p className="pagination__status" aria-live="polite">
        Página {currentPage} de {totalPages}
      </p>

      <button
        className="pagination__button"
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </nav>
  );
}

export default Pagination;
