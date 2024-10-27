"use client";

import React, { useContext } from "react";
import MessageContext from "../context/context";
import toast from "react-hot-toast";
import style from "../styles/TopBar.module.scss";

const TopBar = () => {
  const messageContext = useContext(MessageContext);
  const { logged, userId, userName, setLogged, setUserId, setUserName } =
    messageContext;

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5093/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setLogged(false);
        setUserId();
        setUserName("");
        toast("Wylogowano");
      } else {
        toast("Wylogowanie nie powiodło się kurwa");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.TopBar}>
      <div className={style.logoContainer}>
        <span>Messenger App</span>
      </div>

      <div className={style.right}>
        <div className={style.nameContainer}>
          <span>{userName}</span>
        </div>
        <div className={style.logoutContainer}>
          <button onClick={handleLogout}>Wyloguj</button>
        </div>
      </div>

      {/* <h1>Profile</h1>
      <h2>Hej {userName}</h2>
      <h3>Twoje id to {userId}</h3>
      <button onClick={handleLogout}>Wyloguj</button> */}
    </div>
  );
};

export default TopBar;
