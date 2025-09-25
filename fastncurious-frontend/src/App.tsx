import { Link } from "react-router";
import Nav from "./components/Nav";
import CreatePlayer from "./components/features/CreatePlayer";

function App() {
  return (
    <div>
      <Nav />
      <div className="container">
        <div className="flex flex-col items-center my-12.5">
          <CreatePlayer />
          <Link
            to="/lobby"
            className="cursor-pointer bg-purple border-3 border-orange text-orange text-2xl py-2 px-10 rounded-xl font-primary--bold hover:bg-orange hover:text-purple"
          >
            Démarrer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
