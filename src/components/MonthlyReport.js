import React, { useEffect, useState } from "react";
import API from "../services/api";

function MonthlyReport() {
  const [data, setData] = useState(null);
  const [month, setMonth] = useState("");

  useEffect(() => {
    fetchReport();
  }, []);

  useEffect(() => {
    fetchReport();
  }, [month]); // Month change hote hi auto fetch

  const fetchReport = async () => {
    try {
      const res = await API.get(`/full-report?month=${month}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return <h3>Loading...</h3>;

  return (
    <div className="container">
      <h2>Monthly Report</h2>

      {/* Month Dropdown */}
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        style={{ marginBottom: "20px" }}
      >
        <option value="">All Months</option>
        <option>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
        <option>May</option>
        <option>June</option>
        <option>July</option>
        <option>August</option>
        <option>September</option>
        <option>October</option>
        <option>November</option>
        <option>December</option>
      </select>

      {/* Summary */}
      <h3>Total Collection: ₹{data.totalCollection}</h3>
      <h3>Total Expense: ₹{data.totalExpense}</h3>
      <h3>Balance: ₹{data.balance}</h3>

      <hr />

      {/* Payments */}
      <h3>Payments</h3>
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
              <td>₹{p.amount}</td>
              <td>{new Date(p.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* Expenses */}
      <h3>Expenses</h3>
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
              <td>₹{e.amount}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonthlyReport;
