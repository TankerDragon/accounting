import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import Table from "./Table";
import GrossForm from "./GrossForm";

const GROSS_URL = "/api/gross/";

const GrossBoard = () => {
  let params = useParams();
  const navigate = useNavigate();

  const { auth } = useAuth();

  const [logs, setLogs] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    getLogs();
  }, []);

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
  };

  return (
    <div className="page-container">
      <div className="row">
        <h1>Driver archive</h1>
        <button className="button" onClick={() => setFormOpen(!formOpen)}>
          New Gross
        </button>
      </div>
      <div style={{ overflow: "auto", height: "80vh" }}>
        <Table logs={logs} />
      </div>
      {formOpen && <GrossForm drivers={drivers} closeForm={closeForm} />}
    </div>
  );
};

export default GrossBoard;
