import { Link, useNavigate } from "react-router-dom";
// import icons
import { BsPencil } from "react-icons/bs";
import { BiUser } from "react-icons/bi";

const fixDate = (dateTime) => {
  const time = new Date(dateTime);
  return time.toLocaleDateString() + " - " + time.toLocaleTimeString();
};

const getName = (id, names) => {
  for (let name of names) {
    if (name.id === id) return name.first_name + " " + name.last_name;
  }
  return "! name not found !";
};

const GrossTable = ({ logs, drivers, dispatchers, handleEdit }) => {
  const navigate = useNavigate();

  return (
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
              <td>{log.user}</td>
              <td>{log.pcs_number}</td>
              <td>{log.carrier}</td>
              <td>{log.bol_number}</td>
              <td>{log.time}</td>
              <td>{getName(log.dispatcher, dispatchers)}</td>
              <td>{log.truck}</td>
              <td>{log.trailer}</td>
              <td>{getName(log.driver, drivers)}</td>
              <td>{log.original_rate}</td>
              <td>{log.current_rate}</td>
              <td className={log.change > 0 ? "good" : log.change < 0 ? "bad" : ""}>{log.change}</td>
              <td>{log.total_miles}</td>
              <td
                className={
                  log.status === "CO" ? "covered" : log.status === "SO" ? "sold" : log.status === "TO" ? "tonu" : log.status === "RJ" ? "rejected" : log.status === "RM" ? "removed" : "rejected"
                }
              >
                {log.status === "CO" ? "Covered" : log.status === "SO" ? "Sold" : log.status === "TO" ? "Tonu" : log.status === "RJ" ? "Rejected" : log.status === "RM" ? "Removed" : "***error"}
              </td>
              <td>{log.budget_type === "D" ? "Driver's" : log.budget_type === "L" ? "Lane" : log.budget_type === "R" ? "Recovery" : log.budget_type === "S" ? "Dirilis" : "***error"}</td>
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
                  {log.is_edited && (
                    <div className="msg">
                      <Link to={"/edit-archive/" + log.id}>edited</Link>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GrossTable;
