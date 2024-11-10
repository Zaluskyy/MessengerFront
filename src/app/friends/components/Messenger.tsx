"use client";

import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "../style/Messenger.module.scss";
import MessageContext from "../../context/context";
import { IConversation } from "../../interfaces/interfaces";
import toast from "react-hot-toast";
import GetFriend from "./GetFriend";
import Image from "next/image";
import leftArrow from "../../../../img/leftArrow.svg";
import { useRouter } from "next/navigation";

const Messenger = () => {
  const messageContext = useContext(MessageContext);
  const { apiUrl, userId, currentFriend, setCurrentFriend } = messageContext;

  const [newMessage, setNewMessage] = useState<string>("");

  const [conversationData, setConversationData] = useState<
    IConversation[] | null
  >();
  const [conversationElements, setConversationElements] = useState<
    React.JSX.Element[] | null
  >();

  const centerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // const searchParams = useSearchParams();

  useEffect(() => {
    if (centerRef.current) {
      centerRef.current.scrollTop = centerRef.current.scrollHeight + 100;
    }
  }, [conversationElements]);

  useEffect(() => {
    if (conversationData) {
      const sortedConversation = [...conversationData].sort(
        (a: IConversation, b: IConversation) => {
          return new Date(a.time).getTime() - new Date(b.time).getTime();
        }
      );
      const elements = sortedConversation.map((item: IConversation) => {
        return (
          <div
            key={item.id}
            className={
              item.senderId == userId
                ? `${style.messageContainer} ${style.myMessage}`
                : style.messageContainer
            }
          >
            <div className={style.message}>{item.text}</div>
          </div>
        );
      });
      setConversationElements(elements);
    }
  }, [conversationData]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/messages/${userId}/${currentFriend.id}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setConversationData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (currentFriend !== null) {
      getMessages();
    }
  }, [currentFriend]);

  const friendsRef = useRef<HTMLDivElement | null>(null);
  const [hiddenFriends, setHiddenFriends] = useState<boolean>(false);

  useEffect(() => {
    if (friendsRef.current) {
      if (hiddenFriends) {
        friendsRef.current.style.display = "none";
      } else {
        friendsRef.current.style.display = "block";
      }
    }
  }, [hiddenFriends]);

  const handleSendNewMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() != "") {
      try {
        const response = await fetch(`${apiUrl}/messages/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: userId,
            receiverId: currentFriend.id,
            text: newMessage,
          }),
        });

        if (response.ok) {
          const data = response.json();
          console.log(data);
          setNewMessage("");
          toast("Wysłano wiadomość");
        } else {
          console.log("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleBackToList = () => {
    setCurrentFriend(null);
    router.replace("/friends");
  };

  return (
    <div className={style.Messenger}>
      {/* <div className={style.friends} ref={friendsRef}>
        <span onClick={() => setHiddenFriends(true)} className={style.x}>
          x
        </span>
        {y}
      </div> */}
      {/* <GetFriend setHiddenFriends={setHiddenFriends} friendsRef={friendsRef} /> */}
      {currentFriend && (
        <div className={style.topBar}>
          {hiddenFriends && (
            <div onClick={() => setHiddenFriends(false)}>show friends| |</div>
          )}
          <span>
            <Image src={leftArrow} alt="leftArrow" onClick={handleBackToList} />
            {currentFriend !== null &&
              `Id: ${currentFriend.id}, Name: ${currentFriend.name}`}
          </span>
        </div>
      )}
      <div className={style.center} ref={centerRef}>
        {conversationElements}
      </div>
      {currentFriend && (
        <div className={style.bottomBar}>
          <form onSubmit={(e) => handleSendNewMessage(e)}>
            <div className={style.inputContainer}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
            <div className={style.sendButtonContainer}>
              <input value={"Send"} type="submit" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Messenger;
