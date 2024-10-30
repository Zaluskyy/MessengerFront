"use client";

import React, { useContext, useState } from "react";
import MessageContext from "../context/context";
import toast from "react-hot-toast";
import style from "../styles/TopBar.module.scss";
import { motion } from "framer-motion";
import { friendBtn } from "../UI/TopBar";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const messageContext = useContext(MessageContext);
  const {
    apiUrl,
    userName,
    setLogged,
    setUserId,
    setUserName,
    setCurrentFriend,
    setFriends,
    setAddFriendPopUp,
  } = messageContext;

  const router = useRouter();

  const handleLogout = async () => {
    router.push("/login");
    // router.push("/");

    try {
      const response = await fetch(`${apiUrl}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setLogged(false);
        setUserId();
        setUserName("");
        setCurrentFriend(null);
        setFriends(null);
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
        <span>Message</span>
      </div>

      <div className={style.right}>
        <motion.div
          variants={friendBtn}
          whileHover="whileHover"
          transition={{ duration: 0.01 }}
          className={style.findFriendContainer}
          onClick={() => setAddFriendPopUp(true)}
        >
          <span>Add Friend</span>
        </motion.div>
        <div className={style.nameContainer}>
          <span>{userName}</span>
        </div>
        <div className={style.logoutContainer}>
          <button onClick={handleLogout}>Wyloguj</button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
