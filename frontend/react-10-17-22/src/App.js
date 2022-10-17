import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Pages from "./components/Pages";
import RequireAuth from "./components/RequireAuth";
import "./App.css";
import "./index.css";

export const ROLES = {
  Owner: "OWN",
  Admin: "ADM",
  Dispatcher: "DIS",
  Updater: "UPD",
};

const App = () => {
  return (
    <div className="App" id="App">
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Owner, ROLES.Admin, ROLES.Dispatcher, ROLES.Updater]} />}>
          <Route path="/*" element={<Pages />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
