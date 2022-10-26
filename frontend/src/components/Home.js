import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="darkGlass">
        <nav>
          <div className="logo">
            <img src={logo} alt="logo" width="130" />
            <span>Sam Auto Trans</span>
          </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </nav>
        <div className="message">
          <h1>Welcome to Our Web Page</h1>
          <p>Please, Log in to continue</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
