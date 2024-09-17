import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hamburgerIcon from "../../assets/nav/Hamburger.svg";
import signout from "../../assets/nav/signout.svg";
import dashboard from "../../assets/nav/dashboard.svg";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setCarerLoggedIn, setGuardianLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  function handleNavClick() {
    setMenuOpen(!menuOpen);
  }

  function handleGoToDashboard() {
    setMenuOpen(false);
    navigate("/dashboard");
  }

  function handleSignOutClick() {
    setCarerLoggedIn(null);
    setGuardianLoggedIn(null);
    localStorage.removeItem("guardianLoggedIn");
    localStorage.removeItem("carerLoggedIn");
    setMenuOpen(false);
    navigate("/login");
  }

  return (
    <nav className="mobile-nav">
      <menu className="hamburger-menu">
        <button
          className="hamburger-icon"
          id="hamburger-icon"
          onClick={handleNavClick}
        >
          <img
            id="hamburger-icon-img"
            className="hamburger-icon-img"
            src={hamburgerIcon}
            alt="Open navigation Menu"
          />
        </button>
        <ul
          className={`z-50 overflow-hidden list-none w-max top-full left-0 absolute bg-blue-100 transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <li
            className="navLinkItem flex flex-row justify-start items-center"
            onClick={handleGoToDashboard}
          >
            <img src={dashboard} alt="home icon" className="w-5 mr-3" />
            Dashboard
          </li>
          <li
            className="navLinkItem flex flex-row justify-start items-center"
            onClick={handleSignOutClick}
          >
            <img src={signout} alt="home icon" className="w-5 mr-3" />
            Sign Out
          </li>
        </ul>
      </menu>
    </nav>
  );
}
