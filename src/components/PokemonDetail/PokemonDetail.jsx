import { Link, useParams } from 'react-router';
import './PokemonDetail.css';

function PokemonDetail() {
  const { id } = useParams();

  return (
    <section className="pokemon-detail" aria-labelledby="pokemon-detail-title">
      <div className="pokemon-detail__container">
        <p className="pokemon-detail__eyebrow">Detalle Pokémon</p>

        <h1 className="pokemon-detail__title" id="pokemon-detail-title">
          Pokémon #{id}
        </h1>

        <p className="pokemon-detail__description">
          En la Etapa 1.2, esta página mostrará la información obtenida desde
          PokéAPI.
        </p>

        <div className="pokemon-detail__placeholder" role="status">
          Ruta dinámica preparada: /pokemon/{id}
        </div>

        <Link className="pokemon-detail__link" to="/">
          Volver a la exploración
        </Link>
      </div>
    </section>
  );
}

export default PokemonDetail;
