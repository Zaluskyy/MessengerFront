"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Login from "./components/Login";
import { useContext, useEffect } from "react";
import MessageContext from "./context/context";
import Profile from "./components/TopBar";
import Messenger from "./components/Messenger/Messenger";

export default function Home() {
  const messageContext = useContext(MessageContext);
  const { logged, setLogged, setUserId, setUserName } = messageContext;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5093/check-auth", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setLogged(data.isAuthenticated);
          setUserId(data.id);
          setUserName(data.name);
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkAuth();
  }, []);

  return (
    <div className={styles.Home}>
      {logged ? (
        <>
          <Profile />
          <Messenger />
          {/* <GetConversation /> */}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
