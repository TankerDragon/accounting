// import icons
import { BsPencil } from "react-icons/bs";

const getName = (id, names) => {
  for (let name of names) {
    if (name.id === id) return name.first_name + " " + name.last_name;
  }
  return "! name not found !";
};

const getChoice = (choice, choices) => {
  let found = "!!! not found !!!";
  Object.keys(choices).forEach((ch) => {
    if (ch === choice) {
      found = choices[ch];
    }
  });
  return found;
};

const USER_ROLES = {
  OWN: "Owner",
  ADM: "Admin",
  DIS: "Dispatcher",
  UPD: "Updater",
};

const UsersTable = ({ users, handleEdit }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>№</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Username</th>
          <th>User role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          return (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.username}</td>
              <td>{getChoice(user.role, USER_ROLES)}</td>
              <td>
                <div className="actions">
                  <div
                    className="icon-holder"
                    onClick={() => {
                      handleEdit(user);
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
  );
};

export default UsersTable;
