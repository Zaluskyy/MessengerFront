"use client";

import toast from "react-hot-toast";
import MessageContext from "../context/context";
import { IUser } from "../interfaces/interfaces";
import style from "../styles/GetFriend.module.scss";
import React, {
  Ref,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IGetFriend {
  setHiddenFriends: React.Dispatch<SetStateAction<boolean>>;
  friendsRef: RefObject<HTMLDivElement>;
}

const GetFriend: React.FC<IGetFriend> = ({ setHiddenFriends, friendsRef }) => {
  const messageContext = useContext(MessageContext);
  const { userId, friend, setFriend } = messageContext;

  const [usersData, setUsersData] = useState<IUser[] | null>(null);

  const [userList, setUserList] = useState<React.JSX.Element[] | null>(null);

  useEffect(() => {
    if (usersData) {
      console.log(friend);
      console.log("kurwa");
      const y = usersData
        .filter((item: IUser) => item.id !== userId)
        .map((item: IUser) => {
          return (
            <div
              key={item.id}
              onClick={() => setFriend(item)}
              className={
                // friend?.id == item.id
                //   ? `${style.friend} ${style.active}`:style.friend
                // style.friend
                friend !== null && friend.id == item.id
                  ? `${style.friend} ${style.active}`
                  : style.friend
              }
            >
              {item.name}
            </div>
          );
        });
      setUserList(y);
    }
  }, [usersData, friend]);

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const response = await fetch("http://localhost:5093/users", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUsersData(data);
          toast("Users loaded");
        } else {
          console.log("failed loading friends");
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadFriends();
  }, []);

  return (
    <div className={style.friends} ref={friendsRef}>
      <span onClick={() => setHiddenFriends(true)} className={style.x}>
        x
      </span>
      {userList}
    </div>
  );
};

interface IGetFriend {
  setHiddenFriends: React.Dispatch<SetStateAction<boolean>>;
}

export default GetFriend;
