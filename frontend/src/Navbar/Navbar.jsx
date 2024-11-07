import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMoon,
  faPlus,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { Link } from "react-router-dom";
import useDarkMode from "./useDarkMode";

function NavBar() {
  const [mode, toggleColorMode] = useDarkMode();

  return (
    <nav className="navbar">
      <Link to={"/"}>Online Product Store</Link>
      <Link to={"/create"}>
        <button>
          <FontAwesomeIcon icon={faPlus} /> Create
        </button>
      </Link>

      {/* Button to toggle color mode */}
      <button onClick={toggleColorMode}>
        <FontAwesomeIcon icon={mode === "light" ? faMoon : faSun} />{" "}
        {mode === "light" ? "Dark" : "Light"} Mode
      </button>
    </nav>
  );
}

export default NavBar;
