import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import styles
import { Style } from "../styles/Style.style";

function NewVehicle() {
  const [vehicle, setVehicle] = useState({
    unit_number: "",
    make: "",
    model: "",
    year: "23",
    license_number: "",
    license_state: "AK",
    fuel_type: "di",
    notes: "",
  });
  const navigate = useNavigate();

  const updateData = (obj, value) => {
    setVehicle({ ...vehicle, [obj]: value });
  };

  const postNewVehicle = async () => {
    const response = await fetch(`/api/new-vehicle/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicle),
    });
    const data = await response.json();
    console.log("data*", data);

    if (response.status === 200) {
      navigate("/vehicles");
    } else {
      window.alert(response.statusText);
    }

    // setDrivers(data);
  };

  const redirectBack = () => {
    navigate("/vehicles");
  };

  const handleSubmit = () => {
    console.log(vehicle);
    postNewVehicle();
  };
  return (
    <Style.Container>
      <Style.Row>
        <h1>New Vehicle</h1>
      </Style.Row>
      <Style.Row>
        <Style.InputField>
          <label>Unit number*</label>
          <input onChange={(e) => updateData("unit_number", e.target.value)} type="text" value={vehicle.unit_number} />
        </Style.InputField>
        <Style.InputField>
          <label>Make</label>
          <input onChange={(e) => updateData("make", e.target.value)} type="text" value={vehicle.make} />
        </Style.InputField>
        <Style.InputField>
          <label>Model</label>
          <input onChange={(e) => updateData("model", e.target.value)} type="text" value={vehicle.model} />
        </Style.InputField>
      </Style.Row>
      <Style.Row>
        <Style.InputField>
          <label>Year</label>
          <select name="years" id="select-year" onChange={(e) => updateData("year", e.target.value)} value={vehicle.year}>
            <option value="99">1999</option>
            <option value="00">2000</option>
            <option value="01">2001</option>
            <option value="02">2002</option>
            <option value="03">2003</option>
            <option value="04">2004</option>
            <option value="05">2005</option>
            <option value="06">2006</option>
            <option value="07">2007</option>
            <option value="08">2008</option>
            <option value="09">2009</option>
            <option value="10">2010</option>
            <option value="11">2011</option>
            <option value="12">2012</option>
            <option value="13">2013</option>
            <option value="14">2014</option>
            <option value="15">2015</option>
            <option value="16">2016</option>
            <option value="17">2017</option>
            <option value="18">2018</option>
            <option value="19">2019</option>
            <option value="20">2020</option>
            <option value="21">2021</option>
            <option value="22">2022</option>
            <option value="23">2023</option>
            <option value="24">2024</option>
          </select>
        </Style.InputField>
        <Style.InputField>
          <label>License Plate No</label>
          <input onChange={(e) => updateData("license_number", e.target.value)} type="text" value={vehicle.license_number} />
        </Style.InputField>
        <Style.InputField>
          <label>License Plate Issuing State</label>
          <select name="states" id="select-state" onChange={(e) => updateData("license_state", e.target.value)} value={vehicle.license_state}>
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
          <label>Fuel Type</label>
          <select name="fuel-type" id="fuel-type" onChange={(e) => updateData("fuel_type", e.target.value)} value={vehicle.fuel_type}>
            <option value="99">1999</option>
            <option value="di">Diesel</option>
            <option value="ga">Gasoline</option>
            <option value="pr">Propane</option>
            <option value="li">Liquid Natural Gas</option>
            <option value="co">Compressed Natural Gas</option>
            <option value="me">Methanol</option>
            <option value="e">E-85</option>
            <option value="m">M-85</option>
            <option value="a">A55</option>
            <option value="bi">Biodisel</option>
            <option value="o">Other</option>
          </select>
        </Style.InputField>
        <Style.InputField>
          <label>Notes</label>
          <input onChange={(e) => updateData("notes", e.target.value)} type="text" value={vehicle.notes} />
        </Style.InputField>
        <Style.InputField>
          <label>ELD device</label>
          <input type="text" />
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

export default NewVehicle;
