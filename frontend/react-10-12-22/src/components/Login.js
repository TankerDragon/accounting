import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import Input from "./common/Input";
import { Style } from "./styles/Style.style";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

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

  // const [user, setUser] = useState("");
  // const [pwd, setPwd] = useState("");
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
      console.log(JSON.stringify(login));
      const response = await axios.post(LOGIN_URL, JSON.stringify(login), {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true,
      });
      const accessToken = response?.data?.access;

      // decoding JWT payload
      var base64Url = accessToken.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      console.log(JSON.stringify(response?.data));
      console.log(JSON.parse(jsonPayload));
      ///////////

      const roles = [JSON.parse(jsonPayload).role];
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
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <Style.LoginContainer>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <Input name="username" type="text" value={login.username} label="Username" onChange={handleChange} error={errors.username} />
          <Input name="password" type="password" value={login.password} label="Password" onChange={handleChange} error={errors.password} />
          <Style.Buttons>
            <button>Log in</button>
          </Style.Buttons>
        </div>
      </form>
    </Style.LoginContainer>
  );
};

export default Login;
