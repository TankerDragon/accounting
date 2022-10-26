import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import GrossTable from "./GrossTable";
import GrossForm from "./GrossForm";

const GROSS_URL = "/api/gross/";

const GrossBoard = () => {
  const { auth } = useAuth();

  const [logs, setLogs] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);
  const [edit, setEdit] = useState({});

  const [formOpen, setFormOpen] = useState(false);
  const [method, setMethod] = useState("POST");

  useEffect(() => {
    getLogs();
  }, []);

  const handleEdit = (edit) => {
    setEdit(edit);
    setMethod("PUT");
    setFormOpen(true);
  };

  const closeForm = ({ reload }) => {
    setFormOpen(false);
    if (reload) {
      getLogs();
    }
  };

  const getLogs = async () => {
    const response = await axios.get(GROSS_URL, {
      headers: { "Content-Type": "application/json", Authorization: "JWT " + auth.accessToken },
      // withCredentials: true,
    });
    console.log("***data", response);
    setLogs(response.data.logs);
    setDrivers(response.data.drivers);
    setDispatchers(response.data.dispatchers);
  };

  return (
    <div className="page-container">
      <div className="row">
        <h1>Gross board</h1>
        <button
          className="button"
          onClick={() => {
            setMethod("POST");
            setFormOpen(!formOpen);
          }}
        >
          New Gross
        </button>
      </div>
      <div style={{ overflow: "auto", height: "80vh" }}>
        <GrossTable logs={logs} drivers={drivers} dispatchers={dispatchers} handleEdit={handleEdit} />
      </div>
      {formOpen && <GrossForm drivers={drivers} dispatchers={dispatchers} closeForm={closeForm} method={method} edit={edit} />}
    </div>
  );
};

export default GrossBoard;
