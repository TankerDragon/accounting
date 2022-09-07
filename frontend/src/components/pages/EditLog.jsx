import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import styles
import { Style } from "../styles/Style.style";

function EditLog() {
  let params = useParams();

  const navigate = useNavigate();

  const [log, setLog] = useState({
    original_rate: null,
    current_rate: null,
    budget_type: "D",
    total_miles: null,
    autobooker: false,
    bol_number: "",
    pcs_number: "",
    note: "",
  });

  useEffect(() => {
    getLog();
  }, []);

  const getLog = async () => {
    const response = await fetch(`/api/edit-log/` + params.id, {
      headers: {
        Authorization: "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
      },
    });
    const data = await response.json();
    if (response.status === 401) {
      navigate("/login");
    }
    console.log(data);
    setLog(data);
  };

  const updateData = (obj, value) => {
    setLog({ ...log, [obj]: value });
  };

  const redirectBack = () => {
    navigate("/budget");
  };

  const patchLog = async () => {
    const response = await fetch(`/api/edit-log/` + params.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
      },
      body: JSON.stringify(log),
    });
    const data = await response.json();
    console.log("data*", data);

    if (response.status === 200) {
      navigate("/archive/" + log.driver);
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      window.alert(response.statusText);
    }

    // setDrivers(data);
  };

  const handleSubmit = () => {
    console.log(log);
    patchLog();
  };

  return (
    <Style.Container>
      <div style={{ maxWidth: "700px", margin: "auto", marginTop: "50px" }}>
        <Style.Row>
          <Style.InputField>
            <label>Original rate*</label>
            <input onChange={(e) => updateData("original_rate", e.target.value)} type="number" value={log.original_rate} />
          </Style.InputField>
          <Style.InputField>
            <label>Current rate*</label>
            <input onChange={(e) => updateData("current_rate", e.target.value)} type="number" value={log.current_rate} />
          </Style.InputField>
        </Style.Row>
        <Style.InputField style={{ width: "100%" }}>
          <label>Change</label>
          <input type="number" value={log.original_rate - log.current_rate} readOnly />
        </Style.InputField>
        <Style.Row>
          <Style.InputField>
            <label>Total miles*</label>
            <input onChange={(e) => updateData("total_miles", e.target.value)} type="number" value={log.total_miles} />
          </Style.InputField>
          <Style.InputField>
            <label>Budget type*</label>
            <select name="budget-type" onChange={(e) => updateData("budget_type", e.target.value)} type="number" value={log.budget_type}>
              <option value="D">Driver's budget</option>
              <option value="L">Lane budget</option>
              <option value="R">Recovery budget</option>
            </select>
          </Style.InputField>
        </Style.Row>
        <Style.Row>
          <Style.InputField>
            <Style.Row>
              <label>Booked by Autobooker</label>
              <input onChange={(e) => updateData("autobooker", e.target.checked)} type="checkbox" checked={log.autobooker} />
            </Style.Row>
          </Style.InputField>
        </Style.Row>
        <Style.Row>
          <Style.InputField>
            <label>BOL number</label>
            <input onChange={(e) => updateData("bol_number", e.target.value)} type="text" value={log.bol_number} />
          </Style.InputField>
          <Style.InputField>
            <label>PCS number*</label>
            <input onChange={(e) => updateData("pcs_number", e.target.value)} type="text" value={log.pcs_number} />
          </Style.InputField>
        </Style.Row>
        <Style.InputField style={{ width: "100%" }}>
          <label>Note</label>
          <input onChange={(e) => updateData("note", e.target.value)} type="text" value={log.note} />
        </Style.InputField>
        <Style.Buttons>
          <div>
            <button onClick={redirectBack}>Cancel</button>
            <button onClick={handleSubmit}>OK</button>
          </div>
        </Style.Buttons>
      </div>
    </Style.Container>
  );
}

export default EditLog;
