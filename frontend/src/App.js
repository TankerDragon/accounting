import "./App.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Pages from "./components/pages/Pages";
// import styles

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Pages />
      </HashRouter>
    </div>
  );
}

export default App;
