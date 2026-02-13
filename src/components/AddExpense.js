import React, { useState } from "react";
import API from "../services/api";

function AddExpense() {
  const [form, setForm] = useState({
    title: "",
    month: "",
    year: "",
    amount: "",
    description: ""
  });

  // 🔥 Capitalize Function
  const capitalizeWords = (value) => {
    return value
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title" || name === "description") {
      setForm({ ...form, [name]: capitalizeWords(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/expenses", form);
      alert("Expense Added Successfully ✅");

      // Reset Form
      setForm({
        title: "",
        month: "",
        year: "",
        amount: "",
        description: ""
      });

      // Page Refresh
      window.location.reload();

    } catch (err) {
      console.log(err);
      alert("Error adding expense");
    }
  };

  return (
    <div className="container">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Expense Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="month"
          placeholder="Month"
          value={form.month}
          onChange={handleChange}
          required
        />

        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          required
        />

        <input
          name="amount"
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          required
        />

        {/* <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        /> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddExpense;
