"use client";

import React, { FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";
import MessageContext from "../context/context";

const Login = () => {
  const messageContext = useContext(MessageContext);
  const { setLogged, setUserId, setUserName } = messageContext;

  const [login, setLogin] = useState<string>("Janusz");
  const [password, setPassword] = useState<string>("2137");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5093/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Name: login, Password: password }),
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      toast(data.message);
      setLogged(true);
      setUserId(data.id);
      setUserName(data.name);
    } else {
      console.log("Unauthorized");
      toast("Unauthorized");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

export default Login;
