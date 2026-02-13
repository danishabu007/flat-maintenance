import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2>Flat Maintenance</h2>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/add-payment">Add Payment</Link>
        <Link to="/add-expense">Add Expense</Link>
        <Link to="/status">Payment Status</Link>
        <Link to="/monthly-report">Monthly Report</Link>
      </div>
    </div>
  );
}

export default Navbar;
