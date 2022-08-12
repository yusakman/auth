import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    axios
      .post(`https://reqres.in/api/register`, payload)
      .then((res) => setData(res.data.token))
      .catch((err) => console.log(err));
  };

  return (
    <div className="register">
      <h1>Register</h1>
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
      <button onClick={(e) => handleRegister(e)}>Register</button>
      {!!data.length && "Berhasil"}
    </div>
  );
};

export default Register;
