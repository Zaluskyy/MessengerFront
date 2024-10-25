"use client";

import React, { useContext, useEffect, useState } from "react";
import MessageContext from "../context/context";

interface IConversation {
  receiverId: number;
  senderId: number;
  receiverName: string;
  senderName: string;
  text: string;
  time: any;
}

const [conversation, setConversation] = useState<IConversation | null>();

const GetConversation = () => {
  const messageContext = useContext(MessageContext);
  const { userId } = messageContext;
  const senderId = 2;
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5093/messages/${userId}/${senderId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, []);
};
export default GetConversation;
