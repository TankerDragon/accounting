import "./App.css";
import { BrowserRouter, Link } from "react-router-dom";
import Pages from "./components/pages/Pages";
// import styles

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
