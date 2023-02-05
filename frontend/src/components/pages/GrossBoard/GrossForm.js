import { useState, useEffect } from "react";
import useRequest from "../../../hooks/useRequest";
import LoadingButton from "../../common/LoadingButton";
import {
  GROSS_URL,
  BUDGET_TYPE,
  GROSS_STATUS,
  STATES,
} from "../../../constants/constants";
import Form from "../../common/Form";
import Input from "../../common/Input";
import Select from "../../common/Select";
import Checkbox from "../../common/Checkbox";

const GrossForm = ({
  drivers,
  dispatchers,
  carriers,
  closeForm,
  method,
  edit,
}) => {
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
    DISPATCHERS.push([
      dispatcher.id,
      // dispatcher.first_name + " " + dispatcher.last_name,
      dispatcher.username,
    ]);
  }
  // preparing carriers selections for the form
  const CARRIERS = [];
  CARRIERS.push(["", "--------"]);
  for (let carrier of carriers) {
    CARRIERS.push([
      carrier.id,
      // carrier.first_name + " " + carrier.last_name,
      carrier.name,
    ]);
  }

  const { errors, postPutData, isLoading } = useRequest(GROSS_URL);
  const [errMsg, setErrMsg] = useState("");
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
        <h1>Add new Gross</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Select
            name="driver"
            selections={DRIVERS}
            isObject={false}
            value={log.driver}
            label="Driver"
            onChange={handleChange}
            error={errors.driver}
          />
          <Select
            name="dispatcher"
            selections={DISPATCHERS}
            isObject={false}
            value={log.dispatcher}
            label="Dispatcher"
            onChange={handleChange}
            error={errors.dispatcher}
          />
          <Checkbox
            name="autobooker"
            checked={log.autobooker}
            label="Booked by Autobooker"
            onChange={handleChange}
            error={errors.autobooker}
          />
        </div>
        <div className="row">
          <Input
            name="original_rate"
            type="number"
            value={log.original_rate}
            label="Original rate*"
            onChange={handleChange}
            error={errors.original_rate}
          />
          <Input
            name="current_rate"
            type="number"
            value={log.current_rate}
            label="Current rate*"
            onChange={handleChange}
            error={errors.current_rate}
          />
          <Input
            name="change"
            type="number"
            value={log.original_rate - log.current_rate}
            label="Change"
            onChange={() => {}}
          />
        </div>
        <div className="row">
          <Input
            name="total_miles"
            type="number"
            value={log.total_miles}
            label="Total miles*"
            onChange={handleChange}
            error={errors.total_miles}
          />
          <Select
            name="budget_type"
            selections={BUDGET_TYPE}
            isObject={true}
            value={log.budget_type}
            label="Budget type*"
            onChange={handleChange}
            error={errors.budget_type}
          />
          <Select
            name="carrier"
            selections={CARRIERS}
            isObject={false}
            value={log.carrier}
            label="Carrier*"
            onChange={handleChange}
            error={errors.carrier}
          />
        </div>
        <div className="row">
          <Input
            name="bol_number"
            type="text"
            value={log.bol_number}
            label="BOL number"
            onChange={handleChange}
            error={errors.bol_number}
          />
          <Input
            name="pcs_number"
            type="text"
            value={log.pcs_number}
            label="PCS number*"
            onChange={handleChange}
            error={errors.pcs_number}
          />
          <Input
            name="note"
            type="text"
            value={log.note}
            label="Note"
            onChange={handleChange}
            error={errors.note}
          />
        </div>
        <div className="row">
          <Input
            name="truck"
            type="text"
            value={log.truck}
            label="Truck*"
            onChange={handleChange}
            error={errors.truck}
          />
          <Input
            name="trailer"
            type="text"
            value={log.trailer}
            label="Trailer*"
            onChange={handleChange}
            error={errors.trailer}
          />
          <Select
            name="status"
            selections={GROSS_STATUS}
            isObject={true}
            value={log.status}
            label="Status*"
            onChange={handleChange}
            error={errors.status}
          />
        </div>
        <div className="row">
          <Input
            name="origin"
            type="text"
            value={log.origin}
            label="Origin*"
            onChange={handleChange}
            error={errors.origin}
          />
          <Select
            name="origin_state"
            selections={STATES}
            isObject={true}
            value={log.origin_state}
            label="Origin State*"
            onChange={handleChange}
            error={errors.origin_state}
          />
        </div>
        <div className="row">
          <Input
            name="destination"
            type="text"
            value={log.destination}
            label="Destination*"
            onChange={handleChange}
            error={errors.destination}
          />
          <Select
            name="destination_state"
            selections={STATES}
            isObject={true}
            value={log.destination_state}
            label="Destination State*"
            onChange={handleChange}
            error={errors.destination_state}
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

export default GrossForm;
