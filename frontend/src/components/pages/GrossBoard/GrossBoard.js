import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useMessage from "../../../hooks/useMessage";
import useRequest from "../../../hooks/useRequest";
import axios from "../../../api/axios";
import GrossTable from "./GrossTable";
import GrossForm from "./GrossForm";

const GROSS_URL = "/api/gross/";

const GrossBoard = () => {
  const { auth } = useAuth();
  const { createMessage } = useMessage();

  const { data } = useRequest(GROSS_URL);

  const [logs, setLogs] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);
  const [edit, setEdit] = useState({});

  const [formOpen, setFormOpen] = useState(false);
  const [method, setMethod] = useState("POST");

  // useEffect(() => {
  //   getData();
  // }, []);

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
    try {
      const response = await axios.get(GROSS_URL, {
        headers: { "Content-Type": "application/json", Authorization: "JWT " + auth.accessToken },
        // withCredentials: true,
      });
      console.log("***data", response);
      setLogs(response.data.logs);
      setDrivers(response.data.drivers);
      setDispatchers(response.data.dispatchers);
    } catch (err) {
      createMessage({ type: "danger", content: err.message });
    }
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
      <div className="table-container">
        <GrossTable logs={logs} drivers={drivers} dispatchers={dispatchers} handleEdit={handleEdit} />
      </div>
      {formOpen && <GrossForm drivers={drivers} dispatchers={dispatchers} closeForm={closeForm} method={method} edit={edit} />}
    </div>
  );
};

export default GrossBoard;
