import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import useRequest from "../../../hooks/useRequest";
import CarriersTable from "./CarriersTable";
import CarriersForm from "./CarriersForm";
import Loading from "../../common/Loading";
import { CARRIERS_URL } from "../../../constants/constants";

import React from "react";

const Carriers = () => {
  const request = useRequest(CARRIERS_URL);

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

  const handleEdit = (carrier) => {
    setEdit(carrier);
    setMethod("PUT");
    setFormOpen(true);
  };

  return (
    <div className="page-container">
      <div className="row">
        <h1>Carriers</h1>
        <button
          className="button"
          onClick={() => {
            setMethod("POST");
            setFormOpen(true);
          }}
        >
          New Carrier
        </button>
      </div>
      {request.isLoading ? (
        <Loading />
      ) : (
        <CarriersTable carriers={request.data} handleEdit={handleEdit} />
      )}
      <AnimatePresence initial={false}>
        {formOpen && (
          <CarriersForm closeForm={closeForm} method={method} edit={edit} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Carriers;
