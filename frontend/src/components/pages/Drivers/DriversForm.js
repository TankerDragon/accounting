import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import Input from "../../common/Input";
import Select from "../../common/Select";
import Checkbox from "../../common/Checkbox";

const DRIVER_TYPE = {
  O88: "Owner operator - 88%",
  O85: "Owner operator - 85%",
  C30: "Company driver - 30%",
  C35: "Company driver - 35%",
  L: "Lease operator",
  R: "Rental operator",
};

const DRIVERS_URL = "/api/drivers/";

const DriversForm = ({ closeForm, dispatchers, method, edit }) => {
  const { auth } = useAuth();

  const [errors, setErrors] = useState({});

  const [errMsg, setErrMsg] = useState("");

  const [log, setLog] = useState(
    method === "PUT"
      ? edit
      : {
          first_name: "",
          last_name: "",
          dispatcher: "",
          driver_type: "L",
          gross_target: "",
        }
  );

  // preparing dispatchers selections for the form
  const DISPATCHERS = [];
  DISPATCHERS.push(["", "--------"]);
  for (let dispatcher of dispatchers) {
    DISPATCHERS.push([dispatcher.id, dispatcher.first_name + " " + dispatcher.last_name]);
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
    console.log("submitted", method);
    setErrMsg("");
    setErrors({});

    // post or put to server
    try {
      let response;
      if (method === "POST") {
        response = await axios.post(DRIVERS_URL, JSON.stringify(log), {
          headers: { "Content-Type": "application/json", Authorization: "JWT " + auth.accessToken },
          // withCredentials: true,
        });
      } else if (method === "PUT") {
        response = await axios.put(DRIVERS_URL, JSON.stringify(log), {
          headers: { "Content-Type": "application/json", Authorization: "JWT " + auth.accessToken },
          // withCredentials: true,
        });
      }

      console.log(response);
      if (response.status === 201 || response.status === 200) closeForm({ reload: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        if (err.response.data) {
          const newErrors = {};
          Object.keys(err.response.data).forEach((s) => {
            newErrors[s] = err.response.data[s];
          });
          setErrors(newErrors);
        } else {
          setErrMsg(err.message);
        }
      } else if (err.response.status === 401 || err.response.status === 403) {
        setErrMsg(err.response.data.detail);
      } else {
        setErrMsg(err.message);
      }
    }
  };

  return (
    <div className="form drivers-form">
      <div className="row">
        <h1>Add new driver</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Input name="first_name" type="text" value={log.first_name} label="First name" onChange={handleChange} error={errors.first_name} />
          <Input name="last_name" type="text" value={log.last_name} label="Last name" onChange={handleChange} error={errors.last_name} />
        </div>
        <div className="row">
          <Select name="dispatcher" selections={DISPATCHERS} isObject={false} value={log.dispatcher} label="Dispatcher" onChange={handleChange} error={errors.dispatcher} />
          <Select name="driver_type" selections={DRIVER_TYPE} isObject={true} value={log.driver_type} label="Driver type" onChange={handleChange} error={errors.driver_type} />
        </div>
        <div className="row">
          <Input name="gross_target" type="number" value={log.gross_target} label="Gross Target" onChange={handleChange} error={errors.gross_target} />
        </div>

        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <div className="buttons">
          <div>
            <button>OK</button>
            <button onClick={closeForm}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DriversForm;
