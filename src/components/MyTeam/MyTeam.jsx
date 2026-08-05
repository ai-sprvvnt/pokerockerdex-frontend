import './MyTeam.css';

function MyTeam() {
  return (
    <section className="my-team" aria-labelledby="my-team-title">
      <div className="my-team__container">
        <p className="my-team__eyebrow">Equipo personal</p>

        <h1 className="my-team__title" id="my-team-title">
          Mi equipo
        </h1>

        <p className="my-team__description">
          Aquí podrás formar un equipo de hasta seis Pokémon, sin integrantes
          duplicados.
        </p>

        <div className="my-team__placeholder" role="status">
          La autenticación y la persistencia del equipo se implementará en otra
          etapa posterior.
        </div>
      </div>
    </section>
  );
}

export default MyTeam;
