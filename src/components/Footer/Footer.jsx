import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">© {currentYear} PokeRockerDex</p>

        <p className="footer__description">
          Proyecto final de desarrollo web en el Bootcamp de TripleTen por
          Felipe García
        </p>
      </div>
    </footer>
  );
}

export default Footer;
