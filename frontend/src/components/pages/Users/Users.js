import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import useRequest from "../../../hooks/useRequest";
import UsersTable from "./UsersTable";
import UsersForm from "./UsersForm";
import Loading from "../../common/Loading";
import { USERS_URL } from "../../../constants/constants";

const Users = () => {
  const request = useRequest(USERS_URL);

  useEffect(() => {
    request.getData();
  }, []);

  const [formOpen, setFormOpen] = useState(false);
  const [edit, setEdit] = useState({});
  const [method, setMethod] = useState("POST");

  const closeForm = ({ reload }) => {
    setFormOpen(false);
    if (reload) {
      request.getData();
    }
  };

  const handleEdit = (handle) => {
    setEdit(handle);
    setMethod("PUT");
    setFormOpen(true);
  };

  return (
    <div className="page-container">
      <div className="row">
        <h1>Users</h1>
        <button
          className="button"
          onClick={() => {
            setMethod("POST");
            setFormOpen(true);
          }}
        >
          New User
        </button>
      </div>
      {request.isLoading ? (
        <Loading />
      ) : (
        <UsersTable users={request.data} handleEdit={handleEdit} />
      )}
      <AnimatePresence initial={false}>
        {formOpen && (
          <UsersForm closeForm={closeForm} method={method} edit={edit} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Users;
