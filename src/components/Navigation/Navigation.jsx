import { NavLink } from 'react-router';
import './Navigation.css';

function Navigation() {
  const getLinkClassName = ({ isActive }) =>
    `navigation__link${isActive ? ' navigation__link_active' : ''}`;

  return (
    <nav className="navigation" aria-label="Navegación principal">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink className={getLinkClassName} end to="/">
            Explorar
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink className={getLinkClassName} to="/my-team">
            Mi equipo
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
