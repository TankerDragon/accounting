import { Style } from "./styles/Style.style";
import { useEffect, useState } from "react";
import { TbMoonStars, TbSun } from "react-icons/tb";

const ControlBar = () => {
  //   const checkIsDarkMode = localStorage.getItem("isDarkMode") === null || "no" ? false : true;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const changeMode = () => {
    document.getElementById("App").classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", isDarkMode ? "yes" : "no");
    console.log(isDarkMode);
  };

  //   if (localStorage.getItem("isDarkMode") === "yes") {
  //     console.log("****************");
  //     document.getElementById("App").classList.toggle("dark");
  //     setIsDarkMode(!isDarkMode);
  //   }

  return (
    <Style.ControlBar>
      <div className="row">
        <p>*Control panel</p>
        <Style.ModeChanger onClick={changeMode}>
          {isDarkMode && <TbSun />}
          {!isDarkMode && <TbMoonStars />}
        </Style.ModeChanger>
      </div>
    </Style.ControlBar>
  );
};

export default ControlBar;
