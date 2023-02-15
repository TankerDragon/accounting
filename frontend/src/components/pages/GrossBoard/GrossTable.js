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
import { useState } from "react";

const GrossTable = ({
  logs,
  drivers,
  dispatchers,
  users,
  carriers,
  handleEdit,
  handleUpdates,
}) => {
  const [loads, SetLoads] = useState(logs);
  const array = [...loads];
  const handelSort = (attr) => {
    if (array[0]["sort"] === -1 || array[0]["sort"] == null) {
      array.sort((a, b) => (a[attr] < b[attr] ? -1 : 1));
      array[0]["sort"] = 1;
    } else {
      array.sort((a, b) => (a[attr] < b[attr] ? 1 : -1));
      array[0]["sort"] = -1;
    }
    SetLoads(array);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handelSort("user")}>
              <BiUser />
            </th>
            <th onClick={() => handelSort("pcs_number")}>PCS number</th>
            <th onClick={() => handelSort("carrier")}>Carrier</th>
            <th onClick={() => handelSort("bol_number")}>Load ID</th>
            <th onClick={() => handelSort("time")}>Date and Time</th>
            <th onClick={() => handelSort("dispatcher")}>Dispatcher</th>
            <th onClick={() => handelSort("truck")}>Truck</th>
            <th onClick={() => handelSort("trailer")}>Trailer</th>
            <th onClick={() => handelSort("driver")}>Driver's name</th>
            <th onClick={() => handelSort("original_rate")}>Original rate</th>
            <th onClick={() => handelSort("current_rate")}>Current rate</th>
            <th onClick={() => handelSort("change")}>Change</th>
            <th onClick={() => handelSort("total_miles")}>Mileage</th>
            <th onClick={() => handelSort("status")}>Status</th>
            <th onClick={() => handelSort("budget_type")}>Budget type</th>
            <th onClick={() => handelSort("autobooker")}>Autobooker</th>
            <th onClick={() => handelSort("origin")}>Origin</th>
            <th onClick={() => handelSort("origin_state")}></th>
            <th onClick={() => handelSort("destination")}>Destination</th>
            <th onClick={() => handelSort("destination_state")}></th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loads.map((log, index) => {
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
