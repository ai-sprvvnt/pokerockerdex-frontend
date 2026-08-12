import './About.css';

function About() {
  return (
    <section className="about" aria-labelledby="about-title">
      <div className="about__container">
        <div className="about__content">
          <p className="about__eyebrow">Sobre el proyecto</p>

          <h2 className="about__title" id="about-title">
            PokeRockerDex
          </h2>

          <p className="about__description">
            PokeRockerDex es una aplicación full stack desarrollada como
            proyecto final del Bootcamp de TripleTen. Utilizará PokéAPI para
            consultar información y una API propia para administrar los datos
            guardados por cada usuario.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
