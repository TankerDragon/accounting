import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import incons
import { FaDollarSign } from "react-icons/fa";
import { FiClock, FiUser } from "react-icons/fi";
import { ImCross } from "react-icons/im";
// import styles
import { Style } from "../styles/Style.style";

function Dispatchers() {
  const navigate = useNavigate();

  const [dispatchers, setDispatchers] = useState([]);
  useEffect(() => {
    getDispatchers();
  }, []);

  const getDispatchers = async () => {
    const response = await fetch(`/api/dispatchers/`, {
      headers: {
        Authorization: "JWT " + JSON.parse(localStorage.getItem("authentication")).access,
      },
    });
    if (response.status === 401) {
      navigate("/login");
    }
    const data = await response.json();
    console.log(data);
    setDispatchers(data);
  };

  return (
    <Style.Container>
      <Style.Row>
        <h1>Dispatchers</h1>
        <Style.SButton to={"/new-dispatcher"}>Add Dispatcher</Style.SButton>
      </Style.Row>
      <Style.Table>
        <thead>
          <tr>
            <th>№</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Username</th>
            <th>Last login</th>
            <th>Date joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dispatchers.map((dispatcher, index) => {
            return (
              <tr key={dispatcher.id}>
                <td>{index + 1}</td>
                <td>{dispatcher.first_name}</td>
                <td>{dispatcher.last_name}</td>
                <td>{dispatcher.username}</td>
                <td>{dispatcher.last_login}</td>
                <td>{dispatcher.date_joined}</td>
                <td>
                  <div className="actions" style={{ width: 80 }}>
                    <div className="icon-holder">
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
    </Style.Container>
  );
}

export default Dispatchers;
