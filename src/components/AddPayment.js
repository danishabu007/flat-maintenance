import React, { useState } from "react";
import API from "../services/api";

function AddPayment() {
  const [form, setForm] = useState({
    flatNumber: "",
    name: "",
    month: "",
    year: "",
    amount: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/payments", form);
      alert("Payment Added Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Add Payment</h2>
      <form onSubmit={handleSubmit}>
        <input name="flatNumber" placeholder="Flat Number" onChange={handleChange} required />
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="month" placeholder="Month" onChange={handleChange} required />
        <input name="year" placeholder="Year" onChange={handleChange} required />
        <input name="amount" placeholder="Amount" type="number" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddPayment;
