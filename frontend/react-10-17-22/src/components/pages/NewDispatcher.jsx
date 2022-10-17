import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import styles
import { Style } from "../styles/Style.style";

function NewDispatcher() {
  const navigate = useNavigate();

  const [dispatcher, setDispatcher] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const updateData = (obj, value, is_profile) => {
    setDispatcher({ ...dispatcher, [obj]: value });
  };

  const postNewDispatcher = async () => {
    const response = await fetch(`/api/new-dispatcher/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
      },
      body: JSON.stringify(dispatcher),
    });
    const data = await response.json();
    console.log("data*", data);

    if (response.status === 201) {
      navigate("/dispatchers");
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      window.alert(response.statusText);
    }

    // setDrivers(data);
  };

  const redirectBack = () => {
    navigate("/dispatchers");
  };

  const handleSubmit = () => {
    console.log(dispatcher);
    postNewDispatcher();
  };

  return (
    <Style.Container>
      <Style.Row>
        <h1>New Dispatcher</h1>
      </Style.Row>
      <Style.Row>
        <Style.InputField>
          <label>First name</label>
          <input onChange={(e) => updateData("first_name", e.target.value, false)} type="text" value={dispatcher.first_name} />
        </Style.InputField>
        <Style.InputField>
          <label>Last name</label>
          <input onChange={(e) => updateData("last_name", e.target.value, false)} type="text" value={dispatcher.last_name} />
        </Style.InputField>
        <Style.InputField>
          <label>username*</label>
          <input onChange={(e) => updateData("username", e.target.value, false)} type="text" value={dispatcher.username} />
        </Style.InputField>
      </Style.Row>
      <Style.Row>
        <Style.InputField>
          <label>Password*</label>
          <input onChange={(e) => updateData("password", e.target.value, false)} type="password" value={dispatcher.password} />
        </Style.InputField>
      </Style.Row>
      <Style.Buttons>
        <div>
          <button onClick={redirectBack}>Cancel</button>
          <button onClick={handleSubmit}>OK</button>
        </div>
      </Style.Buttons>
    </Style.Container>
  );
}

export default NewDispatcher;
