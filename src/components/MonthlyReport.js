import React, { useEffect, useState } from "react";
import API from "../services/api";

function MonthlyReport() {
  const [data, setData] = useState(null);
  const [month, setMonth] = useState("");

  const [editPayment, setEditPayment] = useState(null);
  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    fetchReport();
  }, [month]);

  const fetchReport = async () => {
    try {
      const res = await API.get(`/full-report?month=${month}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ========================= */
  /* DELETE */
  /* ========================= */

  const handleDeletePayment = async (id) => {
    if (window.confirm("Delete this payment?")) {
      await API.delete(`/payments/${id}`);
      fetchReport();
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm("Delete this expense?")) {
      await API.delete(`/expenses/${id}`);
      fetchReport();
    }
  };

  /* ========================= */
  /* UPDATE PAYMENT */
  /* ========================= */

  const handleUpdatePayment = async () => {
    await API.put(`/payments/${editPayment._id}`, editPayment);
    setEditPayment(null);
    fetchReport();
  };

  /* ========================= */
  /* UPDATE EXPENSE */
  /* ========================= */

  const handleUpdateExpense = async () => {
    await API.put(`/expenses/${editExpense._id}`, editExpense);
    setEditExpense(null);
    fetchReport();
  };

  if (!data) return <h3>Loading...</h3>;

  const totalCollection = data.payments.reduce(
    (sum, p) => sum + Number(p.amount),
    0
  );

  const totalExpense = data.expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const balance = totalCollection - totalExpense;

  return (
    <div className="container">
      <h2>Monthly Report</h2>

      {/* Month Filter */}
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

      <h3>Total Collection: ₹{totalCollection}</h3>
      <h3>Total Expense: ₹{totalExpense}</h3>
      <h3>Balance: ₹{balance}</h3>

      <hr />

      {/* ================= PAYMENTS ================= */}
      <h3>Payments</h3>
      <table>
        <thead>
          <tr>
            <th>Flat</th>
            <th>Name</th>
            <th>Month</th>
            <th>Year</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.payments.map((p) => (
            <tr key={p._id}>
              <td>{p.flatNumber}</td>
              <td>{p.name}</td>
              <td>{p.month}</td>
              <td>{p.year}</td>
              <td>₹{p.amount}</td>
              <td>{new Date(p.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => setEditPayment(p)}>Edit</button>
                <button
                  onClick={() => handleDeletePayment(p._id)}
                  style={{ marginLeft: "5px", color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= EXPENSES ================= */}
      <hr />
      <h3>Expenses</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Month</th>
            <th>Year</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.expenses.map((e) => (
            <tr key={e._id}>
              <td>{e.title}</td>
              <td>{e.month}</td>
              <td>{e.year}</td>
              <td>₹{e.amount}</td>
              <td>{e.description}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => setEditExpense(e)}>Edit</button>
                <button
                  onClick={() => handleDeleteExpense(e._id)}
                  style={{ marginLeft: "5px", color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= EDIT PAYMENT MODAL ================= */}
      {editPayment && (
        <div style={modalStyle}>
          <h3>Edit Payment</h3>
          <input
            value={editPayment.flatNumber}
            onChange={(e) =>
              setEditPayment({ ...editPayment, flatNumber: e.target.value })
            }
          />
          <input
            value={editPayment.name}
            onChange={(e) =>
              setEditPayment({ ...editPayment, name: e.target.value })
            }
          />
          <input
            value={editPayment.month}
            onChange={(e) =>
              setEditPayment({ ...editPayment, month: e.target.value })
            }
          />
          <input
            value={editPayment.year}
            onChange={(e) =>
              setEditPayment({ ...editPayment, year: e.target.value })
            }
          />
          <input
            value={editPayment.amount}
            onChange={(e) =>
              setEditPayment({ ...editPayment, amount: e.target.value })
            }
          />

          <button onClick={handleUpdatePayment}>Save</button>
          <button onClick={() => setEditPayment(null)}>Cancel</button>
        </div>
      )}

      {/* ================= EDIT EXPENSE MODAL ================= */}
      {editExpense && (
        <div style={modalStyle}>
          <h3>Edit Expense</h3>
          <input
            value={editExpense.title}
            onChange={(e) =>
              setEditExpense({ ...editExpense, title: e.target.value })
            }
          />
          <input
            value={editExpense.month}
            onChange={(e) =>
              setEditExpense({ ...editExpense, month: e.target.value })
            }
          />
          <input
            value={editExpense.year}
            onChange={(e) =>
              setEditExpense({ ...editExpense, year: e.target.value })
            }
          />
          <input
            value={editExpense.amount}
            onChange={(e) =>
              setEditExpense({ ...editExpense, amount: e.target.value })
            }
          />
          <input
            value={editExpense.description}
            onChange={(e) =>
              setEditExpense({ ...editExpense, description: e.target.value })
            }
          />

          <button onClick={handleUpdateExpense}>Save</button>
          <button onClick={() => setEditExpense(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

/* Simple Modal Style */
const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

export default MonthlyReport;
