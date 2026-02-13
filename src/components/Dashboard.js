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

  const groupByMonth = (items) => {
    return items.reduce((acc, item) => {
      const date = new Date(item.date);
      const monthYear = date.toLocaleString("default", {
        month: "long",
        year: "numeric"
      });

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }

      acc[monthYear].push(item);
      return acc;
    }, {});
  };

  if (!data)
    return <h3 className="loading-text">Loading...</h3>;

  const groupedPayments = groupByMonth(data.payments);
  const groupedExpenses = groupByMonth(data.expenses);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">
        Flat Maintenance Dashboard
      </h2>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card income">
          <h4>Total Collection</h4>
          <p>₹ {data.totalCollection}</p>
        </div>

        <div className="summary-card expense">
          <h4>Total Expense</h4>
          <p>₹ {data.totalExpense}</p>
        </div>

        <div className="summary-card balance">
          <h4>Balance</h4>
          <p>₹{data.balance}</p>
        </div>
      </div>

      {/* Payments */}
      <div className="section">
        <h3 className="section-title">
          Payments (Month Wise)
        </h3>

        {Object.keys(groupedPayments).map((month) => {
          const monthlyTotal = groupedPayments[month].reduce(
            (sum, p) => sum + p.amount,
            0
          );

          return (
            <div key={month} className="month-block">
              <h4 className="month-title">
                {month} — Total: ₹ {monthlyTotal}
              </h4>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Flat</th>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedPayments[month].map((p, i) => (
                      <tr key={i}>
                        <td>{p.flatNumber}</td>
                        <td>{p.name}</td>
                        <td className="income-text">
                          ₹{p.amount}
                        </td>
                        <td>
                          {new Date(p.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expenses */}
      <div className="section">
        <h3 className="section-title">
          Expenses (Month Wise)
        </h3>

        {Object.keys(groupedExpenses).map((month) => {
          const monthlyTotal = groupedExpenses[month].reduce(
            (sum, e) => sum + e.amount,
            0
          );

          return (
            <div key={month} className="month-block">
              <h4 className="month-title">
                {month} — Total: ₹ {monthlyTotal}
              </h4>

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
                    {groupedExpenses[month].map((e, i) => (
                      <tr key={i}>
                        <td>{e.title}</td>
                        <td className="expense-text">
                          ₹{e.amount}
                        </td>
                        <td>
                          {new Date(e.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
