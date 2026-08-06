import './ErrorMessage.css';

const DEFAULT_DESCRIPTION =
  'Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.';

function ErrorMessage({
  onRetry,
  title = 'No pudimos cargar los datos',
  description = DEFAULT_DESCRIPTION,
}) {
  return (
    <section className="error-message" role="alert" aria-live="assertive">
      <h2 className="error-message__title">{title}</h2>

      <p className="error-message__description">{description}</p>

      <button className="error-message__button" type="button" onClick={onRetry}>
        Reintentar
      </button>
    </section>
  );
}

export default ErrorMessage;
