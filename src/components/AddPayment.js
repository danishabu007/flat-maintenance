import React, { useState } from "react";
import API from "../services/api";

function AddPayment() {
  const [form, setForm] = useState({
    flatNumber: "",
    name: "",
    month: "",
    year: "",
    amount: "",
  });

  // 🔥 First Letter Capital Function
  const capitalizeWords = (value) => {
    return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Agar name field hai to auto capitalize kare
    if (name === "name") {
      setForm({ ...form, [name]: capitalizeWords(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/payments", form);
      alert("Payment Added Successfully ✅");

      // ✅ Form Reset
      setForm({
        flatNumber: "",
        name: "",
        month: "",
        year: "",
        amount: "",
      });

      // ✅ Page Refresh (optional)
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Error adding payment");
    }
  };

  return (
    <div className="container">
      <h2>Add Payment</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddPayment;
