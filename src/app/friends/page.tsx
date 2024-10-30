"use client";

import React from "react";
import style from "./Friends.module.scss";
import TopBar from "../components/TopBar";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const Friends = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={style.Friends}>
      <TopBar />
    </div>
  );
};

export default Friends;
