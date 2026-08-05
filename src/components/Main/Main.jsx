import { Route, Routes } from 'react-router';
import Home from '../Home/Home.jsx';
import PokemonDetail from '../PokemonDetail/PokemonDetail.jsx';
import MyTeam from '../MyTeam/MyTeam.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import './Main.css';

function Main() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/my-team" element={<MyTeam />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default Main;
