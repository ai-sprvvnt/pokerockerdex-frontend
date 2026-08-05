import './Preloader.css';

function Preloader() {
  return (
    <div
      className="preloader"
      role="status"
      aria-live="polite"
      aria-label="Cargando contenido"
    >
      <span className="preloader__spinner" aria-hidden="true" />
      <p className="preloader__text">Cargando...</p>
    </div>
  );
}

export default Preloader;
