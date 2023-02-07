import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";

const LOGS_URL = "/api/drivers/";

const Logs = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);

  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    const response = await axios.get(LOGS_URL, {
      headers: { "Content-Type": "application/json", Authorization: "JWT " + auth.accessToken },
      // withCredentials: true,
    });
    console.log("***data", response);
    setDrivers(response.data.drivers);
    setDispatchers(response.data.dispatchers);
  };

  return (
    <div className="page-container">
      <div className="row">
        <h1>Drivers</h1>
        <button className="button">New Driver</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>№</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => {
            return (
              <tr
                key={driver.id}
                onClick={() => {
                  navigate("/logs/1/11-12-2022");
                }}
              >
                <td>{index + 1}</td>
                <td>{driver.first_name}</td>
                <td>{driver.last_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
