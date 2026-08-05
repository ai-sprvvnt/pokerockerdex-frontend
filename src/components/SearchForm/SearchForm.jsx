import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const nextQuery = event.target.value.slice(0, 40);

    setQuery(nextQuery);

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      setErrorMessage('Escribe el nombre o número de un Pokémon.');
      return;
    }

    onSearch(normalizedQuery);
  };

  const handleReset = () => {
    setQuery('');
    setErrorMessage('');
    onSearch('');
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className="search-form__field">
        <label className="search-form__label" htmlFor="pokemon-search">
          Buscar Pokémon
        </label>

        <input
          className={`search-form__input${
            errorMessage ? ' search-form__input_type_error' : ''
          }`}
          id="pokemon-search"
          type="search"
          name="pokemon"
          placeholder="Ejemplo: pikachu o 25"
          value={query}
          onChange={handleChange}
          required
          minLength="1"
          maxLength="40"
          autoComplete="off"
          aria-required="true"
          aria-describedby="pokemon-search-error"
          aria-invalid={Boolean(errorMessage)}
        />

        <span
          className="search-form__error"
          id="pokemon-search-error"
          aria-live="polite"
        >
          {errorMessage}
        </span>
      </div>

      <div className="search-form__actions">
        <button className="search-form__button" type="submit">
          Buscar
        </button>

        <button
          className="search-form__button search-form__button_secondary"
          type="button"
          onClick={handleReset}
        >
          Restablecer
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
