import { Link, useNavigate } from "react-router-dom";
// import icons
import { BsPencil } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import {
  fixDate,
  getName,
  getUsername,
  getChoice,
  getFullName,
} from "../../../functions/Functions";
import { GROSS_STATUS, BUDGET_TYPE } from "../../../constants/constants";

const GrossTable = ({
  logs,
  drivers,
  dispatchers,
  users,
  carriers,
  handleEdit,
  handleUpdates,
}) => {
  const navigate = useNavigate();

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <BiUser />
            </th>
            <th>PCS number</th>
            <th>Carrier</th>
            <th>Load ID</th>
            <th>Date and Time</th>
            <th>Dispatcher</th>
            <th>Truck</th>
            <th>Trailer</th>
            <th>Driver's name</th>
            <th>Original rate</th>
            <th>Current rate</th>
            <th>Change</th>
            <th>Mileage</th>
            <th>Status</th>
            <th>Budget type</th>
            <th>Autobooker</th>
            <th>Origin</th>
            <th></th>
            <th>Destination</th>
            <th></th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => {
            return (
              <tr key={log.id}>
                <td>{getUsername(log.user, users)}</td>
                <td>{log.pcs_number}</td>
                <td>{getName(log.carrier, carriers)}</td>
                <td>{log.bol_number}</td>
                <td>{fixDate(log.time)}</td>
                <td>{getUsername(log.dispatcher, dispatchers)}</td>
                <td>{log.truck}</td>
                <td>{log.trailer}</td>
                <td>{getFullName(log.driver, drivers)}</td>
                <td>{log.original_rate}</td>
                <td>{log.current_rate}</td>
                <td
                  className={
                    log.change > 0 ? "good" : log.change < 0 ? "bad" : ""
                  }
                >
                  {log.change}
                </td>
                <td>{log.total_miles}</td>
                <td
                  className={
                    log.status === "CO"
                      ? "covered"
                      : log.status === "SO"
                      ? "sold"
                      : log.status === "TO"
                      ? "tonu"
                      : log.status === "RJ"
                      ? "rejected"
                      : log.status === "RM"
                      ? "removed"
                      : "rejected"
                  }
                >
                  {getChoice(log.status, GROSS_STATUS)}
                </td>
                <td>{getChoice(log.budget_type, BUDGET_TYPE)}</td>
                <td>{log.autobooker ? "yes" : ""}</td>
                <td>{log.origin}</td>
                <td>{log.origin_state}</td>
                <td>{log.destination}</td>
                <td>{log.destination_state}</td>
                <td>{log.note}</td>
                <td>
                  <div className="actions">
                    <div
                      className="icon-holder"
                      onClick={() => {
                        handleEdit(log);
                      }}
                    >
                      <BsPencil className="icon edit" />
                    </div>
                    <div
                      className="icon-holder"
                      title="see all updates"
                      onClick={() => {
                        handleUpdates(log);
                      }}
                    >
                      <GiAnticlockwiseRotation className="icon clock" />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GrossTable;
