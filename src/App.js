import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Sidebar on the left */}
        <Sidebar />
        {/* Main content area */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<UserManagement />} />
            <Route path="/role" element={<RoleManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
