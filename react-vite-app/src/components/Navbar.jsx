import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ login, userName, onLogout }) {
  return (
    <nav>
      <ul>
        {!login && (
          <>
            <li>
              <Link to="/">Login</Link>
            </li>
          </>
        )}
        {login && (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/create-employee">Create Employee</Link>
            </li>
            <li>
              <Link to="/show-employees">Show Employees</Link>
            </li>
            <li>
              <p className="nav-user">{userName}</p>
            </li>
            <li>
              <button className="nav-logout" onClick={onLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
