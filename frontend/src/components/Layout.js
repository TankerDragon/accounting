import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import ControlBar from "./ControlBar";

const Layout = () => {
  return (
    <div className="pages">
      <Navbar />
      <ControlBar />
      <Outlet />
    </div>
  );
};

export default Layout;
