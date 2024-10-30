import React from "react";
import style from "../styles/Load.module.scss";

const Loading = () => {
  return (
    <div className={style.Loading}>
      <div className={style.container}></div>
    </div>
  );
};

export default Loading;
