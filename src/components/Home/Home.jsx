import About from '../About/About.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import PokemonCardList from '../PokemonCardList/PokemonCardList.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import { POKEMON_PER_PAGE } from '../../utils/constants.js';
import './Home.css';

function Home({
  pokemon,
  totalPokemon,
  currentPage,
  isLoading,
  isRefreshing,
  isCacheFallback,
  apiError,
  isSearchMode,
  searchQuery,
  isLoadingMore,
  loadMoreError,
  canShowMore,
  onSearchQueryChange,
  onSearch,
  onResetExplorer,
  onPreviousPage,
  onNextPage,
  onRetry,
  onShowMore,
}) {
  const totalPages = Math.ceil(totalPokemon / POKEMON_PER_PAGE);

  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Explora, descubre y crea</p>

          <h1 className="hero__title">
            Tu enciclopedia Pokémon con espíritu rockero
          </h1>

          <p className="hero__description">
            Consulta información de Pokémon, descubre sus características y
            construye un equipo personal de hasta seis integrantes.
          </p>

          <a className="hero__button" href="#pokemon-list">
            Explorar Pokémon
          </a>
        </div>
      </section>

      <section
        className="pokemon-explorer"
        id="pokemon-list"
        aria-labelledby="pokemon-explorer-title"
      >
        <div className="pokemon-explorer__container">
          <div className="pokemon-explorer__header">
            <p className="pokemon-explorer__eyebrow">Pokédex</p>

            <h2 className="pokemon-explorer__title" id="pokemon-explorer-title">
              Descubre Pokémon
            </h2>

            <p className="pokemon-explorer__description">
              Busca por nombre o número y selecciona una tarjeta para consultar
              su ruta de detalle.
            </p>
          </div>

          <SearchForm
            query={searchQuery}
            onQueryChange={onSearchQueryChange}
            onSearch={onSearch}
            onReset={onResetExplorer}
            isLoading={isLoading}
          />

          {isLoading ? (
            <Preloader />
          ) : apiError && !isCacheFallback ? (
            <ErrorMessage onRetry={onRetry} />
          ) : (
            <>
              {isRefreshing && (
                <p
                  className="pokemon-explorer__cache-status"
                  role="status"
                  aria-live="polite"
                >
                  Mostrando datos guardados mientras comprobamos
                  actualizaciones.
                </p>
              )}

              {apiError && isCacheFallback && (
                <div className="pokemon-explorer__cache-fallback">
                  <ErrorMessage
                    title="No pudimos actualizar los datos"
                    description="PokéAPI no respondió. Se muestra la última página guardada en este dispositivo."
                    onRetry={onRetry}
                  />
                </div>
              )}

              {isSearchMode && (
                <div className="pokemon-explorer__results-header">
                  <p className="pokemon-explorer__results-title">
                    Resultados de búsqueda
                  </p>

                  <p className="pokemon-explorer__results-summary">
                    {totalPokemon === 1
                      ? `1 coincidencia para "${searchQuery}"`
                      : `${totalPokemon} coincidencias para "${searchQuery}"`}
                  </p>
                </div>
              )}

              <PokemonCardList pokemon={pokemon} />

              {loadMoreError ? (
                <div className="pokemon-explorer__load-more-error">
                  <ErrorMessage
                    title="No pudimos cargar más resultados"
                    description="Ocurrió un problema al solicitar los siguientes Pokémon. Puedes intentarlo nuevamente."
                    onRetry={onShowMore}
                  />
                </div>
              ) : (
                canShowMore && (
                  <button
                    className="pokemon-explorer__load-more"
                    type="button"
                    onClick={onShowMore}
                    disabled={isLoadingMore}
                  >
                    {isLoadingMore ? 'Cargando...' : 'Mostrar más'}
                  </button>
                )
              )}

              {!isSearchMode && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrevious={onPreviousPage}
                  onNext={onNextPage}
                />
              )}
            </>
          )}
        </div>
      </section>

      <About />
    </>
  );
}

export default Home;
