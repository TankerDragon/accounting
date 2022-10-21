import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import DriversTable from "./DriversTable";
import DriversForm from "./DriversForm";

const DRIVERS_URL = "/api/drivers/";

const Drivers = () => {
  const { auth } = useAuth();

  const [drivers, setDrivers] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);

  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    getDrivers();
  }, []);

  const closeForm = ({ reload }) => {
    setFormOpen(false);
    if (reload) {
      getDrivers();
    }
  };

  const getDrivers = async () => {
    const response = await axios.get(DRIVERS_URL, {
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
        <button className="button" onClick={() => setFormOpen(!formOpen)}>
          New Driver
        </button>
      </div>
      <div style={{ overflow: "auto", height: "80vh" }}>
        <DriversTable drivers={drivers} />
      </div>
      {formOpen && <DriversForm closeForm={closeForm} dispatchers={dispatchers} />}
    </div>
  );
};

export default Drivers;
