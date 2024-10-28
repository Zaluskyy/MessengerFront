"use client";

import React, { FormEvent, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import MessageContext from "../context/context";
import style from "../styles/Login.module.scss";
import { motion } from "framer-motion";
import { ContainerVariant, submit } from "../UI/LoginVariants";

const Login = () => {
  const messageContext = useContext(MessageContext);
  const {
    apiUrl,
    setLogged,
    setUserId,
    setUserName,
    currentFriend,
    setFriends,
  } = messageContext;

  const [login, setLogin] = useState<string>("Janusz");
  const [password, setPassword] = useState<string>("2137");
  const [password2, setPassword2] = useState<string>("");

  const [loginMode, setLoginMode] = useState<boolean>(true);
  const [formError, setFormError] = useState<string[] | null>(null);

  useEffect(() => {
    setLogin("");
    setPassword("");
    setPassword2("");
    setFormError(null);
  }, [loginMode]);

  const handleAddError = (errorText: string) => {
    setFormError((prev: string[] | null) => {
      if (prev) {
        const p = prev;
        p.push(errorText);
        return p;
      } else {
        return [errorText];
      }
    });
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (login == "" || password == "") {
      handleAddError("Some field are empty");
    } else {
      try {
        const response = await fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name: login, Password: password }),
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          toast(data.message);
          setLogged(true);
          setUserId(data.id);
          setUserName(data.name);

          setFriends(data.friendlist);
        } else {
          console.log("Unauthorized");
          toast("Unauthorized");
          setFormError(["Incorrect login data"]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (login == "" || password == "" || password2 == "") {
      handleAddError("Some field are empty");
    } else if (password == password2) {
      try {
        const response = await fetch(`${apiUrl}/users/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name: login, Password: password }),
        });
        if (response.ok) {
          toast("Zarejestrowano pomyślnie. Zaloguj się na swoje konto");
          setLoginMode(true);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      handleAddError("Passwords are not the same");
    }
  };

  return (
    <div className={style.Login}>
      <motion.div
        variants={ContainerVariant}
        initial="initial"
        animate="animate"
        className={style.container}
      >
        <h3 className={style.title}>{loginMode ? "Login" : "Register"}</h3>
        <h6 className={style.register}>
          {loginMode ? "Don't have an accout?" : "You already have an accout?"}

          <motion.span
            className={style.registerClick}
            onClick={() => setLoginMode((prev) => !prev)}
          >
            {loginMode ? "Register" : "Login"}
          </motion.span>
        </h6>
        <div className={style.line} />
        <form onSubmit={loginMode ? handleLoginSubmit : handleRegisterSubmit}>
          <input
            type="text"
            value={login}
            placeholder="Login"
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!loginMode && (
            <input
              type="password"
              value={password2}
              placeholder="Password"
              onChange={(e) => setPassword2(e.target.value)}
            />
          )}
          {formError && (
            <div className={style.validationContainer}>
              {formError.map((item: string, index: number) => {
                return <span key={index}>{item}</span>;
              })}
            </div>
          )}
          <motion.input
            type="submit"
            variants={submit}
            whileHover={"whileHover"}
          />
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
