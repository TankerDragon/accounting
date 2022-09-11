import "./App.css";
import { HashRouter } from "react-router-dom";
import Pages from "./components/Pages";
// import styles

function App() {
  return (
    <div className="App" id="App">
      <HashRouter>
        <Pages />
      </HashRouter>
    </div>
  );
}

export default App;
