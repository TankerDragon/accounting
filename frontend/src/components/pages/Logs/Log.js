import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GraphDay from "../../../images/chartday.svg";

const Log = () => {
  const params = useParams();
  console.log(params.id, params.date);

  const [logs, setLogs] = useState([
    {
      id: 1,
      status: "off",
      start: "05:00",
    },
  ]);

  return (
    <div className="page-container">
      <div className="graph">
        <img src={GraphDay} alt="graph-day" />
        <div>
          {logs.map((log) => {
            return <span>hey</span>;
          })}
        </div>
      </div>
      <table className="eld-table">
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
                <td>
                  <span className="status">{log.status}</span>
                </td>
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
      </table>
    </div>
  );
};

export default Log;
