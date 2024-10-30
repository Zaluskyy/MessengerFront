import React, { FormEvent, useContext, useState } from "react";
import style from "../../styles/AddFriendPopUp.module.scss";
import MessageContext from "@/app/context/context";
import toast from "react-hot-toast";

const AddFriendPopUp = () => {
  const messageContext = useContext(MessageContext);
  const { apiUrl, userId, setAddFriendPopUp } = messageContext;

  const [inputFriendCode, setInputFriendCode] = useState<string>("");
  const [incorrectFriendCode, setIncorrectFriendCode] = useState<string | null>(
    null
  );

  const handleAddFriend = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/users/addfriend/${userId}/${inputFriendCode}`,
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
      } else {
        const data = await response.json();
        console.log(data.message);
        setIncorrectFriendCode(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setAddFriendPopUp(false);
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

          {incorrectFriendCode && (
            <div className={style.validationContainer}>
              <span>{incorrectFriendCode}</span>
            </div>
          )}

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
