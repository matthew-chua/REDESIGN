import React from "react";
import classes from "./TextField.module.css";

export default function TextField(props) {
  const onChange = (event) => {
    props.onChange(event);
    props.setError(false);
  };

  return (
    <div>
      <input
        onChange={onChange}
        className={`${classes.input} ${props.error ? classes.errorShake : ""}`}
        value={props.value}
        placeholder={props.placeholder}
      />
      {props.error && <p className={classes.errorText}>{props.errorText}</p>}
    </div>
  );
}
