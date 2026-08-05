import { Link } from 'react-router';
import Navigation from '../Navigation/Navigation.jsx';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" to="/">
          PokeRockerDex
        </Link>

        <Navigation />
      </div>
    </header>
  );
}

export default Header;
