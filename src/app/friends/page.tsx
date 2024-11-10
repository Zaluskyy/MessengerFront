"use client";

import React, { useContext, useEffect, useState } from "react";
import style from "./style/Friends.module.scss";
import TopBar from "../components/TopBar";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import Messenger from "./components/Messenger";
import GetFriend from "./components/GetFriend";
import MessageContext from "../context/context";

const Friends = () => {
  const messageContext = useContext(MessageContext);
  const { pageWidth, setPageWidth, currentFriend, setCurrentFriend } =
    messageContext;

  const { loading } = useAuth({ redirect: false });

  useEffect(() => {
    const handleGetWidth = () => {
      setPageWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleGetWidth);
    handleGetWidth();
    return () => window.removeEventListener("resize", handleGetWidth);
  }, []);

  if (loading) {
    return <Loading />;
  }
  console.log(currentFriend);
  return (
    <div className={style.Friends}>
      <TopBar />
      {pageWidth < 500 ? (
        currentFriend ? (
          <Messenger />
        ) : (
          <GetFriend />
        )
      ) : (
        <div className={style.container}>
          <GetFriend />
          <Messenger />
        </div>
      )}
    </div>
  );
};

export default Friends;
