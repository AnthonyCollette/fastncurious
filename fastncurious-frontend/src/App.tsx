import Nav from "./components/Nav";
import Button from "./components/ui/Button";

function App() {
  return (
    <div>
      <Nav />
      <div className="container">
        <div className="flex flex-col items-center my-12.5">
          <Button text="Nouvelle partie" />
        </div>
      </div>
    </div>
  );
}

export default App;
