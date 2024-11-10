"use client";

import toast from "react-hot-toast";
import MessageContext from "../../context/context";
import { IUser } from "../../interfaces/interfaces";
import style from "../style/GetFriend.module.scss";
import React, {
  Ref,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface IGetFriend {
  setHiddenFriends?: React.Dispatch<SetStateAction<boolean>>;
  friendsRef?: RefObject<HTMLDivElement>;
}

const GetFriend: React.FC<IGetFriend> = ({ setHiddenFriends, friendsRef }) => {
  const messageContext = useContext(MessageContext);
  const { apiUrl, userId, currentFriend, setCurrentFriend, friends } =
    messageContext;

  const [userList, setUserList] = useState<React.JSX.Element[] | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = Number(searchParams.get("id"));
    // console.log(friends);

    if (id) {
      const selectedFriend = friends.find((item: IUser) => item.id == id);
      if (selectedFriend) {
        setCurrentFriend(selectedFriend);
      }
    }
  }, [searchParams]);

  const handleChooseFriend = (user: IUser) => {
    setCurrentFriend(user);
    // console.log(user);
    router.push(`friends/?id=${user.id}`);
  };

  useEffect(() => {
    if (friends) {
      const userListArr = friends
        .filter((item: IUser) => item.id !== userId)
        .map((item: IUser, index: number) => {
          return (
            <div key={item.id}>
              {index !== 0 && <div className={style.line} />}
              <div
                // key={item.id}
                onClick={() => handleChooseFriend(item)}
                className={
                  currentFriend !== null && currentFriend.id == item.id
                    ? `${style.friend} ${style.active}`
                    : style.friend
                }
              >
                {item.name}
                {/* {item.id} */}
              </div>
            </div>
          );
        });
      setUserList(userListArr);
    }
    // }, [friends]);
  }, [friends, currentFriend]);

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/${userId}`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
        } else {
          console.log("failed loading friends");
        }
      } catch (err) {
        // console.log(err);
      }
    };
    loadFriends();
  }, []);

  return (
    <div className={style.Friends} ref={friendsRef}>
      {userList}
    </div>
  );
};

export default GetFriend;
