import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DiAndroid } from "react-icons/di";
import { ImPencil, ImCross } from "react-icons/im";
// import styles
import { Style } from "../styles/Style.style";

function Drivers() {
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
        <h1>Drivers</h1>
        <Style.SButton to={"/new-driver"}>Add Driver</Style.SButton>
      </Style.Row>
      <Style.STable>
        <thead>
          <tr>
            <th>№</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Username</th>
            <th>Co-Driver</th>
            <th>Vehicle</th>
            <th>App version</th>
            <th>Device info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => {
            return (
              <tr key={driver.id}>
                <td>{index + 1}</td>
                <td>{driver.first_name}</td>
                <td>{driver.last_name}</td>
                <td>{driver.username}</td>
                <td>{driver.profile.co_driver_name}</td>
                <td>{driver.profile.vehicle_unit_number}</td>
                <td className="android">
                  <DiAndroid />
                  {driver.profile.app_version}
                </td>
                <td>*</td>
                <td className="actions">
                  <Link to={"/driver/" + driver.profile.id}>
                    <ImPencil className="pen" />
                  </Link>
                  <ImCross className="cross" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Style.STable>
    </Style.Container>
  );
}

export default Drivers;
