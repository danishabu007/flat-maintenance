import React from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AddPayment from "./components/AddPayment";
import AddExpense from "./components/AddExpense";
import MonthlyReport from "./components/MonthlyReport";
import "./App.css";
import PaymentStatus from "./components/PaymentStatus";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-payment" element={<AddPayment />} />
        <Route path="/status" element={<PaymentStatus />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/monthly-report" element={<MonthlyReport />} />
      </Routes>
    </Router>
  );
}

export default App;
