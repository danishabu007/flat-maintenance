import React, { useEffect, useState } from "react";
import API from "../services/api";
import styles from "./PaymentStatus.module.css";

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
    <div className={styles.container}>
      <h2 className={styles.heading}>All Payment Records</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
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
    </div>
  );
}

export default PaymentStatus;
