import { useState } from 'react';
import './PokemonImage.css';

function PokemonImage({ src, alt, className = '', loading }) {
  const [failedSrc, setFailedSrc] = useState(null);

  const hasError = !src || failedSrc === src;

  if (hasError) {
    return (
      <div
        className={`pokemon-image pokemon-image--fallback ${className}`}
        role="img"
        aria-label={`${alt}. Imagen no disponible`}
      >
        <span className="pokemon-image__fallback-text">
          Imagen no disponible
        </span>
      </div>
    );
  }

  return (
    <img
      className={`pokemon-image ${className}`}
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setFailedSrc(src)}
    />
  );
}

export default PokemonImage;
