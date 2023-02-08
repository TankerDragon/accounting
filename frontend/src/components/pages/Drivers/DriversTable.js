import { BsPencil } from "react-icons/bs";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { DRIVER_TYPE, DRIVER_STATUS } from "../../../constants/constants";
import { getUsername, getChoice } from "../../../functions/Functions";

const DriversTable = ({ drivers, dispatchers, handleEdit, handleUpdates }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>№</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Dispatcher</th>
            <th>Status</th>
            <th>Driver type</th>
            <th>Gross target</th>
            <th>Notes</th>
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
                <td>{getUsername(driver.dispatcher, dispatchers)}</td>
                <td>{getChoice(driver.status, DRIVER_STATUS)}</td>
                <td>{getChoice(driver.driver_type, DRIVER_TYPE)}</td>
                <td>{driver.gross_target}</td>
                <td>{driver.notes}</td>
                <td>
                  <div className="actions">
                    <div
                      className="icon-holder"
                      title="edit"
                      onClick={() => {
                        handleEdit(driver);
                      }}
                    >
                      <BsPencil className="icon edit" />
                    </div>
                    <div
                      className="icon-holder"
                      title="see all updates"
                      onClick={() => {
                        handleUpdates(driver);
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

export default DriversTable;
