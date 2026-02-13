import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/full-report");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Flat Maintenance Dashbohhhard</h2>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card income">
          <h4>Total Collection</h4>
          <p>₹{data.totalCollection}</p>
        </div>

        <div className="summary-card expense">
          <h4>Total Expense</h4>
          <p>₹{data.totalExpense}</p>
        </div>

        <div className="summary-card balance">
          <h4>Balance</h4>
          <p>₹{data.balance}</p>
        </div>
      </div>

      {/* Payments */}
      <div className="section">
        <h3>All Payments</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Flat</th>
                <th>Name</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.payments.map((p, i) => (
                <tr key={i}>
                  <td>{p.flatNumber}</td>
                  <td>{p.name}</td>
                  <td>{p.month}</td>
                  <td className="income-text">₹{p.amount}</td>
                  <td>{new Date(p.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expenses */}
      <div className="section">
        <h3>All Expenses</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.expenses.map((e, i) => (
                <tr key={i}>
                  <td>{e.title}</td>
                  <td className="expense-text">₹{e.amount}</td>
                  <td>{new Date(e.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
