import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import incons
import { FaDollarSign } from "react-icons/fa";
import { FiClock, FiUser } from "react-icons/fi";
import { ImCross } from "react-icons/im";
// import styles
import { Style } from "../styles/Style.style";

function Budget() {
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    if (!localStorage.getItem("authentication")) {
      navigate("/login");
    }
    console.log("*/*/*/*/*/", JSON.parse(localStorage.getItem("authentication")).access);
    const response = await fetch(`/api/budget/`, {
      headers: {
        Authorization: "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
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
    note: "",
  });

  const cancelForm = () => {
    setFormOpen(false);
    setLog({
      driver: null,
      original_rate: null,
      current_rate: null,
      budget_type: "D",
      total_miles: null,
      bol_number: "",
      pcs_number: "",
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
        Authorization: "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
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
      x: "30vw",
      opacity: 0,
    },
    visible: {
      y: "10vh",
      x: "30vw",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      x: "30vw",
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
                <td>{driver.d_budget + driver.l_budget + driver.r_budget + driver.s_budget}</td>
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
      <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
        {formOpen && (
          <Style.BackDrop>
            <motion.div className="form" variants={dropIn} initial="hidden" animate="visible" exit="exit">
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

export default Budget;
