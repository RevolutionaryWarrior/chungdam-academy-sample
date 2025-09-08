import "./App.css";
import Header from "./components/Common/Header";

function App() {
  return (
    <div className="min-w-[750px] mx-auto">
      <Header title="Vocabulary Map" max={2} />
    </div>
  );
}

export default App;
