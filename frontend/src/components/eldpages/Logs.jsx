import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import styles
import { Style } from "../styles/Style.style";
// import functions
import { Functions } from "../Functions";

function Logs() {
  const navigate = useNavigate();

  const getDate = Functions.getDate;

  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    const response = await fetch(`/api/drivers/`);
    const data = await response.json();
    console.log(data);
    setDrivers(data);
  };

  return (
    <Style.Container>
      <Style.Row>
        <h1>Logs</h1>
      </Style.Row>
      <Style.Table>
        <thead>
          <tr>
            <th>№</th>
            <th>Driver</th>
            <th>Truck No</th>
            <th>Status</th>
            <th>Last known location</th>
            <th>Errors & Violations</th>
            <th>Warnings</th>
            <th>Break</th>
            <th>Drive</th>
            <th>Shift</th>
            <th>Cycle</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => {
            return (
              <tr key={driver.id}>
                <td>
                  <Link to={"/log/" + driver.profile.id + "/" + getDate()}>{index + 1}</Link>
                </td>
                <td>
                  <Link to={"/log/" + driver.profile.id + "/" + getDate()}>
                    {driver.first_name} {driver.last_name}
                  </Link>
                </td>
                <td>
                  <Link to={"/log/" + driver.profile.id + "/" + getDate()}>*</Link>
                </td>
                <td>
                  <Link to={"/log/" + driver.profile.id + "/" + getDate()}>*</Link>
                </td>
                <td>
                  <Link to={"/log/" + driver.profile.id + "/" + getDate()}>*</Link>
                </td>
                <td>
                  <Link to={"/log/" + driver.profile.id + "/" + getDate()}>*</Link>
                </td>
                <td>
                  <Link to={"/log/" + driver.profile.id + "/" + getDate()}>*</Link>
                </td>
                <td>
                  <Link to={"/log/" + driver.profile.id + "/" + getDate()}>*</Link>
                </td>
                <td>
                  <Link to={"/log/" + driver.profile.id + "/" + getDate()}>*</Link>
                </td>
                <td>
                  <Link to={"/log/" + driver.profile.id + "/" + getDate()}>*</Link>
                </td>
                <td>
                  <Link to={"/log/" + driver.profile.id + "/" + getDate()}>*</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Style.Table>
    </Style.Container>
  );
}

export default Logs;
