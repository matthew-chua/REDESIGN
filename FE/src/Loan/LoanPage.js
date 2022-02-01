import React, { useEffect, useState } from "react";
import classes from "./LoanPage.module.css";
import axios from "axios";

export default function LoanPage() {
  const [user, setUser] = useState({
    name: "ivan teo",
  });

  //represents state of loan
  //can be "locked", "unlocked" or "returned"
  const [loanState, setLoanState] = useState("locked");
  const [trolleyState, setTrolleyState] = useState({})

  const TID = "1"

  const baseURL = 'https://stormy-stream-68782.herokuapp.com'
  // const baseURL = 'https://localhost:4000'

  const unlockHandler = () => {
    console.log("SEND SIGNAL TO BACKEND TO UNLOCK");

    axios.post(`${baseURL}/trolley/fetchTrolley`, {
      body: {
        trolleyID: TID
      },
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
    .then((res) => {
      setTrolleyState(res)
      console.log("fetch trolley", res)
    })
    .catch((err)=>{
      console.log("ERR", err);
    })

    //createLoan with the trolleyID and the userID
    // axios.post(`${baseURL}/loan/createLoan`, {
    //   body: {
    //     userID: "ANOTHERONE",
    //     loanID: "ANOTHER3",
    //     trolleyID: "NEW TROLLEY"
    //   }
    // })
    // .then((res) => {
    //   console.log("createloan", res);
    //   setLoanState("unlocked");
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
    //insert try catch and update the loanState accordingly
  };

  useEffect(() => {
    //fetch the userobject from localStorage
    //set the userState

    
  }, []);

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
          <p className={classes.icon}>
            <i class="fa fa-unlock"></i>
          </p>
          <h1>08:54</h1>
          <h1>17 Jan 2021</h1>
          <h3>Ready for use!</h3>
          <p>Please return your trolley within 24 hours</p>
          </div>
        )}

        {loanState === "error" && (
          <div className={classes.innerContent}>
            <p className={classes.iconError}>
              <i class="fa fa-lock"></i>
            </p>
            <p>Error, trolley is already unlocked</p>
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
