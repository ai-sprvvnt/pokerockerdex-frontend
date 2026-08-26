import { useContext } from 'react';
import { NavLink } from 'react-router';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './Navigation.css';

function Navigation({ onResetExplorer, onLoginClick, onRegisterClick }) {
  const { loggedIn, isAuthChecking, onLogout } = useContext(CurrentUserContext);

  const getLinkClassName = ({ isActive }) =>
    `navigation__link${isActive ? ' navigation__link_active' : ''}`;

  return (
    <nav className="navigation" aria-label="Navegación principal">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            className={getLinkClassName}
            end
            to="/"
            onClick={onResetExplorer}
          >
            Explorar
          </NavLink>
        </li>

        {!isAuthChecking &&
          (loggedIn ? (
            <>
              <li className="navigation__item">
                <NavLink className={getLinkClassName} to="/my-team">
                  Mi equipo
                </NavLink>
              </li>

              <li className="navigation__item">
                <button
                  className="navigation__button"
                  type="button"
                  onClick={onLogout}
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navigation__item">
                <button
                  className="navigation__button"
                  type="button"
                  onClick={onLoginClick}
                >
                  Iniciar sesión
                </button>
              </li>

              <li className="navigation__item">
                <button
                  className="navigation__button"
                  type="button"
                  onClick={onRegisterClick}
                >
                  Registrarse
                </button>
              </li>
            </>
          ))}
      </ul>
    </nav>
  );
}

export default Navigation;
