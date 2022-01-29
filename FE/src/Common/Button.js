import React from "react";
import classes from "./Button.module.css";
export default function Button(props) {
  const isDisabled = props.isDisabled || false;
  const onClickHandler = () => {
    props.onClickHandler();
  };
  return (
    <button
      className={isDisabled && classes.disabled}
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      {props.children}
    </button>
  );
}
