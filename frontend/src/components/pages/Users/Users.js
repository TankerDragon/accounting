import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import UsersTable from "./UsersTable";
import UsersForm from "./UsersForm";

const USERS_URL = "/api/users/";

const Users = () => {
  const { auth } = useAuth();

  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState({});

  const [formOpen, setFormOpen] = useState(false);
  const [method, setMethod] = useState("POST");

  useEffect(() => {
    getUsers();
  }, []);

  const closeForm = ({ reload }) => {
    setFormOpen(false);
    if (reload) {
      getUsers();
    }
  };

  const handleEdit = (handle) => {
    setEdit(handle);
    setMethod("PUT");
    setFormOpen(true);
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
        <button
          className="button"
          onClick={() => {
            setMethod("POST");
            setFormOpen(!formOpen);
          }}
        >
          New User
        </button>
      </div>
      <UsersTable users={users} handleEdit={handleEdit} />
      {formOpen && <UsersForm closeForm={closeForm} method={method} edit={edit} />}
    </div>
  );
};

export default Users;
