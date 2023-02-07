import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import ControlBar from "./ControlBar";
import MessageBar from "./MessageBar/MessageBar";

const Layout = () => {
  return (
    <div className="pages">
      <Navbar />
      <ControlBar />
      <MessageBar />
      <Outlet />
    </div>
  );
};

export default Layout;
