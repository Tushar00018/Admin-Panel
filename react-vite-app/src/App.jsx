import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import CreateEmployee from "./components/CreateEmployee";
import ShowEmployees from "./components/ShowEmployees";
import EditEmployee from "./components/EditEmployee";
import { useState } from "react";

export default function App() {
  const [login, setLogin] = useState(false);
  let [userName, setUserName] = useState({
    userName: "",
  });

  const navigate = useNavigate();
  const handleLogout = () => {
    setLogin(false);
    setUserName("");
    navigate("/");
  };
  return (
    <div>
      <Navbar login={login} userName={userName} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={<LoginPage setLogin={setLogin} setUserName={setUserName} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/show-employees" element={<ShowEmployees />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
      </Routes>
    </div>
  );
}
