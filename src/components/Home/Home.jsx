import { useState } from 'react';
import About from '../About/About.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import PokemonCardList from '../PokemonCardList/PokemonCardList.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import { POKEMON_PER_PAGE } from '../../utils/constants.js';
import { mockPokemon } from '../../utils/mockPokemon.js';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const normalizedSearchTerm = searchTerm.toLowerCase();

  const filteredPokemon = mockPokemon.filter((pokemon) => {
    const formattedId = String(pokemon.id).padStart(3, '0');

    return (
      pokemon.name.includes(normalizedSearchTerm) ||
      formattedId.includes(normalizedSearchTerm)
    );
  });

  const totalPages = Math.ceil(filteredPokemon.length / POKEMON_PER_PAGE);

  const firstPokemonIndex = (currentPage - 1) * POKEMON_PER_PAGE;

  const visiblePokemon = filteredPokemon.slice(
    firstPokemonIndex,
    firstPokemonIndex + POKEMON_PER_PAGE,
  );

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

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

          <SearchForm onSearch={handleSearch} />

          <PokemonCardList pokemon={visiblePokemon} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
          />
        </div>
      </section>

      <About />
    </>
  );
}

export default Home;
