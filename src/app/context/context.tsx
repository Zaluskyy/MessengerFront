"use client";
import React, { createContext, ReactNode, useState } from "react";

const MessageContext = createContext<any>({} as any);

export const MessageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [userName, setUserName] = useState<string>("");
  return (
    <MessageContext.Provider
      value={{
        logged,
        setLogged,
        userId,
        setUserId,
        userName,
        setUserName,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
