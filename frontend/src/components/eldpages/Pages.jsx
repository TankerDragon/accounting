import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
//
import Units from "./Units";
import Logs from "./Logs";
import Log from "./Log";
import Drivers from "./Drivers";
import Driver from "./Driver";
import NewDriver from "./NewDriver";
import Vehicles from "./Vehicles";
import Vehicle from "./Vehicle";
import NewVehicle from "./NewVehicle";
import Users from "./Users";

function Pages() {
  return (
    <Container>
      <Routes>
        <Route path="/units" element={<Units />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/log/:id/:date" element={<Log />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/driver/:id" element={<Driver />} />
        <Route path="/new-driver" element={<NewDriver />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicle/:id" element={<Vehicle />} />
        <Route path="/new-vehicle" element={<NewVehicle />} />
        <Route path="/users" element={<Users />} />
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
`;

export default Pages;
