import { Route, Routes, HashRouter } from "react-router-dom";
// pages
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ControlBar from "./components/ControlBar";
// import GrossBoard from "./pages/grossBoard/GrossBoard";

// import styles
import "./App.css";
import "./index.css";
import styled from "styled-components";

const ROLES = {
  Owner: "OWN",
  Admin: "ADM",
  Dispatcher: "DIS",
  Updater: "UPD",
};

const App = () => {
  return (
    <div className="App" id="App">
      <Container>
        <Navbar />
        <ControlBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Drivers />} />
            <Route path="/gross-board" element={<GrossBoard />} />
            <Route path="/drivers-gross" element={<></>} />
            <Route path="/dispatchers-gross" element={<></>} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/dispatchers" element={<Dispatchers />} />
            <Route path="/new-driver" element={<NewDriver />} />
            <Route path="/edit-driver/:id" element={<EditDriver />} />
            <Route path="/new-dispatcher" element={<NewDispatcher />} />
            <Route path="/edit-dispatcher/:id" element={<EditDispatcher />} />
            <Route path="/archive/:id" element={<DriverArchive />} />
            <Route path="/edit-log/:id" element={<EditLog />} />
            <Route path="/edit-archive/:id" element={<EditArchive />} /> */}
        </Routes>
      </Container>
    </div>
  );
};

export default App;

const Container = styled.div`
  background: var(--color-background);
  position: fixed;
  right: 0;
  width: calc(100% - 220px);
  height: 100vh;
  overflow: auto;
`;
