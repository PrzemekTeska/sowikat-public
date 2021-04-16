import React from "react";
import { NavLink } from 'react-router-dom'

const LogoutButton = () => {

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/admin";
  }

  return (
    <div id="navbar-admin">
      <div id="navbar-admin-links">
        <div className="nav-item-admin">
          <NavLink
            to="/admin/bookings"
            activeClassName="active"
            activeStyle={{
              fontWeight: "bold",
              color: "white",
              paddingBottom: "6px",
              borderBottom: "3px solid white"
            }}
          >Lista rezerwacji</NavLink>
        </div>
        <div className="nav-item-admin">
          <NavLink
            to="/admin/add-booking"
            activeClassName="active"
            activeStyle={{
              fontWeight: "bold",
              color: "white",
              paddingBottom: "6px",
              borderBottom: "3px solid white"
            }}
          >Kalendarz</NavLink>
        </div>
      </div>
      <button id="navbar-admin-logout"
        className="btn btn-light"
        onClick={() =>
          handleLogout()
        }
      >
        Wyloguj
      </button>
    </div>
  );
};

export default LogoutButton;