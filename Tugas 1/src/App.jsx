import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import UserManagement from './Pages/UserManagement';
import EditUser from './Pages/EditUser';

import Login from './Pages/Login';
import { ThemeProvider } from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
