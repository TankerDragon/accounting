import React from "react";
import logo from "../images/logo.png";
// importing icons
import { FiUserPlus, FiLogOut } from "react-icons/fi";
import { RiExchangeDollarLine, RiLineChartLine } from "react-icons/ri";
import { GrUserManager } from "react-icons/gr";
import { HiOutlineKey } from "react-icons/hi";
import { BsArchive } from "react-icons/bs";
// importing styles
import { Style } from "./styles/Style.style";

function Navbar() {
  return (
    <Style.Nav>
      <div className="logo-container">
        <img src={logo} alt="logo" width={150} />
      </div>
      <h3>Main</h3>
      <ul>
        <li>
          <Style.SLink to={"/budget"}>
            <RiExchangeDollarLine />
            Accounting
          </Style.SLink>
        </li>
        <li>
          <Style.SLink to={"/drivers-gross"}>
            <RiLineChartLine />
            Drivers' gross
          </Style.SLink>
        </li>
        <li>
          <Style.SLink to={"/dispatchers-gross"}>
            <RiLineChartLine />
            Dispatchers' gross
          </Style.SLink>
        </li>
        <li>
          <Style.SLink to={"/dispatchers"}>
            <GrUserManager />
            All Dispatchers
          </Style.SLink>
        </li>
        <li>
          <Style.SLink to={"/new-driver"}>
            <FiUserPlus />
            Add Driver
          </Style.SLink>
        </li>
        <li>
          <Style.SLink to={"/new-dispatcher"}>
            <FiUserPlus />
            Add Dispatcher
          </Style.SLink>
        </li>
        <li>
          <Style.SLink to={"/archive"}>
            <BsArchive />
            Archive
          </Style.SLink>
        </li>
      </ul>
      <h3>Actions</h3>
      <ul>
        <li>
          <Style.SLink to={"/reset-password"}>
            <HiOutlineKey />
            Reset password
          </Style.SLink>
        </li>
        <li>
          <Style.SLink
            to={"/login"}
            onClick={() => {
              localStorage.setItem("authentication", JSON.stringify({}));
            }}
          >
            <FiLogOut />
            Log out
          </Style.SLink>
        </li>
      </ul>
    </Style.Nav>
  );
}

export default Navbar;
