import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Style } from "../styles/Style.style";

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const updateData = (obj, value) => {
    setLogin({ ...login, [obj]: value });
  };

  const postLogin = async () => {
    const response = await fetch(`/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });
    const data = await response.json();
    console.log("data*", data);

    if (response.status === 200) {
      localStorage.setItem("authentication", JSON.stringify(data));
      navigate("/budget");
    } else {
      window.alert(response.statusText);
    }
  };

  const handleSubmit = () => {
    console.log(login);
    postLogin();
  };

  return (
    <Style.LoginContainer>
      <div className="container">
        <Style.InputField>
          <label>Username</label>
          <input onChange={(e) => updateData("username", e.target.value)} type="text" value={login.username} />
        </Style.InputField>
        <Style.InputField>
          <label>Password</label>
          <input onChange={(e) => updateData("password", e.target.value)} type="password" value={login.password} />
        </Style.InputField>
        <Style.Buttons>
          <button onClick={handleSubmit}>Log in</button>
        </Style.Buttons>
      </div>
    </Style.LoginContainer>
  );
}

export default Login;
