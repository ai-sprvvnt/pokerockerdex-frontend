import { useEffect, useRef, useState } from 'react';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import { getPokemonByNameOrId, getPokemonPage } from '../../utils/PokeApi.js';
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

  const pageControllerRef = useRef(null);
  const searchControllerRef = useRef(null);

  useEffect(() => {
    if (isSearchMode) {
      return undefined;
    }

    const controller = new AbortController();

    pageControllerRef.current = controller;

    const loadPokemonPage = async () => {
      setIsLoading(true);
      setApiError(null);

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
      } catch (error) {
        if (error.name !== 'AbortError') {
          setApiError(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
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
  }, [currentPage, isSearchMode, retryRequest]);

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
