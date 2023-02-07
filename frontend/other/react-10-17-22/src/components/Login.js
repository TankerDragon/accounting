import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import Input from "./common/Input";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import JWTDecoder from "../functions/JWTDecoder";

const LOGIN_URL = "/api/token/";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  // joi
  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [errMsg, setErrMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    const newLogin = { ...login };
    newLogin[input.name] = input.value;
    setLogin(newLogin);
  };

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  useEffect(() => {
    setErrMsg("");
  }, [login]);

  const validate = () => {
    const result = Joi.validate(login, schema, { abortEarly: false });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate
    const errors = validate();
    setErrors(errors === null ? {} : errors);
    console.log(errors);
    if (errors) return;
    console.log("submitted");

    // post to server
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(login), {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true,
      });

      const accessToken = response?.data?.access;
      const payload = JWTDecoder(accessToken);
      const roles = [payload.role];
      setAuth({ ...login, roles, accessToken });
      setLogin({
        username: "",
        password: "",
      });
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg(err.response.data.detail);
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <Input name="username" type="text" value={login.username} label="Username" onChange={handleChange} error={errors.username} />
        <Input name="password" type="password" value={login.password} label="Password" onChange={handleChange} error={errors.password} />
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <div className="buttons">
          <button>Log in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
