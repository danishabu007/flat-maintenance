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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/expenses", form);
      alert("Expense Added Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Expense Title" onChange={handleChange} required />
        <input name="month" placeholder="Month" onChange={handleChange} required />
        <input name="year" placeholder="Year" onChange={handleChange} required />
        <input name="amount" placeholder="Amount" type="number" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddExpense;
