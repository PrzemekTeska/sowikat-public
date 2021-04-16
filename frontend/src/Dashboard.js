import React, { Component } from "react";

class dashboard extends Component {
  handleLogout() {
    localStorage.clear();
    window.location.href = "/admin";
  }

  render() {
    return (
      <div>
        <h1>WELCOME TO DASHBOARD</h1>
        
        <button
          onClick={this.handleLogout}
          className="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
          <i className="ti-power-off mR-10"></i>
          <span style={{ color: "white" }}>Logout</span>
        </button>
      </div>
    );
  }
}
export default dashboard;