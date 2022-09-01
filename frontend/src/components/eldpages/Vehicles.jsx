import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImPencil, ImCross } from "react-icons/im";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    const response = await fetch(`/api/vehicles/`);
    const data = await response.json();
    console.log(data);
    setVehicles(data);
  };

  return (
    <Container>
      <Row>
        <h1>Vehicles</h1>
        <SButton to={"/new-vehicle"}>Add Vehicle</SButton>
      </Row>
      <STable>
        <thead>
          <tr>
            <th>№</th>
            <th>Unit number</th>
            <th>Driver</th>
            <th>Make / Model</th>
            <th>Plate number</th>
            <th>License state</th>
            <th>notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => {
            return (
              <tr key={vehicle.id}>
                <td>{index + 1}</td>
                <td>{vehicle.unit_number}</td>
                <td>{vehicle.full_name}</td>
                <td>
                  {vehicle.make} / {vehicle.model}
                </td>
                <td>{vehicle.license_number}</td>
                <td>{vehicle.license_state}</td>
                <td>{vehicle.notes}</td>
                <td className="actions">
                  <Link to={"/vehicle/" + vehicle.id}>
                    <ImPencil className="pen" />
                  </Link>
                  <ImCross className="cross" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </STable>
    </Container>
  );
}

const Container = styled.div`
  background: lightseagreen;
  width: calc(100% - 40px);
  margin: auto;
  margin-top: 50px;
  min-height: 80vh;
  border-radius: 20px;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    color: #1d1d1d;
  }
`;

const SButton = styled(Link)`
  padding: 12px 18px;
  background: #00bfff;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  color: #1d1d1d;
  font-weight: bold;
`;

const STable = styled.table`
  width: 100%;
  border-collapse: collapse;
  padding: 0px;
  margin-top: 40px;

  td,
  th {
    border: 1px solid #1d1d1d;
    padding: 8px 10px;
  }
  tr:hover {
    background: lightblue;
  }
  .android {
    color: green;
    svg {
      margin-right: 7px;
    }
  }
  .actions {
    .pen,
    .cross {
      cursor: pointer;
    }
    .pen {
      color: #c49234;
      margin-right: 25px;
    }
    .cross {
      color: #c43f3f;
    }
  }
`;

export default Vehicles;
