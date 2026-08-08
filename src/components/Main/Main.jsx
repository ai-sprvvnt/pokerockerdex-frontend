import { Route, Routes } from 'react-router';
import Home from '../Home/Home.jsx';
import PokemonDetail from '../PokemonDetail/PokemonDetail.jsx';
import MyTeam from '../MyTeam/MyTeam.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import './Main.css';

function Main({
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
  return (
    <main className="main">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              pokemon={pokemon}
              totalPokemon={totalPokemon}
              currentPage={currentPage}
              isLoading={isLoading}
              isRefreshing={isRefreshing}
              isCacheFallback={isCacheFallback}
              apiError={apiError}
              isSearchMode={isSearchMode}
              searchQuery={searchQuery}
              onSearchQueryChange={onSearchQueryChange}
              onSearch={onSearch}
              onResetExplorer={onResetExplorer}
              onPreviousPage={onPreviousPage}
              onNextPage={onNextPage}
              onRetry={onRetry}
            />
          }
        />

        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/my-team" element={<MyTeam />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default Main;
