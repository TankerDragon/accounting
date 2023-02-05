import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import useRequest from "../../../hooks/useRequest";
import DriversTable from "./DriversTable";
import DriversForm from "./DriversForm";
import Loading from "../../common/Loading";
import { DRIVERS_URL } from "../../../constants/constants";

const Drivers = () => {
  const request = useRequest(DRIVERS_URL);

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

  const handleEdit = (driver) => {
    setEdit(driver);
    setMethod("PUT");
    setFormOpen(true);
  };

  return (
    <div className="page-container">
      <div className="row">
        <h1>Drivers</h1>
        <button
          className="button"
          onClick={() => {
            setMethod("POST");
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
          drivers={request.data || []}
          dispatchers={request.data.dispatchers || []}
          handleEdit={handleEdit}
        />
      )}
      <AnimatePresence initial={false}>
        {formOpen && (
          <DriversForm
            closeForm={closeForm}
            dispatchers={request.data.dispatchers || []}
            method={method}
            edit={edit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Drivers;
