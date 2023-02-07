import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import styles
import { Style } from "../styles/Style.style";

const EditDispatcher = () => {
  let params = useParams();

  const navigate = useNavigate();

  const [dispatcher, setDispatcher] = useState({
    username: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    getDispatcher();
  }, []);

  const getDispatcher = async () => {
    const response = await fetch(`/api/edit-dispatcher/` + params.id, {
      headers: {
        Authorization: "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
      },
    });
    const data = await response.json();
    if (response.status === 401) {
      navigate("/login");
    }
    console.log(data);
    setDispatcher(data);
  };

  const updateData = (obj, value) => {
    setDispatcher({ ...dispatcher, [obj]: value });
  };

  const redirectBack = () => {
    navigate("/dispatchers");
  };

  const patchDispatcher = async () => {
    const response = await fetch(`/api/edit-dispatcher/` + params.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
      },
      body: JSON.stringify(dispatcher),
    });
    if (response.status === 200) {
      navigate("/dispatchers");
    } else {
      const data = await response.json();
      console.log("data*", data);
      if (response.status === 400) {
        window.alert(response.statusText);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        window.alert(response.statusText);
      }
    }
  };

  const handleSubmit = () => {
    console.log(dispatcher);
    patchDispatcher();
  };

  return (
    <Style.Container>
      <Style.Row>
        <h1>Update dispatcher</h1>
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
      <Style.Buttons>
        <div>
          <button onClick={redirectBack}>Cancel</button>
          <button onClick={handleSubmit}>OK</button>
        </div>
      </Style.Buttons>
    </Style.Container>
  );
};

export default EditDispatcher;
