import { useCallback, useEffect, useState } from 'react';
import { register } from '../../utils/MainApi.js';
import './Register.css';

const INITIAL_FORM = {
  name: '',
  email: '',
  password: '',
};

const INITIAL_ERRORS = {
  name: '',
  email: '',
  password: '',
};

function validateField(name, value) {
  if (name === 'name' && !value.trim()) {
    return 'Ingresa tu nombre.';
  }

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

  if (name === 'password') {
    if (!value) {
      return 'Ingresa una contraseña.';
    }

    if (value.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }
  }

  return '';
}

function Register({ isOpen, onClose, onRegistrationSuccess }) {
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

  const nameError = validateField('name', formValues.name);
  const emailError = validateField('email', formValues.email);
  const passwordError = validateField('password', formValues.password);

  const isFormValid = !nameError && !emailError && !passwordError;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {
      name: nameError,
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
      await register({
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
      });

      resetForm();
      onRegistrationSuccess();
    } catch (error) {
      setServerError(error.message ?? 'No fue posible completar el registro.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="register"
      role="presentation"
      onMouseDown={handleOverlayClick}
    >
      <div
        className="register__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-title"
      >
        <button
          className="register__close"
          type="button"
          aria-label="Cerrar registro"
          onClick={handleClose}
        >
          ×
        </button>

        <h2 className="register__title" id="register-title">
          Registrarse
        </h2>

        <form className="register__form" noValidate onSubmit={handleSubmit}>
          <label className="register__field">
            <span className="register__label">Nombre</span>
            <input
              className={`register__input${
                errors.name ? ' register__input_error' : ''
              }`}
              type="text"
              name="name"
              value={formValues.name}
              autoComplete="name"
              required
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="register__error">{errors.name}</span>
          </label>

          <label className="register__field">
            <span className="register__label">Correo electrónico</span>
            <input
              className={`register__input${
                errors.email ? ' register__input_error' : ''
              }`}
              type="email"
              name="email"
              value={formValues.email}
              autoComplete="email"
              required
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="register__error">{errors.email}</span>
          </label>

          <label className="register__field">
            <span className="register__label">Contraseña</span>
            <input
              className={`register__input${
                errors.password ? ' register__input_error' : ''
              }`}
              type="password"
              name="password"
              value={formValues.password}
              autoComplete="new-password"
              required
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="register__error">{errors.password}</span>
          </label>

          {serverError && (
            <p className="register__server-error" role="alert">
              {serverError}
            </p>
          )}

          <button
            className="register__submit"
            type="submit"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
