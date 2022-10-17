import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import Input from "../../common/Input";
import Select from "../../common/Select";
import Checkbox from "../../common/Checkbox";

const GROSS_URL = "/api/gross/";

const BUDGET_TYPE = {
  D: "Driver's budget",
  L: "Lane budget",
  R: "Recovery budget",
};

const GROSS_STATUS = {
  CO: "Covered",
  SO: "Sold",
  TO: "Tonu",
  RJ: "Rejected",
  RM: "Removed",
};

const STATES = {
  AK: "Alaska",
  AL: "Alabama",
  AR: "Arkansas",
  AS: "American Samoa",
  AZ: "Arizona",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  IA: "Iowa",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  MA: "Massachusetts",
  MD: "Maryland",
  ME: "Maine",
  MI: "Michigan",
  MN: "Minnesota",
  MO: "Missouri",
  MS: "Mississippi",
  MT: "Montana",
  NC: "North Carolina",
  ND: "North Dakota",
  NE: "Nebraska",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NV: "Nevada",
  NY: "New York",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VA: "Virginia",
  VI: "Virgin Islands",
  VT: "Vermont",
  WA: "Washington",
  WI: "Wisconsin",
  WV: "West Virginia",
  WY: "Wyoming",
};

const GrossForm = () => {
  const { auth } = useAuth();

  const [errors, setErrors] = useState({});

  const [errMsg, setErrMsg] = useState("");

  // const schema = {
  //   // driver: Joi.string().required().label("Driver"),
  //   original_rate: Joi.string().required().label("Driver"),
  //   current_rate: Joi.string().required().label("Driver"),
  //   budget_type: Joi.string().required().label("Driver"),
  //   total_miles: "",
  //   bol_number: "",
  //   pcs_number: "",
  //   trailer: "",
  //   truck: "",
  //   status: "CO",
  //   origin: "",
  //   origin_state: "OH",
  //   destination: "",
  //   destination_state: "OH",
  //   note: "",
  // };

  const [log, setLog] = useState({
    driver: "",
    original_rate: "",
    current_rate: "",
    budget_type: "D",
    autobooker: false,
    total_miles: "",
    bol_number: "",
    pcs_number: "",
    trailer: "",
    truck: "",
    status: "CO",
    origin: "",
    origin_state: "OH",
    destination: "",
    destination_state: "OH",
    note: "",
  });

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

  const navigate = useNavigate();

  const redirectBack = () => {
    navigate("/budget");
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

    // post to server
    try {
      const response = await axios.post(GROSS_URL, JSON.stringify(log), {
        headers: { "Content-Type": "application/json", Authorization: "JWT " + auth.accessToken },
        // withCredentials: true,
      });
      console.log(response);
    } catch (err) {
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
    <div className="gross-form">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Input name="original_rate" type="number" value={log.original_rate} label="Original rate*" onChange={handleChange} error={errors.original_rate} />
          <Input name="current_rate" type="number" value={log.current_rate} label="Current rate*" onChange={handleChange} error={errors.current_rate} />
          <Input name="change" type="number" value={log.original_rate - log.current_rate} label="Change" />
        </div>
        <div className="row">
          <Input name="total_miles" type="number" value={log.total_miles} label="Total miles*" onChange={handleChange} error={errors.total_miles} />
          <Select name="budget_type" selections={BUDGET_TYPE} value={log.budget_type} label="Budget type*" onChange={handleChange} error={errors.budget_type} />
          <Checkbox name="autobooker" checked={log.autobooker} label="Booked by Autobooker" onChange={handleChange} error={errors.autobooker} />
        </div>
        <div className="row">
          <Input name="bol_number" type="text" value={log.bol_number} label="BOL number" onChange={handleChange} error={errors.bol_number} />
          <Input name="pcs_number" type="text" value={log.pcs_number} label="PCS number*" onChange={handleChange} error={errors.pcs_number} />
          <Input name="note" type="text" value={log.note} label="Note" onChange={handleChange} error={errors.note} />
        </div>
        <div className="row">
          <Input name="truck" type="text" value={log.truck} label="Truck*" onChange={handleChange} error={errors.truck} />
          <Input name="trailer" type="text" value={log.trailer} label="Trailer*" onChange={handleChange} error={errors.trailer} />
          <Select name="status" selections={GROSS_STATUS} value={log.status} label="Status*" onChange={handleChange} error={errors.status} />
        </div>
        <div className="row">
          <Input name="origin" type="text" value={log.origin} label="Origin*" onChange={handleChange} error={errors.origin} />
          <Select name="origin_state" selections={STATES} value={log.origin_state} label="Origin State*" onChange={handleChange} error={errors.origin_state} />
          <Input name="destination" type="text" value={log.destination} label="Destination*" onChange={handleChange} error={errors.destination} />
          <Select name="destination_state" selections={STATES} value={log.destination_state} label="Destination State*" onChange={handleChange} error={errors.destination_state} />
        </div>
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <div className="buttons">
          <div>
            <button onClick={redirectBack}>Cancel</button>
            <button>OK</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GrossForm;
