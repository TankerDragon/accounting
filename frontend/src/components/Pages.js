import { Route, Routes } from "react-router-dom";
import { ROLES } from "../App";
import RequireAuth from "./RequireAuth";
import Navbar from "./Navbar";
import ControlBar from "./ControlBar";
import GrossBoard from "./pages/GrossBoard/GrossBoard";
import Users from "./pages/Users/Users";
import Drivers from "./pages/Drivers/Drivers";

const Pages = () => {
  return (
    <div className="pages">
      <Navbar />
      <ControlBar />
      <Routes>
        <Route element={<RequireAuth allowedRoles={[ROLES.Owner, ROLES.Admin, ROLES.Dispatcher, ROLES.Updater]} />}>
          <Route path="gross-board" element={<GrossBoard />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Pages;
