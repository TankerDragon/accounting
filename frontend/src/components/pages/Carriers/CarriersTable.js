import { BsPencil } from "react-icons/bs";

const CarriersTable = ({ carriers, handleEdit }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>№</th>
            <th>name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Total gross</th>
            <th>Total loads</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carriers.map((carrier, index) => {
            return (
              <tr key={carrier.id}>
                <td>{index + 1}</td>
                <td>{carrier.name}</td>
                <td>{carrier.address}</td>
                <td>{carrier.phone}</td>
                {/* <td>{getName(carrier.dispatcher, dispatchers)}</td> */}
                {/* <td>{getChoice(carrier.carrier_type, carrier_TYPE)}</td> */}
                <td>{carrier.total_gross}</td>
                <td>{carrier.total_loads}</td>
                <td>{carrier.notes}</td>
                <td>
                  <div className="actions">
                    <div
                      className="icon-holder"
                      onClick={() => {
                        handleEdit(carrier);
                      }}
                    >
                      <BsPencil className="icon edit" />
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

export default CarriersTable;
