import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2
        style={{
          fontWeight: "600",
          fontSize: "18px",
          color: "#ffffff",
          margin: 0,
        }}
      >
        Flat Maintenance
        <span
          style={{
            fontWeight: "400",
            fontSize: "14px",
            marginLeft: "6px",
            opacity: 0.8,
          }}
        >
          | By{" "}
          <span
            style={{
              color: "#f1c40f", // 🔥 Danish highlighted
              fontWeight: "600",
            }}
          >
            Danish
          </span>
        </span>
      </h2>

      <div>
        {/* <Link to="/">Dashboard</Link>
        <Link to="/add-payment">Add Payment</Link>
        <Link to="/add-expense">Add Expense</Link>
        <Link to="/status">Payment Status</Link>
        <Link to="/monthly-report">Monthly Report</Link> */}
      </div>
    </div>
  );
}

export default Navbar;
