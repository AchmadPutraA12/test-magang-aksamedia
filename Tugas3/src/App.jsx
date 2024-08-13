import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import DivisionsTable from "./Pages/DivisionsTable";
import EmployeeTable from "./Pages/EmployeeTable";
import { ThemeProvider } from "./ThemeContext";
import NilaiTable from "./Pages/NilaiTable";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/divisions" element={<DivisionsTable />} />
            <Route path="/employees" element={<EmployeeTable />} />
            <Route path="/nilai" element={<NilaiTable />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
