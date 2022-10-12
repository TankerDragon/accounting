import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
//
import useGetArchive from "./useGetArchive";
// import incons
import { BsPencil } from "react-icons/bs";
// import styles
import { Style } from "../../styles/Style.style";

const GrossBoard = () => {
  const [date, setDate] = useState("2022-09-22");
  //
  const { loading, error, archives } = useGetArchive(date);
  //
  const fixTime = (dateTime) => {
    const time = new Date(dateTime);
    console.log(typeof time.getTime);
    return time.toLocaleDateString() + " - " + time.toLocaleTimeString();
  };

  let params = useParams();
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = async () => {
    // const response = await fetch(`/api/archive/`, {
    //   headers: {
    //     Authorization:
    //       "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
    //   },
    //   body: JSON.stringify({
    //     dates: ["2022-22-09"],
    //   }),
    // });
    // if (response.status === 401) {
    //   navigate("/login");
    // }
    // const data = await response.json();
    // console.log("***data", data);
    // setLogs(data);
  };

  return (
    <Style.Container>
      <Style.Row>
        <h1>Driver archive</h1>
      </Style.Row>
      <div style={{ overflow: "auto", height: "80vh" }}>
        <Style.Table>
          <thead>
            <tr style={{ whiteSpace: "nowrap" }}>
              <th>№</th>
              <th>PCS number</th>
              <th>Load ID</th>
              <th>Date and Time</th>
              <th>Dispatcher</th>
              <th>Truck</th>
              <th>Trailer</th>
              <th>Original rate</th>
              <th>Current rate</th>
              <th>Change</th>
              <th>Mileage</th>
              <th>Status</th>
              <th>Budget type</th>
              <th>Autobooker</th>
              <th>Origin</th>
              <th></th>
              <th>Destination</th>
              <th></th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {archives.map((log, index) => {
              return (
                <tr key={log.id}>
                  <td>{index + 1}</td>
                  <td>{log.original_rate}</td>
                  <td>{log.current_rate}</td>
                  <td>{log.change}</td>
                  <td>{log.total_miles}</td>
                  <td>
                    {log.status === "CO"
                      ? "Covered"
                      : log.status === "SO"
                      ? "Sold"
                      : log.status === "TO"
                      ? "Tonu"
                      : log.status === "RJ"
                      ? "Rejected"
                      : log.status === "RM"
                      ? "Removed"
                      : "***error"}
                  </td>
                  <td>
                    {log.budget_type === "D"
                      ? "Driver's"
                      : log.budget_type === "L"
                      ? "Lane"
                      : log.budget_type === "R"
                      ? "Recovery"
                      : log.budget_type === "S"
                      ? "Dirilis"
                      : "***error"}
                  </td>
                  <td>{log.autobooker ? "yes" : ""}</td>
                  <td>{fixTime(log.date)}</td>
                  <td>{log.user}</td>
                  <td>{log.bol_number}</td>
                  <td>{log.pcs_number}</td>
                  <td>{log.truck}</td>
                  <td>{log.trailer}</td>
                  <td>{log.origin}</td>
                  <td>{log.origin_state}</td>
                  <td>{log.destination}</td>
                  <td>{log.destination_state}</td>
                  <td>{log.note}</td>
                  <td>
                    <div className="actions">
                      <div
                        className="icon-holder"
                        onClick={() => {
                          navigate("/edit-log/" + log.id);
                        }}
                      >
                        <BsPencil className="icon edit" />
                      </div>
                      {log.edited_link && (
                        <div className="msg">
                          <Link to={"/edit-archive/" + log.id}>edited</Link>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Style.Table>
      </div>
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

  // return (
  //   <>
  //     {archives.map((archive) => {
  //       return <div key={archive.id}>{archive.name}</div>;
  //     })}
  //   </>
  // );
};

export default GrossBoard;
