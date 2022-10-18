import { Link, useNavigate } from "react-router-dom";
// import icons
import { BsPencil } from "react-icons/bs";

const fixDate = (dateTime) => {
  const time = new Date(dateTime);
  return time.toLocaleDateString() + " - " + time.toLocaleTimeString();
};

const Table = ({ logs }) => {
  const navigate = useNavigate();

  return (
    <table className="table">
      <thead>
        <tr style={{ whiteSpace: "nowrap" }}>
          <th>№</th>
          <th>PCS number</th>
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
              <td>{index + 1}</td>
              <td>{log.pcs_number}</td>
              <td>{log.bol_number}</td>
              <td>
                {log.date} & {log.time}
              </td>
              <td>{log.user}</td>
              <td>{log.truck}</td>
              <td>{log.trailer}</td>
              <td>{log.name}</td>
              <td>{log.original_rate}</td>
              <td>{log.current_rate}</td>
              <td>{log.change}</td>
              <td>{log.total_miles}</td>
              <td>{log.status === "CO" ? "Covered" : log.status === "SO" ? "Sold" : log.status === "TO" ? "Tonu" : log.status === "RJ" ? "Rejected" : log.status === "RM" ? "Removed" : "***error"}</td>
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
                      navigate("/edit-log/" + log.id);
                    }}
                  >
                    <BsPencil className="icon edit" />
                  </div>
                  {log.edited_link && (
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

export default Table;
