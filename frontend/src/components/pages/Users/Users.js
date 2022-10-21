import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import UsersTable from "./UsersTable";
import UsersForm from "./UsersForm";

const USERS_URL = "/api/users/";

const Users = () => {
  const { auth } = useAuth();

  const [users, setUsers] = useState([]);

  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const closeForm = ({ reload }) => {
    setFormOpen(false);
    if (reload) {
      getUsers();
    }
  };

  const getUsers = async () => {
    const response = await axios.get(USERS_URL, {
      headers: { "Content-Type": "application/json", Authorization: "JWT " + auth.accessToken },
      // withCredentials: true,
    });
    console.log("***data", response);
    setUsers(response.data);
  };

  return (
    <div className="page-container">
      <div className="row">
        <h1>Users</h1>
        <button className="button" onClick={() => setFormOpen(!formOpen)}>
          New User
        </button>
      </div>
      <div style={{ overflow: "auto", height: "80vh" }}>
        <UsersTable users={users} />
      </div>
      {formOpen && <UsersForm closeForm={closeForm} />}
    </div>
  );
};

export default Users;
