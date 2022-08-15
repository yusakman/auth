import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Protected from "./HOC/Protected";
import Detail from "./pages/Detail User";
import axios from "axios";

function App() {
  //check ada token di local storage
  // kalo ada state
  // lempar ke props
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getData();
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setisLoggedIn(false);
    } else {
      setisLoggedIn(true);
    }
  }, []);

  const getData = () => {
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    try {
        const res = await axios.delete(`https://reqres.in/api/users/${id}`)
        if (res.status === 204) {
            console.log(`data berhasil di hapus`);
            console.log(`open is ${open}`)
            handleClose();
        }
    } catch(error) {
        console.log(error)
    }
  }

  const props = {
    isLoggedIn,
    setisLoggedIn,
    data,
    handleDelete,
    open,
    handleOpen,
    handleClose
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
        <Route
          path="/detail/:id"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Detail {...props} />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
