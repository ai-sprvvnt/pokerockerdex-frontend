import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import {
  getPokemonByNameOrId,
  getPokemonByUrls,
  getPokemonPage,
  searchPokemonByName,
} from '../../utils/PokeApi.js';
import {
  clearLastSearchCache,
  getLastSearchCache,
  getPokemonPageCache,
  setLastSearchCache,
  setPokemonPageCache,
} from '../../utils/cache.js';
import {
  POKEMON_PER_PAGE,
  SEARCH_RESULTS_BATCH_SIZE,
} from '../../utils/constants.js';
import './App.css';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [initialLastSearch] = useState(() => getLastSearchCache());
  const [pokemon, setPokemon] = useState(
    () => initialLastSearch?.results ?? [],
  );

  const [totalPokemon, setTotalPokemon] = useState(
    () => initialLastSearch?.totalPokemon ?? 0,
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(() => !initialLastSearch);

  const [apiError, setApiError] = useState(null);

  const [isSearchMode, setIsSearchMode] = useState(() =>
    Boolean(initialLastSearch),
  );

  const [activeSearchQuery, setActiveSearchQuery] = useState(
    () => initialLastSearch?.query ?? '',
  );

  const [retryRequest, setRetryRequest] = useState(0);

  const [searchQuery, setSearchQuery] = useState(
    () => initialLastSearch?.query ?? '',
  );

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCacheFallback, setIsCacheFallback] = useState(false);

  const [searchMatches, setSearchMatches] = useState(
    () => initialLastSearch?.searchMatches ?? [],
  );

  const [visibleSearchCount, setVisibleSearchCount] = useState(
    () => initialLastSearch?.visibleCount ?? 0,
  );

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(null);

  const pageControllerRef = useRef(null);
  const searchControllerRef = useRef(null);

  const { pathname } = useLocation();
  const isExplorerRoute = pathname === '/';

  const currentUserContextValue = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser],
  );

  useEffect(() => {
    if (isSearchMode || !isExplorerRoute) {
      return undefined;
    }

    const controller = new AbortController();

    pageControllerRef.current = controller;

    const loadPokemonPage = async () => {
      const cachedPage = getPokemonPageCache(currentPage);
      const hasValidCache = Boolean(cachedPage);

      setApiError(null);
      setIsCacheFallback(false);

      if (hasValidCache) {
        setPokemon(cachedPage.pokemon);
        setTotalPokemon(cachedPage.count);
        setIsLoading(false);
        setIsRefreshing(true);
      } else {
        setPokemon([]);
        setTotalPokemon(0);
        setIsLoading(true);
        setIsRefreshing(false);
      }

      try {
        const offset = (currentPage - 1) * POKEMON_PER_PAGE;

        const pageData = await getPokemonPage({
          limit: POKEMON_PER_PAGE,
          offset,
          signal: controller.signal,
        });

        if (controller.signal.aborted) {
          return;
        }

        setPokemon(pageData.pokemon);
        setTotalPokemon(pageData.count);
        setPokemonPageCache(currentPage, pageData);
        setIsCacheFallback(false);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        const fallbackPage = getPokemonPageCache(currentPage, {
          allowExpired: true,
        });

        if (fallbackPage) {
          setPokemon(fallbackPage.pokemon);
          setTotalPokemon(fallbackPage.count);
          setIsCacheFallback(true);
        } else {
          setPokemon([]);
          setTotalPokemon(0);
          setIsCacheFallback(false);
        }

        setApiError(error);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    };

    loadPokemonPage();

    return () => {
      controller.abort();

      if (pageControllerRef.current === controller) {
        pageControllerRef.current = null;
      }
    };
  }, [currentPage, isExplorerRoute, isSearchMode, retryRequest]);

  useEffect(
    () => () => {
      searchControllerRef.current?.abort();
    },
    [],
  );

  const handleResetExplorer = () => {
    pageControllerRef.current?.abort();
    pageControllerRef.current = null;

    searchControllerRef.current?.abort();
    searchControllerRef.current = null;

    clearLastSearchCache();

    setSearchQuery('');
    setActiveSearchQuery('');
    setPokemon([]);
    setTotalPokemon(0);
    setSearchMatches([]);
    setVisibleSearchCount(0);
    setIsLoadingMore(false);
    setLoadMoreError(null);
    setCurrentPage(1);
    setApiError(null);
    setIsSearchMode(false);
    setIsLoading(true);
    setIsRefreshing(false);
    setIsCacheFallback(false);
    setRetryRequest((request) => request + 1);
  };

  const handleSearch = async (query) => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      handleResetExplorer();
      return;
    }

    clearLastSearchCache();

    pageControllerRef.current?.abort();
    searchControllerRef.current?.abort();

    const controller = new AbortController();

    searchControllerRef.current = controller;

    setSearchQuery(normalizedQuery);
    setIsSearchMode(true);
    setActiveSearchQuery(normalizedQuery);
    setPokemon([]);
    setTotalPokemon(0);
    setSearchMatches([]);
    setVisibleSearchCount(0);
    setCurrentPage(1);
    setIsLoading(true);
    setIsLoadingMore(false);
    setApiError(null);
    setLoadMoreError(null);
    setIsRefreshing(false);
    setIsCacheFallback(false);

    try {
      const isNumericQuery = /^\d+$/.test(normalizedQuery);

      if (isNumericQuery) {
        const searchResult = await getPokemonByNameOrId(
          normalizedQuery,
          controller.signal,
        );

        if (controller.signal.aborted) {
          return;
        }

        const numericResults = [searchResult];

        setPokemon(numericResults);
        setTotalPokemon(1);
        setSearchMatches([]);
        setVisibleSearchCount(1);

        setLastSearchCache({
          query: normalizedQuery,
          results: numericResults,
          searchMatches: [],
          visibleCount: 1,
          totalPokemon: 1,
        });

        return;
      }

      const matches = await searchPokemonByName(
        normalizedQuery,
        controller.signal,
      );

      if (controller.signal.aborted) {
        return;
      }

      setSearchMatches(matches);
      setTotalPokemon(matches.length);

      if (matches.length === 0) {
        setLastSearchCache({
          query: normalizedQuery,
          results: [],
          searchMatches: [],
          visibleCount: 0,
          totalPokemon: 0,
        });

        return;
      }

      const initialReferences = matches.slice(0, SEARCH_RESULTS_BATCH_SIZE);

      const initialPokemon = await getPokemonByUrls(
        initialReferences,
        controller.signal,
      );

      if (controller.signal.aborted) {
        return;
      }

      setPokemon(initialPokemon);
      setVisibleSearchCount(initialPokemon.length);

      setLastSearchCache({
        query: normalizedQuery,
        results: initialPokemon,
        searchMatches: matches,
        visibleCount: initialPokemon.length,
        totalPokemon: matches.length,
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }

      if (error.status === 404) {
        setPokemon([]);
        setTotalPokemon(0);
        setSearchMatches([]);
        setVisibleSearchCount(0);

        return;
      }

      setApiError(error);
    } finally {
      if (searchControllerRef.current === controller) {
        searchControllerRef.current = null;
        setIsLoading(false);
      }
    }
  };

  const handleShowMore = async () => {
    if (
      !isSearchMode ||
      isLoadingMore ||
      visibleSearchCount >= searchMatches.length
    ) {
      return;
    }

    searchControllerRef.current?.abort();

    const controller = new AbortController();

    searchControllerRef.current = controller;

    setIsLoadingMore(true);
    setLoadMoreError(null);

    try {
      const nextReferences = searchMatches.slice(
        visibleSearchCount,
        visibleSearchCount + SEARCH_RESULTS_BATCH_SIZE,
      );

      const nextPokemon = await getPokemonByUrls(
        nextReferences,
        controller.signal,
      );

      if (controller.signal.aborted) {
        return;
      }

      const updatedPokemon = [...pokemon, ...nextPokemon];

      const updatedVisibleCount = visibleSearchCount + nextPokemon.length;

      setPokemon(updatedPokemon);
      setVisibleSearchCount(updatedVisibleCount);

      setLastSearchCache({
        query: activeSearchQuery,
        results: updatedPokemon,
        searchMatches,
        visibleCount: updatedVisibleCount,
        totalPokemon: searchMatches.length,
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }

      setLoadMoreError(error);
    } finally {
      if (searchControllerRef.current === controller) {
        searchControllerRef.current = null;
        setIsLoadingMore(false);
      }
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalPokemon / POKEMON_PER_PAGE);

    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const handleRetry = () => {
    if (isSearchMode && activeSearchQuery) {
      handleSearch(activeSearchQuery);
      return;
    }

    setRetryRequest((request) => request + 1);
  };

  const canShowMore = isSearchMode && visibleSearchCount < searchMatches.length;

  return (
    <CurrentUserContext.Provider value={currentUserContextValue}>
      <div className="page">
        <Header onResetExplorer={handleResetExplorer} />
        <Main
          pokemon={pokemon}
          totalPokemon={totalPokemon}
          currentPage={currentPage}
          isLoading={isLoading}
          apiError={apiError}
          isSearchMode={isSearchMode}
          searchQuery={searchQuery}
          isRefreshing={isRefreshing}
          isCacheFallback={isCacheFallback}
          onSearchQueryChange={setSearchQuery}
          onSearch={handleSearch}
          onResetExplorer={handleResetExplorer}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          onRetry={handleRetry}
          isLoadingMore={isLoadingMore}
          loadMoreError={loadMoreError}
          canShowMore={canShowMore}
          onShowMore={handleShowMore}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
