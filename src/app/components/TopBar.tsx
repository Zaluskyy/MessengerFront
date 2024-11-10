"use client";

import React, { useContext, useState } from "react";
import MessageContext from "../context/context";
import toast from "react-hot-toast";
import style from "../styles/TopBar.module.scss";
import { motion } from "framer-motion";
import { friendBtn } from "../UI/TopBar";
import { useRouter } from "next/navigation";
import AddFriendPopUp from "./popUp/AddFriend";

const TopBar = () => {
  const messageContext = useContext(MessageContext);
  const {
    apiUrl,
    userName,
    setLogged,
    setUserId,
    userId,
    setUserName,
    setCurrentFriend,
    setFriends,
    addFriendPopUp,
    setAddFriendPopUp,
  } = messageContext;

  const router = useRouter();

  const handleLogout = async () => {
    router.push("/login");

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
          <span>{userId}</span>
        </div>
        <div className={style.logoutContainer}>
          <button onClick={handleLogout}>Wyloguj</button>
        </div>
      </div>
      {addFriendPopUp && <AddFriendPopUp />}
    </div>
  );
};

export default TopBar;
