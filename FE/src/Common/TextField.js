import React from "react";
import classes from "./TextField.module.css";

export default function TextField(props) {
  const onChange = (event) => {
    props.onChange(event);
    if (props.setError){
      props.setError(null);
    }
  };

  return (
    <div>
      <input
        onChange={onChange}
        className={`${classes.input} ${props.error ? classes.errorShake : ""}`}
        value={props.value}
        placeholder={props.placeholder}
        pattern={props.numberInput ? "[0-9]*" : null} 
        inputmode={props.numberInput ? "tel" : "text"}
      />
      {props.error && <p className={classes.errorText}>{props.errorText}</p>}
    </div>
  );
}
