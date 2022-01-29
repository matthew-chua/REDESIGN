import React from "react";
import classes from "./TextField.module.css";

export default function TextField(props) {
  const onChange = (event) => {
    props.onChange(event);
  };
  return (
    <input
      onChange={onChange}
      className={classes.input}
      value={props.value}
      placeholder={props.placeholder}
    />
  );
}
