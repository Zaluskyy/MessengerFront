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
  const [friend, setFriend] = useState<IUser | null>(null);
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
        friend,
        setFriend,
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
