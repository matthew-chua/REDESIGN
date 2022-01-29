import React from "react";
import checkboxSelected from "../Assets/Checkbox-Selected.svg";
import checkboxUnselected from "../Assets/Checkbox-Unselected.svg";
import { useState } from "react";
import classes from "./Checkbox.module.css";

export default function Checkbox(props) {
  const [selected, setSelected] = useState(props.initialState);
  const onClickHandler = () => {
    setSelected((prevState) => {
      return !prevState;
    });
    props.onClickHandler();
  };
  return (
    <div className={classes.checkboxContainer}>
      <img
        src={selected ? checkboxSelected : checkboxUnselected}
        className={classes.checkbox}
        onClick={onClickHandler}
      ></img>
      <p onClick={onClickHandler} className={classes.text}>
        {props.text}
      </p>
    </div>
  );
}
