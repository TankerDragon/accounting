import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import incons
import { FaDollarSign } from "react-icons/fa";
import { FiClock, FiUser } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { BsPencil } from "react-icons/bs";
// import styles
import { Style } from "../styles/Style.style";

function EditArchive() {
  let params = useParams();
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = async () => {
    const response = await fetch(`/api/archive/edits/` + params.id, {
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
    <Style.Container>
      <Style.Row>
        <h1>Edited history</h1>
      </Style.Row>
      <Style.Table>
        <thead>
          <tr>
            <th>Original rate</th>
            <th>Current rate</th>
            <th>Change</th>
            <th>Mileage</th>
            <th>Budget type</th>
            <th>Autobooker</th>
            <th>Changed time</th>
            <th>Changed by</th>
            <th>BOL number</th>
            <th>PCS number</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => {
            return (
              <tr key={log.id} style={index === 0 ? { background: "rgb(177, 226, 177)" } : {}}>
                <td>{log.original_rate}</td>
                <td>{log.current_rate}</td>
                <td>{log.change}</td>
                <td>{log.total_miles}</td>
                <td>{log.budget_type === "D" ? "Driver's" : log.budget_type === "L" ? "Lane" : log.budget_type === "R" ? "Recovery" : log.budget_type === "S" ? "Dirilis" : "***error"}</td>
                <td>{log.autobooker ? "yes" : ""}</td>
                <td>{log.date}</td>
                <td>{log.user}</td>
                <td>{log.bol_number}</td>
                <td>{log.pcs_number}</td>
                <td>{log.note}</td>
              </tr>
            );
          })}
        </tbody>
      </Style.Table>
    </Style.Container>
  );
}

export default EditArchive;
