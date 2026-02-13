import React, { useEffect, useState } from "react";
import API from "../services/api";

function PaymentStatus() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await API.get("/status");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>All Payment Records</h2>

      <table>
        <thead>
          <tr>
            <th>Flat</th>
            <th>Name</th>
            <th>Month</th>
            <th>Year</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p, i) => (
            <tr key={i}>
              <td>{p.flatNumber}</td>
              <td>{p.name}</td>
              <td>{p.month}</td>
              <td>{p.year}</td>
              <td>₹{p.amount}</td>
              <td>{new Date(p.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentStatus;
