import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import incons
import { FiClock, FiUser } from "react-icons/fi";
import { ImCross } from "react-icons/im";

const Users = () => {
  const navigate = useNavigate();

  const fixTime = (dateTime) => {
    const time = new Date(dateTime);
    console.log(typeof time.getTime);
    return time.toLocaleDateString() + " - " + time.toLocaleTimeString();
  };

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
    if (response.status === 403) {
      navigate("/budget");
    }
    const data = await response.json();
    console.log(data);
    setDispatchers(data);
  };

  return (
    <div className="page-container">
      <div className="row">
        <h1>Dispatchers</h1>
        <button className="button">Add Dispatcher</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>№</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Username</th>
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
                <td>{fixTime(dispatcher.date_joined)}</td>
                <td>
                  <div className="actions" style={{ width: 80 }}>
                    <div
                      className="icon-holder"
                      onClick={() => {
                        navigate("/edit-dispatcher/" + dispatcher.id);
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
      </table>
    </div>
  );
};

export default Users;
