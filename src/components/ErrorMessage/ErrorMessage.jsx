import './ErrorMessage.css';

function ErrorMessage({ onRetry }) {
  return (
    <section className="error-message" role="alert" aria-live="assertive">
      <h2 className="error-message__title">No pudimos cargar los datos</h2>

      <p className="error-message__description">
        Lo sentimos, algo ha salido mal durante la solicitud. Es posible que
        haya un problema de conexión o que el servidor no funcione. Por favor,
        inténtalo más tarde.
      </p>

      <button className="error-message__button" type="button" onClick={onRetry}>
        Reintentar
      </button>
    </section>
  );
}

export default ErrorMessage;
