"use client";
import React, { createContext, ReactNode, useState } from "react";
import { IUser } from "../interfaces/interfaces";

const MessageContext = createContext<any>({} as any);

export const MessageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // const apiUrl = "http://localhost:5093";
  const apiUrl = "http://192.168.0.202:5000";
  const [pageWidth, setPageWidth] = useState<null | number>(null);
  const [logged, setLogged] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [userName, setUserName] = useState<string>("");
  const [currentFriend, setCurrentFriend] = useState<IUser | null>(null);
  const [friends, setFriends] = useState<IUser[] | null>(null);
  const [addFriendPopUp, setAddFriendPopUp] = useState<boolean>(false);

  return (
    <MessageContext.Provider
      value={{
        apiUrl,
        pageWidth,
        setPageWidth,
        logged,
        setLogged,
        userId,
        setUserId,
        userName,
        setUserName,
        currentFriend,
        setCurrentFriend,
        friends,
        setFriends,
        addFriendPopUp,
        setAddFriendPopUp,
        // friendId,
        // setFriendId,
        // friendName,
        // setFriendName,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
