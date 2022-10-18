import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import styles
import { Style } from "../styles/Style.style";

const EditDriver = () => {
  let params = useParams();

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

  useEffect(() => {
    getDriver();
  }, []);

  const getDriver = async () => {
    const response = await fetch(`/api/edit-driver/` + params.id, {
      headers: {
        Authorization: "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
      },
    });
    const data = await response.json();
    if (response.status === 401) {
      navigate("/login");
    }
    console.log(data);
    setDriver(data);
  };

  const updateData = (obj, value) => {
    setDriver({ ...driver, [obj]: value });
  };

  const redirectBack = () => {
    navigate("/budget");
  };

  const patchDriver = async () => {
    const response = await fetch(`/api/edit-driver/` + params.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
      },
      body: JSON.stringify(driver),
    });
    if (response.status === 200) {
      navigate("/budget");
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
    console.log(driver);
    patchDriver();
  };

  return (
    <Style.Container>
      <Style.Row>
        <h1>Update Driver</h1>
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
          <select
            name="dispatchers"
            id="dispatchers"
            onChange={(e) => (e.target.value === "0" ? updateData("dispatcher", null, true) : updateData("dispatcher", parseInt(e.target.value), true))}
            value={driver.dispatcher}
          >
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
};

export default EditDriver;
