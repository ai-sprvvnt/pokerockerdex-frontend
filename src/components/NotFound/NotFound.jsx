import { Link } from 'react-router';
import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found">
      <p className="not-found__code">404</p>

      <h1 className="not-found__title">Página no encontrada</h1>

      <p className="not-found__description">
        La dirección que intentaste visitar no existe.
      </p>

      <Link className="not-found__link" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFound;
