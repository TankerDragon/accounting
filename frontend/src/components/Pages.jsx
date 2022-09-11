import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
//
import Navbar from "./Navbar";
import ControlBar from "./ControlBar";
import Budget from "./pages/Budget";
import Dispatchers from "./pages/Dispatchers";
import NewDriver from "./pages/NewDriver";
import EditDriver from "./pages/EditDriver";
import NewDispatcher from "./pages/NewDispatcher";
import EditDispatcher from "./pages/EditDispatcher";
import Login from "./pages/Login";
import DriverArchive from "./pages/DriverArchive";
import EditLog from "./pages/EditLog";
import EditArchive from "./pages/EditArchive";

function Pages() {
  return (
    <Container>
      <Navbar />
      <ControlBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Budget />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/dispatchers" element={<Dispatchers />} />
        <Route path="/new-driver" element={<NewDriver />} />
        <Route path="/edit-driver/:id" element={<EditDriver />} />
        <Route path="/new-dispatcher" element={<NewDispatcher />} />
        <Route path="/edit-dispatcher/:id" element={<EditDispatcher />} />
        <Route path="/archive/:id" element={<DriverArchive />} />
        <Route path="/edit-log/:id" element={<EditLog />} />
        <Route path="/edit-archive/:id" element={<EditArchive />} />
      </Routes>
    </Container>
  );
}

const Container = styled.div`
  background: var(--color-background);
  position: fixed;
  right: 0;
  width: calc(100% - 220px);
  height: 100vh;
  overflow: auto;
`;

export default Pages;
