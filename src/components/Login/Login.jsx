import { useCallback, useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './Login.css';

const INITIAL_FORM = {
  email: '',
  password: '',
};

const INITIAL_ERRORS = {
  email: '',
  password: '',
};

function validateField(name, value) {
  if (name === 'email') {
    const normalizedEmail = value.trim();

    if (!normalizedEmail) {
      return 'Ingresa tu correo electrónico.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      return 'Ingresa un correo electrónico válido.';
    }
  }

  if (name === 'password' && !value) {
    return 'Ingresa tu contraseña.';
  }

  return '';
}

function Login({ isOpen, onClose }) {
  const { onLogin } = useContext(CurrentUserContext);
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = useCallback(() => {
    setFormValues(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setServerError('');
    setIsSubmitting(false);
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, value),
    }));

    setServerError('');
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, value),
    }));
  };

  const emailError = validateField('email', formValues.email);
  const passwordError = validateField('password', formValues.password);

  const isFormValid = !emailError && !passwordError;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {
      email: emailError,
      password: passwordError,
    };

    setErrors(nextErrors);

    if (!isFormValid) {
      return;
    }

    setServerError('');
    setIsSubmitting(true);

    try {
      await onLogin({
        email: formValues.email.trim(),
        password: formValues.password,
      });

      resetForm();
      onClose();
    } catch (error) {
      setServerError(
        error.message ?? 'No fue posible iniciar sesión. Inténtalo nuevamente.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login" role="presentation" onMouseDown={handleOverlayClick}>
      <div
        className="login__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <button
          className="login__close"
          type="button"
          aria-label="Cerrar inicio de sesión"
          onClick={handleClose}
        >
          ×
        </button>

        <h2 className="login__title" id="login-title">
          Iniciar sesión
        </h2>

        <form className="login__form" noValidate onSubmit={handleSubmit}>
          <label className="login__field">
            <span className="login__label">Correo electrónico</span>

            <input
              className={`login__input${
                errors.email ? ' login__input_error' : ''
              }`}
              type="email"
              name="email"
              value={formValues.email}
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby="login-email-error"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <span className="login__error" id="login-email-error">
              {errors.email}
            </span>
          </label>

          <label className="login__field">
            <span className="login__label">Contraseña</span>

            <input
              className={`login__input${
                errors.password ? ' login__input_error' : ''
              }`}
              type="password"
              name="password"
              value={formValues.password}
              placeholder="Tu contraseña"
              autoComplete="current-password"
              required
              aria-invalid={Boolean(errors.password)}
              aria-describedby="login-password-error"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <span className="login__error" id="login-password-error">
              {errors.password}
            </span>
          </label>

          {serverError && (
            <p className="login__server-error" role="alert">
              {serverError}
            </p>
          )}

          <button
            className="login__submit"
            type="submit"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
