import React, { useEffect, useState } from "react";
import classes from "./LoanPage.module.css";

import APIHook from "../APIHook";

export default function LoanPage() {
  const [user, setUser] = useState({
    name: localStorage.getItem('userName'),
    userID: localStorage.getItem('userID')
  });

  //represents state of loan
  //can be "locked", "unlocked" or "returned"
  const [loanState, setLoanState] = useState("locked");
  const [loanObjectState, setLoanObjectState] = useState({})
  const [snake, setSnake] = useState(false);

  const TID = "1"


  const unlockHandler = async () => {

    //make sure trolley is not borrowed
    const trolley = await APIHook("GET", `trolley/${TID}`, {})
    if (trolley.data.shouldUnlock === true || trolley.data.isUnlocked === true){
      setLoanState("error");
      return;
    }
    
    // create loan
    const loan = await APIHook("POST", "loan/createLoan", {
        userID: user.userID,
        trolleyID: TID
    });

    setLoanObjectState(loan.data);
    setLoanState("unlocked");
    
  };

  const returnCheckHandler = async () => {

    const currentLoan = await APIHook("GET", `loan/${loanObjectState.loanID}`)
    if (currentLoan.data.returned){
      setLoanState("returned");
    }else{
      setSnake(true);
    }
  }

  return (
    <div className={classes.root}>
      {loanState !== "returned" && <h1>Welcome, {user.name}!</h1>}
      {loanState === "returned" && <h1>Thank you, {user.name}!</h1>}
      

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
          <div className={classes.innerContent}>
          <p className={classes.icon} onClick={returnCheckHandler}>
            <i class="fa fa-unlock"></i>
          </p>
          <h1>{loanObjectState.borrowDate.substring(0,10)}</h1>
          <h1>{loanObjectState.borrowDate.substring(11,16)}</h1>
          <h3>Ready for use!</h3>
          <p>Please return your trolley within 24 hours.</p>
          <p>Tap the lock above once you've returned your trolley!</p>
          {snake && <p>CB U NEVER RETURN YET DONT LIE</p>}
          </div>
        )}

        {loanState === "error" && (
          <div className={classes.innerContent}>
            <p className={classes.iconError}>
              <i class="fa fa-lock"></i>
            </p>
            <p>Error, trolley is already unlocked.</p>
            <p>Please try another trolley.</p>
          </div>
        )}

        {loanState === "returned" && (
          <div className={classes.innerContent}>
            <p className={classes.iconReturned}>
              <i class="fa fa-lock"></i>
            </p>
            <h3>Trolley Returned!</h3>
          </div>
        )}
      </div>
    </div>
  );
}
