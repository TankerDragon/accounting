import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import Input from "../../common/Input";
import Select from "../../common/Select";

const USER_ROLES = {
  ADM: "Admin",
  DIS: "Dispatcher",
  UPD: "Updater",
};

const USERS_URL = "/api/users/";

const UsersForm = ({ closeForm }) => {
  const { auth } = useAuth();

  const [errors, setErrors] = useState({});

  const [errMsg, setErrMsg] = useState("");

  const [log, setLog] = useState({
    first_name: "",
    last_name: "",
    role: "DIS",
    username: "",
    password: "",
  });

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
    console.log("submitted");
    setErrMsg("");
    setErrors({});

    // post to server
    try {
      const response = await axios.post(USERS_URL, JSON.stringify(log), {
        headers: { "Content-Type": "application/json", Authorization: "JWT " + auth.accessToken },
        // withCredentials: true,
      });
      console.log(response);
      if (response.status === 201) closeForm({ reload: true });
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
        <h1>Add new user</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Input name="first_name" type="text" value={log.first_name} label="First name" onChange={handleChange} error={errors.first_name} />
          <Input name="last_name" type="text" value={log.last_name} label="Last name" onChange={handleChange} error={errors.last_name} />
        </div>
        <div className="row">
          <Input name="username" type="text" value={log.username} label="Username" onChange={handleChange} error={errors.username} />
          <Select name="role" selections={USER_ROLES} isObject={true} value={log.role} label="User role" onChange={handleChange} error={errors.role} />
        </div>
        <div className="row">
          <Input name="password" type="password" value={log.password} label="Password" onChange={handleChange} error={errors.password} />
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

export default UsersForm;
