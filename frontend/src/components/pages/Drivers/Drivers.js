import { useEffect, useState } from "react";
import useMessage from "../../../hooks/useMessage";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import DriversTable from "./DriversTable";
import DriversForm from "./DriversForm";

const DRIVERS_URL = "/api/drivers/";

const Drivers = () => {
  const { auth } = useAuth();
  const { createMessage } = useMessage();

  const [drivers, setDrivers] = useState([]);
  const [edit, setEdit] = useState({});
  const [dispatchers, setDispatchers] = useState([]);

  const [formOpen, setFormOpen] = useState(false);
  const [method, setMethod] = useState("POST");

  useEffect(() => {
    getDrivers();
  }, []);

  const closeForm = ({ reload }) => {
    setFormOpen(false);
    if (reload) {
      getDrivers();
    }
  };

  const handleEdit = (driver) => {
    setEdit(driver);
    setMethod("PUT");
    setFormOpen(true);
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
        <button
          className="button"
          onClick={() => {
            setMethod("POST");
            setFormOpen(!formOpen);
          }}
        >
          New Driver
        </button>
      </div>
      <DriversTable drivers={drivers} dispatchers={dispatchers} handleEdit={handleEdit} />
      {formOpen && <DriversForm closeForm={closeForm} dispatchers={dispatchers} method={method} edit={edit} />}
    </div>
  );
};

export default Drivers;
