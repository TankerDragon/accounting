import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from "./Table";
import GrossForm from "./GrossForm";

const GrossBoard = () => {
  let params = useParams();
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);

  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = async () => {
    const response = await fetch(`/api/archive/` + params.id, {
      headers: {
        Authorization: "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
      },
    });
    if (response.status === 401) {
      navigate("/login");
    }
    const data = await response.json();
    console.log("***data", data);
    setLogs(data);
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
      {formOpen && <GrossForm />}
    </div>
  );
};

export default GrossBoard;
