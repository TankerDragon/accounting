import { useState, useEffect } from "react";
import { CARRIERS_URL } from "../../../constants/constants";
import useRequest from "../../../hooks/useRequest";
import Form from "../../common/Form";
import Input from "../../common/Input";
import Select from "../../common/Select";
import LoadingButton from "../../common/LoadingButton";

const CarriersForm = ({ closeForm, method, edit }) => {
  const { errors, postPutData, isLoading } = useRequest(CARRIERS_URL);

  const [errMsg, setErrMsg] = useState("");

  const [log, setLog] = useState(
    method === "PUT"
      ? {
          ...edit,
        }
      : {
          name: "",
          address: "",
          phone: "+",
          notes: "",
        }
  );

  const handleChange = ({ currentTarget: input }) => {
    const newLog = { ...log };
    if (input.type == "checkbox") {
      newLog[input.name] = !newLog[input.name];
    } else {
      newLog[input.name] = input.value;
    }
    setLog(newLog);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate
    // const errors = validate();
    // setErrors(errors === null ? {} : errors);
    // console.log(errors);
    // if (errors) return;
    setErrMsg("");

    // post or put to server
    console.log("submitted", method);
    console.log(log);
    postPutData(method, log, closeForm);
  };
  const handelCancel = (e) => {
    e.preventDefault();
    closeForm({ reload: false });
  };

  return (
    <Form>
      <div className="row">
        <h1>Add new carrier</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Input
            name="name"
            type="text"
            value={log.name}
            label="Carrier name"
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            name="address"
            type="text"
            value={log.address}
            label="Address"
            onChange={handleChange}
            error={errors.address}
          />
        </div>
        <div className="row">
          <Input
            name="phone"
            type="text"
            value={log.phone}
            label="Phone number"
            onChange={handleChange}
            error={errors.phone}
          />
          <Input
            name="notes"
            type="text"
            value={log.notes}
            label="Notes"
            onChange={handleChange}
            error={errors.notes}
          />
        </div>

        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <div className="buttons">
          <div>
            {isLoading ? <LoadingButton /> : <button>OK</button>}
            <button onClick={handelCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CarriersForm;
