import React, { useState } from "react";
import classes from "./LoanPage.module.css";

export default function LoanPage() {
  //this should be pulled from auth??
  const name = "Ivan Teo";

  //represents state of loan
  //can be "locked", "unlocked" or "returned"
  const [loanState, setLoanState] = useState("locked");

  const unlockHandler = () => {
    console.log("SEND SIGNAL TO BACKEND TO UNLOCK");
    //insert logic here
    
    //insert try catch and update the loanState accordingly
    setLoanState("unlocked");
  };

  return (
    <div className={classes.root}>
      <h1>Welcome, {name}</h1>

      <div className={classes.content}>
        {loanState === "locked" && (
          <div className={classes.innerContent}>
          <p className={classes.icon}>
            <i class="fa fa-lock" onClick={unlockHandler}></i>
          </p>
          <p>Press to unlock!</p>
          </div>
        )}

        {loanState === "unlocked" && (
          <p className={classes.icon}>
            <i class="fa fa-unlock"></i>
          </p>
        )}

        {loanState === "error" && (
          <div className={classes.innerContent}>
          <p className={classes.iconError}>
            <i class="fa fa-lock"></i>
          </p>
          <p>Error, trolley is already unlocked</p>
          </div>
        )}

      </div>
    </div>
  );
}
