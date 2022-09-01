import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GraphDay from "../images/chartday.svg";
// import styles
import { Style } from "../styles/Style.style";
// import functions
import { Functions } from "../Functions";

function Log() {
  // const getDate = Functions.getDate;
  const params = useParams();
  console.log(params.id, params.date);

  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = async () => {
    const response = await fetch(`/api/logs/${params.id}/${params.date}`);
    const data = await response.json();
    console.log(data);
    setLogs(data);
  };

  return (
    <Style.Container>
      <Style.Graph>
        <img src={GraphDay} alt="graph-day" />
        <div></div>
      </Style.Graph>
      <Style.Table>
        <thead>
          <tr>
            <th>№</th>
            <th>status</th>
            <th>start</th>
            <th>duration</th>
            <th>location</th>
            <th>vehicle</th>
            <th>odometer</th>
            <th>eng. hours</th>
            <th>notes</th>
            <th>document</th>
            <th>trailer</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => {
            return (
              <tr key={log.id}>
                <td>{index + 1}</td>
                <td>{log.status}</td>
                <td>{log.time}</td>
                <td>*</td>
                <td>{log.location}</td>
                <td>{log.vehicle}</td>
                <td>{log.odometer}</td>
                <td>{log.eng_hours}</td>
                <td>{log.notes}</td>
                <td>{log.document}</td>
                <td>{log.trailer}</td>
                <td>pen</td>
              </tr>
            );
          })}
        </tbody>
      </Style.Table>
    </Style.Container>
  );
}

export default Log;
