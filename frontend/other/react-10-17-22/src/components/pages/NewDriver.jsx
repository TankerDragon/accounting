import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import styles
import { Style } from "../styles/Style.style";

function NewDriver() {
  const navigate = useNavigate();

  const [dispatcherSelections, setDispatcherSelections] = useState([]);
  useEffect(() => {
    getSelections();
  }, []);

  const getSelections = async () => {
    const response = await fetch(`/api/new-driver/`, {
      headers: {
        Authorization: "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
      },
    });
    if (response.status === 401) {
      navigate("/login");
    }
    if (response.status === 403) {
      navigate("/budget");
    }
    const data = await response.json();
    console.log(data);
    setDispatcherSelections(data);
  };

  const [driver, setDriver] = useState({
    first_name: "",
    last_name: "",
    driver_type: "R**",
    dispatcher: null,
    gross_target: "10000",
  });

  const updateData = (obj, value, is_profile) => {
    setDriver({ ...driver, [obj]: value });
  };

  const postNewDriver = async () => {
    const response = await fetch(`/api/new-driver/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
      },
      body: JSON.stringify(driver),
    });
    const data = await response.json();
    console.log("data*", data);

    if (response.status === 201) {
      navigate("/budget");
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      window.alert(response.statusText);
    }

    // setDrivers(data);
  };

  const redirectBack = () => {
    navigate("/budget");
  };

  const handleSubmit = () => {
    console.log(driver);
    postNewDriver();
  };

  return (
    <Style.Container>
      <Style.Row>
        <h1>New Driver</h1>
      </Style.Row>
      <Style.Row>
        <Style.InputField>
          <label>First name*</label>
          <input onChange={(e) => updateData("first_name", e.target.value, false)} type="text" value={driver.first_name} />
        </Style.InputField>
        <Style.InputField>
          <label>Last name*</label>
          <input onChange={(e) => updateData("last_name", e.target.value, false)} type="text" value={driver.last_name} />
        </Style.InputField>
        <Style.InputField>
          <label>Driver type*</label>
          <select name="states" id="select-type" onChange={(e) => updateData("driver_type", e.target.value, true)} value={driver.driver_type}>
            <option value="O88">Owner operator - 88%</option>
            <option value="O85">Owner operator - 85%</option>
            <option value="C35">Company driver - 35%</option>
            <option value="C30">Company driver - 30%</option>
            <option value="L**">Lease operator</option>
            <option value="R**">Rental operator</option>
          </select>
        </Style.InputField>
      </Style.Row>
      <Style.Row>
        <Style.InputField>
          <label>Dispatcher</label>
          <select name="dispatchers" id="dispatchers" onChange={(e) => (e.target.value === "0" ? updateData("dispatcher", null, true) : updateData("dispatcher", parseInt(e.target.value), true))}>
            <option value="0">------</option>
            {dispatcherSelections.map((dispatcher) => {
              return (
                <option key={dispatcher.id} value={dispatcher.id}>
                  {dispatcher.username}
                </option>
              );
            })}
          </select>
        </Style.InputField>
        <Style.InputField>
          <label>Gross target*</label>
          <input onChange={(e) => updateData("gross_target", e.target.value, true)} type="number" value={driver.gross_target} />
        </Style.InputField>
        <Style.InputField></Style.InputField>
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

export default NewDriver;
