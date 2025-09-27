import Nav from "./components/Nav";
import CreatePlayer from "./components/features/CreatePlayer";

function App() {
  return (
    <div>
      <Nav />
      <div className="container">
        <div className="flex flex-col items-center my-12.5">
          <CreatePlayer />
        </div>
      </div>
    </div>
  );
}

export default App;
