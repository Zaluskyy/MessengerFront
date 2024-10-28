"use client";
import React, { createContext, ReactNode, useState } from "react";
import { IUser } from "../interfaces/interfaces";

const MessageContext = createContext<any>({} as any);

export const MessageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [userName, setUserName] = useState<string>("");
  const [currentFriend, setCurrentFriend] = useState<IUser | null>(null);
  const [friends, setFriends] = useState<IUser[] | null>(null);

  const [addFriendPopUp, setAddFriendPopUp] = useState<boolean>(false);
  // const [friendId, setFriendId] = useState<number | null>(null);
  // const [friendName, setFriendName] = useState<string | null>(null);
  return (
    <MessageContext.Provider
      value={{
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
