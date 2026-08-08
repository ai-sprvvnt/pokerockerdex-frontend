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
  onSearchQueryChange,
  onSearch,
  onResetExplorer,
  onPreviousPage,
  onNextPage,
  onRetry,
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

              <PokemonCardList pokemon={pokemon} />

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
