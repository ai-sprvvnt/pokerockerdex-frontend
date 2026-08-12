import { Link } from 'react-router';
import Navigation from '../Navigation/Navigation.jsx';
import './Header.css';

function Header({ onResetExplorer }) {
  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" to="/" onClick={onResetExplorer}>
          PokeRockerDex
        </Link>

        <Navigation onResetExplorer={onResetExplorer} />
      </div>
    </header>
  );
}

export default Header;
