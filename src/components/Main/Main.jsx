import { Route, Routes } from 'react-router';
import Home from '../Home/Home.jsx';
import PokemonDetail from '../PokemonDetail/PokemonDetail.jsx';
import MyTeam from '../MyTeam/MyTeam.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
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
  onLoginRequired,
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
              isLoadingMore={isLoadingMore}
              loadMoreError={loadMoreError}
              canShowMore={canShowMore}
              onSearchQueryChange={onSearchQueryChange}
              onSearch={onSearch}
              onResetExplorer={onResetExplorer}
              onPreviousPage={onPreviousPage}
              onNextPage={onNextPage}
              onRetry={onRetry}
              onShowMore={onShowMore}
            />
          }
        />

        <Route
          path="/pokemon/:id"
          element={<PokemonDetail onLoginRequired={onLoginRequired} />}
        />
        <Route
          path="/my-team"
          element={
            <ProtectedRoute onUnauthorized={onLoginRequired}>
              <MyTeam />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default Main;
