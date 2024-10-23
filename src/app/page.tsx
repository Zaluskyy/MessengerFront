"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Login from "./components/Login";
import { useContext } from "react";
import MessageContext from "./context/context";
import Profile from "./components/Profile";

export default function Home() {
  const messageContext = useContext(MessageContext);
  const { logged } = messageContext;

  return (
    <div className={styles.Home}>
      <div>kurwa</div>
      {logged ? <Profile /> : <Login />}
    </div>
  );
}
