"use client";

import React from "react";
import Login from "../components/Login";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const LoginPage = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return <Login loginOrRegister="LOGIN" />;
};

export default LoginPage;
