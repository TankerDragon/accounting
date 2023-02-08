import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import useRequest from "../../../hooks/useRequest";
import DriversTable from "./DriversTable";
import DriversForm from "./DriversForm";
import DriverUpdates from "./DriverUpdates";
import Loading from "../../common/Loading";
import {
  DRIVERS_URL,
  USERS_LIST_URL,
  DISPATCHERS_LIST_URL,
} from "../../../constants/constants";

const Drivers = () => {
  const request = useRequest(DRIVERS_URL);
  const usersRequest = useRequest(USERS_LIST_URL);
  const dispatchersRequest = useRequest(DISPATCHERS_LIST_URL);

  useEffect(() => {
    request.getData();
    usersRequest.getData();
    dispatchersRequest.getData();
  }, []);

  const [formOpen, setFormOpen] = useState(false);
  const [updatesOpen, setUpdatesOpen] = useState(false);
  const [edit, setEdit] = useState({});
  const [method, setMethod] = useState("POST");

  const closeForm = ({ reload }) => {
    setFormOpen(false);
    if (reload) {
      request.getData();
      usersRequest.getData();
      dispatchersRequest.getData();
    }
  };
  const closeUpdates = () => {
    setUpdatesOpen(false);
  };
  const handleEdit = (driver) => {
    setEdit(driver);
    setMethod("PUT");
    setUpdatesOpen(false);
    setFormOpen(true);
  };
  const handleUpdates = (driver) => {
    setEdit(driver);
    setFormOpen(false);
    setUpdatesOpen(true);
  };

  return (
    <div className="page-container">
      <div className="row">
        <h1>Drivers</h1>
        <button
          className="button"
          onClick={() => {
            setMethod("POST");
            setUpdatesOpen(false);
            setFormOpen(true);
          }}
        >
          New Driver
        </button>
      </div>
      {request.isLoading ? (
        <Loading />
      ) : (
        <DriversTable
          drivers={request.data}
          dispatchers={dispatchersRequest.data}
          handleEdit={handleEdit}
          handleUpdates={handleUpdates}
        />
      )}
      <AnimatePresence initial={false}>
        {formOpen && (
          <DriversForm
            closeForm={closeForm}
            dispatchers={dispatchersRequest.data}
            method={method}
            edit={edit}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {updatesOpen && (
          <DriverUpdates
            dispatchers={dispatchersRequest.data}
            users={usersRequest.data}
            closeUpdates={closeUpdates}
            edit={edit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Drivers;
