import React, { FormEvent, useContext, useState } from "react";
import style from "../../styles/AddFriendPopUp.module.scss";
import MessageContext from "@/app/context/context";
import toast from "react-hot-toast";

const AddFriendPopUp = () => {
  const messageContext = useContext(MessageContext);
  const { userId, addFriendPopUp, setAddFriendPopUp } = messageContext;

  const [inputFriendCode, setInputFriendCode] = useState<string>("");

  const handleAddFriend = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5093/users/addfriend/${userId}/${inputFriendCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast("You added new friend");
        setAddFriendPopUp(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    console.log("kurwa jebac disa");
  };

  return (
    <>
      <div className={style.background} onClick={handleClose}></div>
      <div className={style.AddFriend}>
        <form onSubmit={handleAddFriend} className={style.container}>
          <h3>Insert friend code:</h3>

          <input
            type="text"
            value={inputFriendCode}
            onChange={(e) => {
              setInputFriendCode(e.target.value);
            }}
          />

          <input
            type="submit"
            // variants={submit}
            // whileHover={"whileHover"}
          />
        </form>
      </div>
    </>
  );
};

export default AddFriendPopUp;
