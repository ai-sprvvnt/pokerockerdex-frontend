import { useCallback, useEffect } from 'react';
import './RegistrationSuccess.css';

function RegistrationSuccess({ isOpen, onClose, onLoginClick }) {
  const handleLoginClick = useCallback(() => {
    onClose();
    onLoginClick();
  }, [onClose, onLoginClick]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="registration-success"
      role="presentation"
      onMouseDown={handleOverlayClick}
    >
      <div
        className="registration-success__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-success-title"
        aria-describedby="registration-success-message"
      >
        <button
          className="registration-success__close"
          type="button"
          aria-label="Cerrar confirmación de registro"
          onClick={onClose}
        >
          ×
        </button>

        <h2
          className="registration-success__title"
          id="registration-success-title"
        >
          Registro exitoso
        </h2>

        <p
          className="registration-success__message"
          id="registration-success-message"
        >
          Tu cuenta fue creada correctamente. Ya puedes iniciar sesión en
          PokeRockerDex.
        </p>

        <button
          className="registration-success__login"
          type="button"
          onClick={handleLoginClick}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
