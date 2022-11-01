import { useState, useEffect } from "react";
import { BUDGET_TYPE, GROSS_STATUS, STATES } from "../../../constants/constants";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import Input from "../../common/Input";
import Select from "../../common/Select";
import Checkbox from "../../common/Checkbox";

const GROSS_URL = "/api/gross/";

const GrossForm = ({ drivers, closeForm, dispatchers, method, edit }) => {
  const { auth } = useAuth();

  const [errors, setErrors] = useState({});

  const [errMsg, setErrMsg] = useState("");

  // preparing drivers selections for the form
  const DRIVERS = [];
  DRIVERS.push(["", "--------"]);
  for (let driver of drivers) {
    DRIVERS.push([driver.id, driver.first_name + " " + driver.last_name]);
  }
  // preparing dispatchers selections for the form
  const DISPATCHERS = [];
  DISPATCHERS.push(["", "--------"]);
  for (let dispatcher of dispatchers) {
    DISPATCHERS.push([dispatcher.id, dispatcher.first_name + " " + dispatcher.last_name]);
  }

  const [log, setLog] = useState(
    method === "PUT"
      ? edit
      : {
          driver: "",
          dispatcher: "",
          original_rate: "",
          current_rate: "",
          budget_type: "D",
          autobooker: false,
          total_miles: "",
          bol_number: "",
          carrier: "",
          pcs_number: "",
          trailer: "",
          truck: "",
          status: "CO",
          origin: "",
          origin_state: "OH",
          destination: "",
          destination_state: "OH",
          note: "",
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
    console.log(log.autobooker);
  };

  // const validate = () => {
  //   const result = Joi.validate(login, schema, { abortEarly: false });
  //   if (!result.error) return null;
  //   const errors = {};
  //   for (let item of result.error.details) errors[item.path[0]] = item.message;
  //   return errors;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate
    // const errors = validate();
    // setErrors(errors === null ? {} : errors);
    // console.log(errors);
    // if (errors) return;
    console.log("submitted");
    setErrMsg("");
    setErrors({});

    // post to server
    try {
      let response;
      if (method === "POST") {
        response = await axios.post(GROSS_URL, JSON.stringify(log), {
          headers: { "Content-Type": "application/json", Authorization: "JWT " + auth.accessToken },
          // withCredentials: true,
        });
      } else if (method === "PUT") {
        response = await axios.put(GROSS_URL, JSON.stringify(log), {
          headers: { "Content-Type": "application/json", Authorization: "JWT " + auth.accessToken },
          // withCredentials: true,
        });
      }
      console.log(response);
      if (response.status === 200) closeForm({ reload: true });
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
      } else if (err.response?.status === 401) {
        setErrMsg(err.response.data.detail);
      } else {
        setErrMsg(err.message);
      }
    }
  };

  return (
    <div className="form gross-form">
      <div className="row">
        <h1>Add new Gross</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Select name="driver" selections={DRIVERS} isObject={false} value={log.driver} label="Driver" onChange={handleChange} error={errors.driver} />
          <Select name="dispatcher" selections={DISPATCHERS} isObject={false} value={log.dispatcher} label="Dispatcher" onChange={handleChange} error={errors.dispatcher} />
          <Checkbox name="autobooker" checked={log.autobooker} label="Booked by Autobooker" onChange={handleChange} error={errors.autobooker} />
        </div>
        <div className="row">
          <Input name="original_rate" type="number" value={log.original_rate} label="Original rate*" onChange={handleChange} error={errors.original_rate} />
          <Input name="current_rate" type="number" value={log.current_rate} label="Current rate*" onChange={handleChange} error={errors.current_rate} />
          <Input name="change" type="number" value={log.original_rate - log.current_rate} label="Change" onChange={() => {}} />
        </div>
        <div className="row">
          <Input name="total_miles" type="number" value={log.total_miles} label="Total miles*" onChange={handleChange} error={errors.total_miles} />
          <Select name="budget_type" selections={BUDGET_TYPE} isObject={true} value={log.budget_type} label="Budget type*" onChange={handleChange} error={errors.budget_type} />
          <Input name="carrier" type="text" value={log.carrier} label="Carrier*" onChange={handleChange} error={errors.carrier} />
        </div>
        <div className="row">
          <Input name="bol_number" type="text" value={log.bol_number} label="BOL number" onChange={handleChange} error={errors.bol_number} />
          <Input name="pcs_number" type="text" value={log.pcs_number} label="PCS number*" onChange={handleChange} error={errors.pcs_number} />
          <Input name="note" type="text" value={log.note} label="Note" onChange={handleChange} error={errors.note} />
        </div>
        <div className="row">
          <Input name="truck" type="text" value={log.truck} label="Truck*" onChange={handleChange} error={errors.truck} />
          <Input name="trailer" type="text" value={log.trailer} label="Trailer*" onChange={handleChange} error={errors.trailer} />
          <Select name="status" selections={GROSS_STATUS} isObject={true} value={log.status} label="Status*" onChange={handleChange} error={errors.status} />
        </div>
        <div className="row">
          <Input name="origin" type="text" value={log.origin} label="Origin*" onChange={handleChange} error={errors.origin} />
          <Select name="origin_state" selections={STATES} isObject={true} value={log.origin_state} label="Origin State*" onChange={handleChange} error={errors.origin_state} />
          <Input name="destination" type="text" value={log.destination} label="Destination*" onChange={handleChange} error={errors.destination} />
          <Select name="destination_state" selections={STATES} isObject={true} value={log.destination_state} label="Destination State*" onChange={handleChange} error={errors.destination_state} />
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

export default GrossForm;
