import { Link } from 'react-router';
import About from '../About/About.jsx';
import './Home.css';

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Explora, descubre y guarda</p>

          <h1 className="hero__title">
            Tu enciclopedia Pokémon con espíritu rockero
          </h1>

          <p className="hero__description">
            Consulta información de Pokémon, explora sus características y
            construye tu propia colección de favoritos.
          </p>

          <Link className="hero__button" to="/pokemon/25">
            Ver detalle de ejemplo
          </Link>
        </div>
      </section>

      <About />
    </>
  );
}

export default Home;
