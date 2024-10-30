"use client";

import React from "react";
import Login from "../components/Login";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const RegisterPage = () => {
  const { loading } = useAuth({ register: true });
  if (loading) {
    return <Loading />;
  }
  return <Login loginOrRegister="REGISTER" />;
};

export default RegisterPage;
