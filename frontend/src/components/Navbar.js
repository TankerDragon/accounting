import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";
// importing icons
import { FiUserPlus, FiLogOut, FiUsers } from "react-icons/fi";
import { RiExchangeDollarLine, RiLineChartLine, RiAdminLine } from "react-icons/ri";
import { HiOutlineKey } from "react-icons/hi";
import { BsArchive } from "react-icons/bs";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} alt="logo" width={150} />
      </div>
      <h3>Main</h3>
      <ul>
        <li>
          <NavLink className="link" to={"/gross-board"}>
            <RiExchangeDollarLine />
            Gross board
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={"/driver-gross"}>
            <RiLineChartLine />
            Drivers' gross
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={"/dispatcher-gross"}>
            <RiLineChartLine />
            Dispatchers' gross
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={"/drivers"}>
            <FiUsers />
            Drivers
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={"/dispatchers"}>
            <FiUsers />
            Dispatchers
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={"/updaters"}>
            <FiUsers />
            Updaters
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={"/new-user"}>
            <FiUserPlus />
            Add User
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to={"/archive"}>
            <BsArchive />
            Archive
          </NavLink>
        </li>
        <li>
          <a className="ancer" href={"/admin"}>
            <RiAdminLine />
            Admin panel
          </a>
        </li>
      </ul>
      <h3>Actions</h3>
      <ul>
        <li>
          <NavLink className="link" to={"/reset-password"}>
            <HiOutlineKey />
            Reset password
          </NavLink>
        </li>
        <li>
          <NavLink
            className="link"
            to={"/login"}
            onClick={() => {
              localStorage.setItem("authentication", JSON.stringify({}));
            }}
          >
            <FiLogOut />
            Log out
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
