import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import styles
import { Style } from "../styles/Style.style";


function NewDriver() {
  const navigate = useNavigate();

  const [driverSelections, setDriverSelections] = useState([]);
  const [vehicleSelections, setVehicleSelections] = useState([]);
  useEffect(() => {
    getSelections();
  }, []);

  const getSelections = async () => {
    const response = await fetch(`/api/new-driver/`);
    const data = await response.json();
    console.log(data);
    setDriverSelections(data.drivers);
    setVehicleSelections(data.vehicles)
  };

  const [driver, setDriver] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    profile: {
      cdl_number: "",
      cdl_state: "AK",
      vehicle: null,
      co_driver: null,
      phone: "",
      address: "",
      notes: "",
    },
  });

  const updateData = (obj, value, is_profile) => {
    if (is_profile) {
      let profile = driver["profile"];
      profile[obj] = value;
      setDriver({ ...driver, ["profile"]: profile });
    } else {
      setDriver({ ...driver, [obj]: value });
    }
  };

  const postNewDriver = async () => {
    const response = await fetch(`/api/new-driver/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(driver),
    });
    const data = await response.json();
    console.log("data*", data);

    if (response.status === 200) {
      navigate("/drivers");
    } else {
      window.alert(response.statusText);
    }

    // setDrivers(data);
  };

  const redirectBack = () => {
    navigate("/drivers");
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
          <label>Username*</label>
          <input onChange={(e) => updateData("username", e.target.value, false)} type="text" value={driver.username} />
        </Style.InputField>
        <Style.InputField>
          <label>Email*</label>
          <input onChange={(e) => updateData("email", e.target.value, false)} type="text" value={driver.email} />
        </Style.InputField>
      </Style.Row>
      <Style.Row>
        <Style.InputField>
          <label>Password*</label>
          <input onChange={(e) => updateData("password", e.target.value, false)} type="password" value={driver.password} />
        </Style.InputField>
        <Style.InputField>
          <label>Vehicle</label>
          <select name="vehicles" id="vehicles" onChange={(e) => e.target.value === "0" ? updateData("vehicle", null, true) : updateData("vehicle", parseInt(e.target.value), true)}>
            <option value="0">------</option>
            {vehicleSelections.map((vehicle) => {
              return (
                <option key={vehicle.id} value={vehicle.id}>{vehicle.unit_number}</option>
              )
            })}
          </select>
        </Style.InputField>
        <Style.InputField>
          <label>Driver's license No*</label>
          <input onChange={(e) => updateData("cdl_number", e.target.value, true)} type="text" value={driver.profile.cdl_number} />
        </Style.InputField>
        <Style.InputField>
          <label>Driver's License Issuing State*</label>
          <select name="states" id="select-states" onChange={(e) => updateData("cdl_state", e.target.value, true)} value={driver.profile.cdl_state}>
            <option value="AK">Alaska</option>
            <option value="AL">Alabama</option>
            <option value="AR">Arkansas</option>
            <option value="AZ">Arizona</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="IA">Iowa</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="MA">Massachusetts</option>
            <option value="MD">Maryland</option>
            <option value="ME">Maine</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MO">Missouri</option>
            <option value="MS">Mississippi</option>
            <option value="MT">Montana</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="NE">Nebraska</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NV">Nevada</option>
            <option value="NY">New York</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VA">Virginia</option>
            <option value="VT">Vermont</option>
            <option value="WA">Washington</option>
            <option value="WI">Wisconsin</option>
            <option value="WV">West Virginia</option>
            <option value="WY">Wyoming</option>
          </select>
        </Style.InputField>
      </Style.Row>
      <Style.Row>
        <Style.InputField>
          <label>Co-Driver</label>
          <select name="co-drivers" id="co-drivers" onChange={(e) => e.target.value === "0" ? updateData("co_driver", null, true) : updateData("co_driver", parseInt(e.target.value), true)}>
            <option value="0">------</option>
            {driverSelections.map((driver) => {
              return (
                <option key={driver.id} value={driver.id}>{driver.full_name}</option>
              )
            })}
          </select>
        </Style.InputField>
        <Style.InputField>
          <label>Home Terminal Address</label>
          <input onChange={(e) => updateData("address", e.target.value, true)} type="text" value={driver.profile.address} />
        </Style.InputField>
        <Style.InputField>
          <label>Phone number</label>
          <input onChange={(e) => updateData("phone", e.target.value, true)} type="text" value={driver.profile.phone} />
        </Style.InputField>

        <Style.InputField>
          <label>Notes</label>
          <input onChange={(e) => updateData("notes", e.target.value, true)} type="text" value={driver.profile.notes} />
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

export default NewDriver;
