import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import incons
import { FaDollarSign } from "react-icons/fa";
import { FiClock, FiUser } from "react-icons/fi";
import { ImCross } from "react-icons/im";
// import styles
import { Style } from "../styles/Style.style";

function Drivers() {
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    if (!localStorage.getItem("authentication")) {
      navigate("/login");
    }
    console.log(
      "*/*/*/*/*/",
      JSON.parse(localStorage.getItem("authentication")).access
    );
    const response = await fetch(`/api/budget/`, {
      headers: {
        Authorization:
          "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
      },
    });
    if (response.status === 401) {
      navigate("/login");
    }
    const data = await response.json();
    console.log(data);
    setDrivers(data);
  };

  const [log, setLog] = useState({
    driver: null,
    original_rate: null,
    current_rate: null,
    budget_type: "D",
    autobooker: false,
    total_miles: null,
    bol_number: "",
    pcs_number: "",
    trailer: "",
    truck: "",
    status: "CO",
    origin: "",
    origin_state: "OH",
    destination: "",
    destination_state: "OH",
    note: "",
  });

  const cancelForm = () => {
    setFormOpen(false);
    setLog({
      driver: null,
      original_rate: null,
      current_rate: null,
      budget_type: "D",
      autobooker: false,
      total_miles: null,
      bol_number: "",
      pcs_number: "",
      trailer: "",
      truck: "",
      status: "CO",
      origin: "",
      origin_state: "OH",
      destination: "",
      destination_state: "OH",
      note: "",
    });
  };

  const updateData = (obj, value) => {
    setLog({ ...log, [obj]: value });
  };

  const [formOpen, setFormOpen] = useState(false);

  const postNewLog = async () => {
    const response = await fetch(`/api/budget/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
      },
      body: JSON.stringify(log),
    });
    if (response.status === 200) {
      cancelForm();
      getDrivers();
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

    // setDrivers(data);
  };

  const handleSubmit = () => {
    console.log(log);
    postNewLog();
  };

  // framer motion
  const dropIn = {
    hidden: {
      y: "-100vh",
      //
      left: "10%",
      opacity: 0,
    },
    visible: {
      y: "10vh",
      //
      left: "10%",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      //
      left: "10%",
      y: "-100vh",
      opacity: 0,
    },
  };

  return (
    <Style.Container>
      <Style.Row>
        <h1>Drivers</h1>
        <Style.SButton to={"/new-driver"}>Add Driver</Style.SButton>
      </Style.Row>
      <Style.Table>
        <thead>
          <tr>
            <th>№</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Driver type</th>
            <th>Driver's budget</th>
            <th>Lane budget</th>
            <th>Recovery budget</th>
            <th>Dirilis budget</th>
            <th>Total budget</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => {
            return (
              <tr key={driver.id}>
                <td>{index + 1}</td>
                <td>{driver.first_name}</td>
                <td>{driver.last_name}</td>
                <td>
                  {driver.driver_type === "O88"
                    ? "Owner operator - 88%"
                    : driver.driver_type === "O85"
                    ? "Owner operator - 85%"
                    : driver.driver_type === "C35"
                    ? "Company driver - 35%"
                    : driver.driver_type === "C30"
                    ? "Company driver - 30%"
                    : driver.driver_type === "L**"
                    ? "Lease operator"
                    : driver.driver_type === "R**"
                    ? "Rental operator"
                    : "***error"}
                </td>
                <td>{driver.d_budget}</td>
                <td>{driver.l_budget}</td>
                <td>{driver.r_budget}</td>
                <td>{driver.s_budget}</td>
                <td>
                  {driver.d_budget +
                    driver.l_budget +
                    driver.r_budget +
                    driver.s_budget}
                </td>
                <td>
                  <div className="actions">
                    <div
                      className="icon-holder"
                      onClick={() => {
                        setFormOpen(true);
                        updateData("driver", driver.id);
                      }}
                    >
                      <FaDollarSign className="icon dollar" />
                    </div>
                    <div
                      className="icon-holder"
                      onClick={() => {
                        navigate("/archive/" + driver.id);
                      }}
                    >
                      <FiClock className="icon clock" />
                    </div>
                    <div
                      className="icon-holder"
                      onClick={() => {
                        navigate("/edit-driver/" + driver.id);
                      }}
                    >
                      <FiUser className="icon profile" />
                    </div>
                    <div className="icon-holder">
                      <ImCross className="icon cross" />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Style.Table>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {formOpen && (
          <Style.BackDrop>
            <motion.div
              className="form"
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Style.Row>
                <Style.InputField>
                  <label>Original rate*</label>
                  <input
                    onChange={(e) =>
                      updateData("original_rate", parseFloat(e.target.value))
                    }
                    type="number"
                    value={log.original_rate}
                  />
                </Style.InputField>
                <Style.InputField>
                  <label>Current rate*</label>
                  <input
                    onChange={(e) =>
                      updateData("current_rate", parseFloat(e.target.value))
                    }
                    type="number"
                    value={log.current_rate}
                  />
                </Style.InputField>
                <Style.InputField>
                  <label>Change</label>
                  <input
                    type="number"
                    value={log.original_rate - log.current_rate}
                    readOnly
                  />
                </Style.InputField>
              </Style.Row>

              <Style.Row>
                <Style.InputField>
                  <label>Total miles*</label>
                  <input
                    onChange={(e) =>
                      updateData("total_miles", parseInt(e.target.value))
                    }
                    type="number"
                    value={log.total_miles}
                  />
                </Style.InputField>
                <Style.InputField>
                  <label>Budget type*</label>
                  <select
                    name="budget-type"
                    onChange={(e) => updateData("budget_type", e.target.value)}
                    value={log.budget_type}
                  >
                    <option value="D">Driver's budget</option>
                    <option value="L">Lane budget</option>
                    <option value="R">Recovery budget</option>
                  </select>
                </Style.InputField>
                <Style.InputField>
                  <Style.Row>
                    <label>Booked by Autobooker</label>
                    <input
                      onChange={(e) =>
                        updateData("autobooker", e.target.checked)
                      }
                      type="checkbox"
                      checked={log.autobooker}
                    />
                  </Style.Row>
                </Style.InputField>
              </Style.Row>
              <Style.Row>
                <Style.InputField>
                  <label>BOL number</label>
                  <input
                    onChange={(e) => updateData("bol_number", e.target.value)}
                    type="text"
                    value={log.bol_number}
                  />
                </Style.InputField>
                <Style.InputField>
                  <label>PCS number*</label>
                  <input
                    onChange={(e) => updateData("pcs_number", e.target.value)}
                    type="text"
                    value={log.pcs_number}
                  />
                </Style.InputField>
                <Style.InputField>
                  <label>Note</label>
                  <input
                    onChange={(e) => updateData("note", e.target.value)}
                    type="text"
                    value={log.note}
                  />
                </Style.InputField>
              </Style.Row>
              <Style.Row>
                <Style.InputField>
                  <label>Truck*</label>
                  <input
                    onChange={(e) => updateData("truck", e.target.value)}
                    type="text"
                    value={log.truck}
                  />
                </Style.InputField>
                <Style.InputField>
                  <label>Trailer*</label>
                  <input
                    onChange={(e) => updateData("trailer", e.target.value)}
                    type="text"
                    value={log.trailer}
                  />
                </Style.InputField>

                <Style.InputField>
                  <label>Status*</label>
                  <select
                    name="budget-type"
                    onChange={(e) => updateData("status", e.target.value)}
                    value={log.status}
                  >
                    <option value="CO">Covered</option>
                    <option value="SO">Sold</option>
                    <option value="TO">Tonu</option>
                    <option value="RJ">Rejected</option>
                    <option value="RM">Removed</option>
                  </select>
                </Style.InputField>
              </Style.Row>
              <Style.Row>
                <Style.InputField>
                  <label>Origin*</label>
                  <input
                    onChange={(e) => updateData("origin", e.target.value)}
                    type="text"
                    value={log.origin}
                  />
                </Style.InputField>
                <Style.InputField style={{ width: "200px" }}>
                  <label>Origin State*</label>
                  <select
                    name="budget-type"
                    onChange={(e) => updateData("origin_state", e.target.value)}
                    value={log.origin_state}
                  >
                    <option value="AK">Alaska</option>
                    <option value="AL">Alabama</option>
                    <option value="AR">Arkansas</option>
                    <option value="AS">American Samoa</option>
                    <option value="AZ">Arizona</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DC">District of Columbia</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="GU">Guam</option>
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
                    <option value="PR">Puerto Rico</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VA">Virginia</option>
                    <option value="VI">Virgin Islands</option>
                    <option value="VT">Vermont</option>
                    <option value="WA">Washington</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WV">West Virginia</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </Style.InputField>
                <Style.InputField>
                  <label>Destination*</label>
                  <input
                    onChange={(e) => updateData("destination", e.target.value)}
                    type="text"
                    value={log.destination}
                  />
                </Style.InputField>
                <Style.InputField style={{ width: "200px" }}>
                  <label>Destination State*</label>
                  <select
                    name="budget-type"
                    onChange={(e) =>
                      updateData("destination_state", e.target.value)
                    }
                    value={log.destination_state}
                  >
                    <option value="AK">Alaska</option>
                    <option value="AL">Alabama</option>
                    <option value="AR">Arkansas</option>
                    <option value="AS">American Samoa</option>
                    <option value="AZ">Arizona</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DC">District of Columbia</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="GU">Guam</option>
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
                    <option value="PR">Puerto Rico</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VA">Virginia</option>
                    <option value="VI">Virgin Islands</option>
                    <option value="VT">Vermont</option>
                    <option value="WA">Washington</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WV">West Virginia</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </Style.InputField>
              </Style.Row>

              <Style.Buttons>
                <div>
                  <button onClick={cancelForm}>Cancel</button>
                  <button onClick={handleSubmit}>OK</button>
                </div>
              </Style.Buttons>
            </motion.div>
          </Style.BackDrop>
        )}
      </AnimatePresence>
    </Style.Container>
  );
}

export default Drivers;
