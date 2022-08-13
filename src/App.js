import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Protected from "./HOC/Protected";

function App() {
  //check ada token di local storage
  // kalo ada state
  // lempar ke props
  const [isLoggedIn, setisLoggedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setisLoggedIn(false);
    } else {
      setisLoggedIn(true);
    }
  }, []);

  console.log(isLoggedIn, "islogin");

  const props = {
    isLoggedIn,
    setisLoggedIn
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login {...props}/>} />
        <Route
          path="/dashboard"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Dashboard {...props} />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
