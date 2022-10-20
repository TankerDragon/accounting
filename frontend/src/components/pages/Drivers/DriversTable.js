import { Link, useNavigate } from "react-router-dom";
// import icons
import { BsPencil } from "react-icons/bs";

const getName = (id, names) => {
  for (let name of names) {
    if (name.id === id) return name.first_name + " " + name.last_name;
  }
  return "! name not found !";
};

const DriversTable = ({ drivers }) => {
  const navigate = useNavigate();

  return (
    <table className="table">
      <thead>
        <tr>
          <th>№</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Dispatcher</th>
          <th>Driver type</th>
          <th>Gross target</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver, index) => {
          return (
            <tr key={driver.id}>
              <td>{index + 1}</td>
              <td>{driver.first_name}</td>
              <td>{driver.last_name}</td>
              <td>{driver.dispatcher}</td>
              <td>{driver.driver_type}</td>
              <td>{driver.gross_target}</td>
              <td>
                <div className="actions">
                  <div
                    className="icon-holder"
                    onClick={() => {
                      navigate("/edit-driver/" + driver.id);
                    }}
                  >
                    <BsPencil className="icon edit" />
                  </div>
                  {driver.edited_link && (
                    <div className="msg">
                      <Link to={"/edit-archive/" + driver.id}>edited</Link>
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

export default DriversTable;
