import { useState, useEffect } from "react";
import { DRIVERS_URL, DRIVER_TYPE } from "../../../constants/constants";
import useRequest from "../../../hooks/useRequest";
import Form from "../../common/Form";
import Input from "../../common/Input";
import Select from "../../common/Select";
import LoadingButton from "../../common/LoadingButton";

const DriversForm = ({ closeForm, dispatchers, method, edit }) => {
  const { errors, postPutData, isLoading } = useRequest(DRIVERS_URL);

  const [errMsg, setErrMsg] = useState("");

  const [log, setLog] = useState(
    method === "PUT"
      ? {
          ...edit,
        }
      : {
          first_name: "",
          last_name: "",
          dispatcher: "",
          driver_type: "L",
          gross_target: 10000,
        }
  );

  // preparing dispatchers selections for the form
  const DISPATCHERS = [];
  DISPATCHERS.push(["", "--------"]);
  for (let dispatcher of dispatchers) {
    DISPATCHERS.push([
      dispatcher.id,
      dispatcher.first_name + " " + dispatcher.last_name,
    ]);
  }

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
        <h1>Add new driver</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Input
            name="first_name"
            type="text"
            value={log.first_name}
            label="First name"
            onChange={handleChange}
            error={errors.first_name}
          />
          <Input
            name="last_name"
            type="text"
            value={log.last_name}
            label="Last name"
            onChange={handleChange}
            error={errors.last_name}
          />
        </div>
        <div className="row">
          <Select
            name="dispatcher"
            selections={DISPATCHERS}
            isObject={false}
            value={log.dispatcher}
            label="Dispatcher"
            onChange={handleChange}
            error={errors.dispatcher}
          />
          <Select
            name="driver_type"
            selections={DRIVER_TYPE}
            isObject={true}
            value={log.driver_type}
            label="Driver type"
            onChange={handleChange}
            error={errors.driver_type}
          />
        </div>
        <div className="row">
          <Input
            name="gross_target"
            type="number"
            value={log.gross_target}
            label="Gross Target"
            onChange={handleChange}
            error={errors.gross_target}
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

export default DriversForm;
