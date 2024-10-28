"use client";

import { useContext, useEffect } from "react";
// import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Login from "./components/Login";
import MessageContext from "./context/context";
import Profile from "./components/TopBar";
import Messenger from "./components/Messenger/Messenger";
import AddFriendPopUp from "./components/popUp/AddFriend";

export default function Home() {
  const messageContext = useContext(MessageContext);
  const {
    apiUrl,
    logged,
    setLogged,
    setUserId,
    setUserName,
    setFriends,
    addFriendPopUp,
  } = messageContext;

  // const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${apiUrl}/check-auth`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setLogged(data.isAuthenticated);
          setUserId(data.id);
          setUserName(data.name);
          setFriends(data.friendlist);
          // router.push("/friends");
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
          {addFriendPopUp && <AddFriendPopUp />}
          {/* <GetConversation /> */}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
