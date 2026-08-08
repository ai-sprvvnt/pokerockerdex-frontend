import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import { getPokemonByNameOrId, getPokemonPage } from '../../utils/PokeApi.js';
import { getPokemonPageCache, setPokemonPageCache } from '../../utils/cache.js';
import { POKEMON_PER_PAGE } from '../../utils/constants.js';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const [retryRequest, setRetryRequest] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCacheFallback, setIsCacheFallback] = useState(false);

  const pageControllerRef = useRef(null);
  const searchControllerRef = useRef(null);

  const { pathname } = useLocation();
  const isExplorerRoute = pathname === '/';

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

    setSearchQuery('');
    setActiveSearchQuery('');
    setPokemon([]);
    setTotalPokemon(0);
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

    pageControllerRef.current?.abort();
    searchControllerRef.current?.abort();

    const controller = new AbortController();

    searchControllerRef.current = controller;

    setSearchQuery(normalizedQuery);
    setIsSearchMode(true);
    setActiveSearchQuery(normalizedQuery);
    setCurrentPage(1);
    setIsLoading(true);
    setApiError(null);
    setIsRefreshing(false);
    setIsCacheFallback(false);

    try {
      const searchResult = await getPokemonByNameOrId(
        normalizedQuery,
        controller.signal,
      );

      if (controller.signal.aborted) {
        return;
      }

      setPokemon([searchResult]);
      setTotalPokemon(1);
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }

      if (error.status === 404) {
        setPokemon([]);
        setTotalPokemon(0);
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

  return (
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
      />

      <Footer />
    </div>
  );
}

export default App;
