import React, { useState } from "react";
import { useNavigate }  from "react-router-dom"
import "./styles.css";
import axios from "axios";
import Dashboard from "../Dashboard";

const Login = (props) => {
  const {setisLoggedIn} = props

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  // const [isLoggedIn, setisLoggedIn] = useState(null);

  let navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {

    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    axios
      .post(`https://reqres.in/api/login`, payload)
      .then((res) => {
        setData(res.data.token)
        localStorage.setItem('token', res.data.token)
        localStorage.getItem(res.data.token)
        navigate("/Dashboard", { replace: true })
        setisLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  // const props = {
  //   isLoggedIn
  // }

  return (
    <div className="login">
      <h1>Login</h1>
      <label id="email">Email</label>
      <input
        placeholder="Email"
        type="text"
        id="email"
        name="email"
        onChange={(e) => handleEmail(e)}
      ></input>
      <label id="password">Password</label>
      <input
        placeholder="Password"
        type="text"
        id="password"
        name="password"
        onChange={(e) => handlePassword(e)}
      ></input>
      <button onClick={(e) => handleLogin(e)}>Login</button>
      <h2>
        {!!data.length ? "Berhasil Login" : ""}
      </h2>
    </div>
  );
};

export default Login;
