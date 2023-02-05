import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import GrossTable from "./GrossTable";
import GrossForm from "./GrossForm";
import useRequest from "../../../hooks/useRequest";
import {
  GROSS_URL,
  DRIVERS_LIST_URL,
  DISPATCHERS_LIST_URL,
  CARRIERS_LIST_URL,
} from "../../../constants/constants";
import Loading from "../../common/Loading";

const GrossBoard = () => {
  const request = useRequest(GROSS_URL);
  const driversRequest = useRequest(DRIVERS_LIST_URL);
  const dispatchersRequest = useRequest(DISPATCHERS_LIST_URL);
  const carriersRequest = useRequest(CARRIERS_LIST_URL);

  useEffect(() => {
    request.getData();
    driversRequest.getData();
    dispatchersRequest.getData();
    carriersRequest.getData();
  }, []);

  const [formOpen, setFormOpen] = useState(false);
  const [edit, setEdit] = useState({});
  const [method, setMethod] = useState("POST");

  const closeForm = ({ reload }) => {
    setFormOpen(false);
    if (reload) {
      request.getData();
      driversRequest.getData();
      dispatchersRequest.getData();
      carriersRequest.getData();
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
        <h1>Gross board</h1>
        <button
          className="button"
          onClick={() => {
            setMethod("POST");
            setFormOpen(!formOpen);
          }}
        >
          New Gross
        </button>
      </div>
      {request.isLoading ? (
        <Loading />
      ) : (
        <GrossTable
          logs={request.data}
          drivers={driversRequest.data}
          dispatchers={dispatchersRequest.data}
          carriers={carriersRequest.data}
          handleEdit={handleEdit}
        />
      )}
      <AnimatePresence initial={false}>
        {formOpen && (
          <GrossForm
            drivers={driversRequest.data}
            dispatchers={dispatchersRequest.data}
            carriers={carriersRequest.data}
            closeForm={closeForm}
            method={method}
            edit={edit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GrossBoard;
