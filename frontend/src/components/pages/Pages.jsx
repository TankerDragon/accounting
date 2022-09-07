import { useState } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
//
import Navbar from "../Navbar";
import Budget from "./Budget";
import Dispatchers from "./Dispatchers";
import NewDriver from "./NewDriver";
import NewDispatcher from "./NewDispatcher";
import Login from "./Login";
import DriverArchive from "./DriverArchive";
import EditLog from "./EditLog";
import EditArchive from "./EditArchive";

function Pages() {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/dispatchers" element={<Dispatchers />} />
        <Route path="/new-driver" element={<NewDriver />} />
        <Route path="/new-dispatcher" element={<NewDispatcher />} />
        <Route path="/archive/:id" element={<DriverArchive />} />
        <Route path="/edit-log/:id" element={<EditLog />} />
        <Route path="/edit-archive/:id" element={<EditArchive />} />
      </Routes>
    </Container>
  );
}

const Container = styled.div`
  background: #f4f5f7;
  position: fixed;
  right: 0;
  width: calc(100% - 220px);
  height: 100vh;
  overflow: auto;
`;

export default Pages;
