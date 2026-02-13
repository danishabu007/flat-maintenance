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

  // Group By Month-Year
  const groupByMonth = (items = []) => {
    return items.reduce((acc, item) => {
      const date = new Date(item.date);
      const monthYear = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }

      acc[monthYear].push(item);
      return acc;
    }, {});
  };

  if (!data) {
    return <h3 className="loading-text">Loading...</h3>;
  }

  const payments = data.payments || [];
  const expenses = data.expenses || [];

  const groupedPayments = groupByMonth(payments);
  const groupedExpenses = groupByMonth(expenses);

  // 🔥 Balance frontend me calculate
  const totalCollection = data.totalCollection || 0;
  const totalExpense = data.totalExpense || 0;
  const balance = totalCollection - totalExpense;

  // Sort months (latest first)
  const sortedPaymentMonths = Object.keys(groupedPayments).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const sortedExpenseMonths = Object.keys(groupedExpenses).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">
        Flat Maintenance Dashboard
      </h2>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card income">
          <h4>Total Collection</h4>
          <p>₹ {totalCollection}</p>
        </div>

        <div className="summary-card expense">
          <h4>Total Expense</h4>
          <p>₹ {totalExpense}</p>
        </div>

        <div className="summary-card balance">
          <h4>Balance</h4>
          <p>₹ {balance}</p>
        </div>
      </div>

      {/* Payments Section */}
      <div className="section">
        <h3 className="section-title">
          Payments (Month Wise)
        </h3>

        {sortedPaymentMonths.length === 0 && (
          <p className="no-data">No Payments Found</p>
        )}

        {sortedPaymentMonths.map((month) => {
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
                      {/* <th>Flat</th> */}
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedPayments[month].map((p, i) => (
                      <tr key={i}>
                        {/* <td>{p.flatNumber}</td> */}
                        <td>{p.name}</td>
                        <td className="income-text">
                          ₹ {p.amount}
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

      {/* Expenses Section */}
      <div className="section">
        <h3 className="section-title">
          Expenses (Month Wise)
        </h3>

        {sortedExpenseMonths.length === 0 && (
          <p className="no-data">No Expenses Found</p>
        )}

        {sortedExpenseMonths.map((month) => {
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
                          ₹ {e.amount}
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
